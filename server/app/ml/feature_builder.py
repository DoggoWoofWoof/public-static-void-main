"""Feature builder — constructs feature vectors from case evidence for ML scoring.

For the hackathon, the model is trained on synthetic structured case data
generated from policy-consistent evidence combinations.

Evidence trust classes and their default weights:
  Official:      biometric_match (0.95), government_record (0.90), verified_ngo_record (0.85)
  Corroborated:  family_confirmation (0.70), employer_confirmation (0.65), school_confirmation (0.60)
  Self-declared:  profile_details (0.30), reported_family (0.25), education_claims (0.20), skill_declarations (0.15)
"""

import pandas as pd


EVIDENCE_WEIGHTS = {
    # Official
    "biometric_match": 0.95,
    "government_record": 0.90,
    "verified_ngo_record": 0.85,
    # Corroborated
    "family_confirmation": 0.70,
    "employer_confirmation": 0.65,
    "school_confirmation": 0.60,
    # Self-declared
    "profile_details": 0.30,
    "reported_family_members": 0.25,
    "education_claims": 0.20,
    "skill_declarations": 0.15,
}

FEATURE_COLUMNS = [
    "has_biometric",
    "has_government_record",
    "has_ngo_verification",
    "family_confirmations_count",
    "employer_confirmations_count",
    "school_confirmations_count",
    "self_declared_count",
    "total_evidence_count",
    "official_evidence_count",
    "corroborated_evidence_count",
    "weighted_evidence_sum",
    "has_verified_family_link",
    "days_in_system",
]


def build_features(evidence_list: list, family_links: list = None, days_in_system: int = 0) -> dict:
    """Build a feature dict from raw evidence and family link data."""
    features = {col: 0 for col in FEATURE_COLUMNS}

    for ev in evidence_list:
        etype = ev.get("evidence_type", "")
        tclass = ev.get("trust_class", "self_declared")

        features["total_evidence_count"] += 1

        if tclass == "official":
            features["official_evidence_count"] += 1
        elif tclass == "corroborated":
            features["corroborated_evidence_count"] += 1
        else:
            features["self_declared_count"] += 1

        if etype == "biometric_match":
            features["has_biometric"] = 1
        elif etype == "government_record":
            features["has_government_record"] = 1
        elif etype == "verified_ngo_record":
            features["has_ngo_verification"] = 1
        elif etype == "family_confirmation":
            features["family_confirmations_count"] += 1
        elif etype == "employer_confirmation":
            features["employer_confirmations_count"] += 1
        elif etype == "school_confirmation":
            features["school_confirmations_count"] += 1

        features["weighted_evidence_sum"] += EVIDENCE_WEIGHTS.get(etype, 0.1)

    # Family links
    if family_links:
        features["has_verified_family_link"] = int(
            any(fl.get("trust_state") == "verified" for fl in family_links)
        )

    features["days_in_system"] = days_in_system
    return features


def features_to_dataframe(features: dict) -> pd.DataFrame:
    """Convert feature dict to a single-row DataFrame for model input."""
    return pd.DataFrame([features], columns=FEATURE_COLUMNS)
