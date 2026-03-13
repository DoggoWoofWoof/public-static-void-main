"""Evidence routes."""

from fastapi import APIRouter, Depends
from app.schemas.evidence import EvidenceOut, EvidenceCreate
from app.core.deps import get_current_user
from app.services.evidence_service import EvidenceService

router = APIRouter()
service = EvidenceService()


@router.get("/cases/{case_id}/evidence", response_model=list[EvidenceOut])
async def list_evidence(case_id: str):
    return await service.list_evidence(case_id)


@router.post("/cases/{case_id}/evidence", response_model=EvidenceOut)
async def add_evidence(case_id: str, body: EvidenceCreate, user: dict = Depends(get_current_user)):
    return await service.add_evidence(case_id, body, added_by=user.get("sub"))
