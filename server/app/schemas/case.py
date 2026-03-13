"""Case schemas."""
from pydantic import BaseModel
from typing import Optional


class PersonInfo(BaseModel):
    name: str
    nationality: Optional[str] = None
    language: Optional[str] = None
    date_of_birth: Optional[str] = None


class LatestScore(BaseModel):
    predicted_score: float
    confidence_band: str


class CaseCreate(BaseModel):
    person: PersonInfo
    status: str = "intake"


class CaseOut(BaseModel):
    case_id: str
    case_code: str
    status: str
    person: PersonInfo
    latest_score: Optional[LatestScore] = None
    created_at: Optional[str] = None
