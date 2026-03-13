"""Family link schemas — with trust states: declared, candidate_match, verified, disputed."""
from pydantic import BaseModel
from typing import Optional


class FamilyLinkOut(BaseModel):
    id: str
    case_id: str
    linked_case_id: Optional[str] = None
    relation: str
    linked_person_name: str
    trust_state: str = "declared"  # declared | candidate_match | verified | disputed
    created_at: Optional[str] = None
