"""Referral schemas."""
from pydantic import BaseModel
from typing import Optional


class ReferralCreate(BaseModel):
    referral_type: str  # employment | housing | medical | legal | education
    description: Optional[str] = None
    partner_id: Optional[str] = None


class ReferralOut(BaseModel):
    id: str
    case_id: str
    case_code: Optional[str] = None
    referral_type: str
    description: Optional[str] = None
    status: str = "pending"  # pending | active | completed | cancelled
    created_at: Optional[str] = None
