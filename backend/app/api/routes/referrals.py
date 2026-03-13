# backend/app/api/routes/referrals.py
from fastapi import APIRouter, Depends
from typing import List, Annotated
from app.schemas.referral import Referral, ReferralCreate, ReferralUpdate
from app.services.referral_service import service as referral_service
from app.core.deps import get_current_user
from app.core.security import User

router = APIRouter(tags=["referrals"])

@router.post("/cases/{case_id}/referrals", response_model=Referral)
async def create_referral(
    case_id: str,
    ref_in: ReferralCreate,
    current_user: Annotated[User, Depends(get_current_user)]
):
    return referral_service.create_referral(case_id, ref_in, current_user)

@router.patch("/referrals/{referral_id}", response_model=Referral)
async def update_referral(
    referral_id: str,
    ref_in: ReferralUpdate,
    current_user: Annotated[User, Depends(get_current_user)]
):
    return referral_service.update_referral(referral_id, ref_in, current_user)
