"""Generate synthetic training data for identity scoring.

The synthetic label generator assigns different weights to each evidence
class/type. This generates policy-consistent evidence combinations, not
real refugee data.
"""

import numpy as np
import pandas as pd
from app.ml.feature_builder import FEATURE_COLUMNS, EVIDENCE_WEIGHTS


def generate_dataset(n_samples: int = 2000, random_state: int = 42) -> pd.DataFrame:
    rng = np.random.RandomState(random_state)
    rows = []

    for _ in range(n_samples):
        features = {
            "has_biometric": rng.choice([0, 1], p=[0.7, 0.3]),
            "has_government_record": rng.choice([0, 1], p=[0.6, 0.4]),
            "has_ngo_verification": rng.choice([0, 1], p=[0.5, 0.5]),
            "family_confirmations_count": rng.choice([0, 1, 2, 3], p=[0.4, 0.3, 0.2, 0.1]),
            "employer_confirmations_count": rng.choice([0, 1, 2], p=[0.5, 0.35, 0.15]),
            "school_confirmations_count": rng.choice([0, 1], p=[0.6, 0.4]),
            "self_declared_count": rng.randint(0, 5),
            "has_verified_family_link": rng.choice([0, 1], p=[0.6, 0.4]),
            "days_in_system": rng.randint(1, 365),
        }

        # Derive compound features
        features["official_evidence_count"] = (
            features["has_biometric"] + features["has_government_record"] + features["has_ngo_verification"]
        )
        features["corroborated_evidence_count"] = (
            features["family_confirmations_count"]
            + features["employer_confirmations_count"]
            + features["school_confirmations_count"]
        )
        features["total_evidence_count"] = (
            features["official_evidence_count"]
            + features["corroborated_evidence_count"]
            + features["self_declared_count"]
        )

        # Weighted sum
        weighted = (
            features["has_biometric"] * 0.95
            + features["has_government_record"] * 0.90
            + features["has_ngo_verification"] * 0.85
            + features["family_confirmations_count"] * 0.70
            + features["employer_confirmations_count"] * 0.65
            + features["school_confirmations_count"] * 0.60
            + features["self_declared_count"] * 0.25
            + features["has_verified_family_link"] * 0.50
        )
        features["weighted_evidence_sum"] = weighted

        # Generate synthetic label (0–100 score)
        score = weighted * 15 + rng.normal(0, 5)
        score = np.clip(score, 0, 100)
        features["identity_score"] = round(float(score), 1)

        rows.append(features)

    return pd.DataFrame(rows)


if __name__ == "__main__":
    df = generate_dataset()
    print(f"Generated {len(df)} samples")
    print(df.describe())
