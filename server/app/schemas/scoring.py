"""Scoring schemas — includes explanation output."""
from pydantic import BaseModel
from typing import Optional


class ScoreFactor(BaseModel):
    name: str
    impact: float


class ScoreOut(BaseModel):
    case_id: str
    predicted_score: float
    confidence_band: str  # unverified | low | provisional_identity | verified
    top_factors: list[ScoreFactor] = []
    blocking_constraints: list[str] = []
    computed_at: Optional[str] = None
