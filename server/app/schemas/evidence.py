"""Evidence schemas — with trust classes (official, corroborated, self_declared)."""
from pydantic import BaseModel
from typing import Optional


class EvidenceCreate(BaseModel):
    evidence_type: str
    trust_class: str = "self_declared"  # official | corroborated | self_declared
    source: Optional[str] = None
    details: Optional[dict] = None


class EvidenceOut(BaseModel):
    id: str
    case_id: str
    evidence_type: str
    trust_class: str
    source: Optional[str] = None
    review_status: str = "pending"  # pending | accepted | rejected
    created_at: Optional[str] = None
