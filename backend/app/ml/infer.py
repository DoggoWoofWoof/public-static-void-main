# backend/app/ml/infer.py
from app.schemas.scoring import FeatureSnapshot

def predict(features: FeatureSnapshot) -> float:
    # Deterministic mock score based on policy weights
    score = 0.0
    
    if features.biometric_match_present: score += 28
    if features.government_record_present: score += 24
    if features.verified_ngo_record_present: score += 15
    if features.family_confirmation_present: score += 10
    
    score += (features.accepted_corroborated_count * 8)
    score += (features.self_declared_count * 2)
    score -= (features.disputed_count * 18)
    score -= (features.rejected_count * 12)
    score += (features.verified_family_links_count * 5)
    score += (features.documents_verified_count * 5)
    
    # Clamp to 0-100
    if score < 0: return 0.0
    if score > 100: return 100.0
    
    return score
