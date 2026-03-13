# backend/app/schemas/scoring.py
from pydantic import BaseModel, ConfigDict
from typing import Any, Optional

class FeatureSnapshot(BaseModel):
    official_evidence_count: int
    corroborated_evidence_count: int
    self_declared_count: int
    accepted_official_count: int
    accepted_corroborated_count: int
    disputed_count: int
    rejected_count: int
    biometric_match_present: int
    government_record_present: int
    verified_ngo_record_present: int
    family_confirmation_present: int
    verified_family_links_count: int
    documents_verified_count: int
    documents_rejected_count: int
    external_confirmed_matches: int

class ScoreSnapshot(BaseModel):
    id: str
    case_id: str
    model_name: str
    model_version: str
    predicted_score: float
    confidence_band: str
    feature_snapshot: FeatureSnapshot
    explanation: dict[str, Any] = {}
    created_at: str

    model_config = ConfigDict(from_attributes=True)
