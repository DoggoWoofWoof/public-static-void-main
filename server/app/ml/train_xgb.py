"""Train XGBoost model for identity confidence scoring."""

import os
import pandas as pd
from sklearn.model_selection import train_test_split
from app.ml.generate_synthetic_data import generate_dataset
from app.ml.feature_builder import FEATURE_COLUMNS

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")


def train_xgboost(n_samples: int = 2000, random_state: int = 42):
    import xgboost as xgb

    os.makedirs(MODEL_DIR, exist_ok=True)

    df = generate_dataset(n_samples=n_samples, random_state=random_state)
    X = df[FEATURE_COLUMNS]
    y = df["identity_score"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=random_state)

    model = xgb.XGBRegressor(n_estimators=100, max_depth=6, learning_rate=0.1, random_state=random_state)
    model.fit(X_train, y_train)

    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    print(f"XGB Train R²: {train_score:.4f}")
    print(f"XGB Test  R²: {test_score:.4f}")

    path = os.path.join(MODEL_DIR, "xgb_identity_score.json")
    model.save_model(path)
    print(f"Model saved to {path}")

    return model


if __name__ == "__main__":
    train_xgboost()
