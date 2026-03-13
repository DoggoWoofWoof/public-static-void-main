"""Cases routes — CRUD for refugee cases."""

from fastapi import APIRouter, Depends
from app.schemas.case import CaseOut, CaseCreate
from app.core.deps import get_current_user
from app.services.case_service import CaseService

router = APIRouter()
service = CaseService()


@router.get("", response_model=list[CaseOut])
async def list_cases(status: str | None = None, search: str | None = None):
    return await service.list_cases(status=status, search=search)


@router.get("/{case_id}", response_model=CaseOut)
async def get_case(case_id: str):
    return await service.get_case(case_id)


@router.post("", response_model=CaseOut)
async def create_case(body: CaseCreate, user: dict = Depends(get_current_user)):
    return await service.create_case(body, created_by=user.get("sub"))
