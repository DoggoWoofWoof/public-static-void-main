# backend/app/api/routes/evidence.py
from fastapi import APIRouter, Depends
from typing import List, Annotated
from app.schemas.evidence import Evidence, EvidenceCreate, EvidenceReview
from app.services.evidence_service import service as evidence_service
from app.core.deps import get_current_user, require_permission
from app.core.security import User, Permission

router = APIRouter(tags=["evidence"])

@router.post("/cases/{case_id}/evidence", response_model=Evidence)
async def add_evidence(
    case_id: str,
    evidence_in: EvidenceCreate,
    current_user: Annotated[User, Depends(get_current_user)]
):
    return evidence_service.add_evidence(case_id, evidence_in, current_user)

@router.get("/cases/{case_id}/evidence", response_model=List[Evidence])
async def get_evidence(
    case_id: str,
    current_user: Annotated[User, Depends(get_current_user)]
):
    return evidence_service.get_evidence(case_id)

@router.patch("/evidence/{evidence_id}/review", response_model=Evidence)
async def review_evidence(
    evidence_id: str,
    review_in: EvidenceReview,
    current_user: Annotated[User, Depends(require_permission(Permission.REVIEWER))]
):
    return evidence_service.review_evidence(evidence_id, review_in, current_user)
