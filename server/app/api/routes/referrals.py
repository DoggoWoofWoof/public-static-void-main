"""Referrals routes."""

from fastapi import APIRouter, Depends
from app.schemas.referral import ReferralOut, ReferralCreate
from app.core.deps import get_current_user
from app.services.referral_service import ReferralService

router = APIRouter()
service = ReferralService()


@router.get("/cases/{case_id}/referrals", response_model=list[ReferralOut])
async def list_referrals(case_id: str):
    return await service.list_referrals(case_id)


@router.post("/cases/{case_id}/referrals", response_model=ReferralOut)
async def create_referral(case_id: str, body: ReferralCreate, user: dict = Depends(get_current_user)):
    return await service.create_referral(case_id, body, created_by=user.get("sub"))
