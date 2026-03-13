"""Inference module — loads trained model and predicts identity scores."""

import os
import joblib
import numpy as np
from app.ml.feature_builder import features_to_dataframe, FEATURE_COLUMNS

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")


def load_model(model_type: str = "rf"):
    """Load a trained model. Supports 'rf' (Random Forest) or 'xgb' (XGBoost)."""
    if model_type == "rf":
        path = os.path.join(MODEL_DIR, "rf_identity_score.joblib")
        if os.path.exists(path):
            return joblib.load(path)
    elif model_type == "xgb":
        try:
            import xgboost as xgb
            path = os.path.join(MODEL_DIR, "xgb_identity_score.json")
            if os.path.exists(path):
                model = xgb.XGBRegressor()
                model.load_model(path)
                return model
        except ImportError:
            pass
    return None


def predict_score(features: dict, model_type: str = "rf") -> dict:
    """Predict identity score and return explanation."""
    model = load_model(model_type)

    if model is None:
        # Fallback: rule-based scoring when no trained model available
        return rule_based_score(features)

    df = features_to_dataframe(features)
    predicted = float(model.predict(df)[0])
    predicted = max(0, min(100, predicted))

    # Get feature importances for explanation
    top_factors = get_top_factors(model, features)
    blocking = get_blocking_constraints(features)
    band = score_to_band(predicted)

    return {
        "predicted_score": round(predicted, 1),
        "confidence_band": band,
        "top_factors": top_factors,
        "blocking_constraints": blocking,
    }


def rule_based_score(features: dict) -> dict:
    """Simple rule-based fallback when no ML model is trained yet."""
    score = features.get("weighted_evidence_sum", 0) * 20
    score += features.get("has_biometric", 0) * 20
    score += features.get("has_verified_family_link", 0) * 10
    score = max(0, min(100, score))

    top_factors = []
    if features.get("has_biometric"):
        top_factors.append({"name": "Biometric match", "impact": 20.0})
    if features.get("has_ngo_verification"):
        top_factors.append({"name": "NGO verification", "impact": 15.0})
    if features.get("has_verified_family_link"):
        top_factors.append({"name": "Verified family link", "impact": 10.0})
    if features.get("corroborated_evidence_count", 0) > 0:
        top_factors.append({"name": f"{features['corroborated_evidence_count']} corroborated evidence(s)", "impact": features["corroborated_evidence_count"] * 5.0})

    return {
        "predicted_score": round(score, 1),
        "confidence_band": score_to_band(score),
        "top_factors": top_factors[:5],
        "blocking_constraints": get_blocking_constraints(features),
    }


def get_top_factors(model, features: dict) -> list:
    """Extract top contributing factors from model feature importances."""
    try:
        importances = model.feature_importances_
        factor_impacts = []
        for i, col in enumerate(FEATURE_COLUMNS):
            if importances[i] > 0.01 and features.get(col, 0) > 0:
                factor_impacts.append({
                    "name": col.replace("_", " ").title(),
                    "impact": round(importances[i] * features[col] * 100, 1),
                })
        factor_impacts.sort(key=lambda x: abs(x["impact"]), reverse=True)
        return factor_impacts[:5]
    except Exception:
        return []


def get_blocking_constraints(features: dict) -> list:
    """Identify blocking constraints preventing higher confidence."""
    constraints = []
    if features.get("official_evidence_count", 0) == 0:
        constraints.append("No reviewed official evidence prevents high-confidence status")
    if features.get("total_evidence_count", 0) < 2:
        constraints.append("Fewer than 2 evidence items submitted")
    return constraints


def score_to_band(score: float) -> str:
    if score >= 80:
        return "verified"
    elif score >= 55:
        return "provisional_identity"
    elif score >= 30:
        return "low"
    else:
        return "unverified"
