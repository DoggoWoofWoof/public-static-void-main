# backend/app/schemas/referral.py
from pydantic import BaseModel, ConfigDict
from enum import Enum
from typing import Optional

class ReferralType(str, Enum):
    REFERRAL = "referral"
    CONSULTATION = "consultation"
    TRANSFER = "transfer"
    NOTIFICATION = "notification"

class ReferralStatus(str, Enum):
    OPEN = "open"
    ACCEPTED = "accepted"
    DECLINED = "declined"
    COMPLETED = "completed"

class ReferralBase(BaseModel):
    case_id: str
    referral_type: ReferralType
    from_agency: str
    to_agency: str
    reason: Optional[str] = None

class ReferralCreate(ReferralBase):
    pass

class ReferralUpdate(BaseModel):
    status: ReferralStatus

class Referral(ReferralBase):
    id: str
    status: ReferralStatus = ReferralStatus.OPEN
    created_by: Optional[str] = None
    created_at: str

    model_config = ConfigDict(from_attributes=True)
