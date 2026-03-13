# backend/app/api/routes/cases.py
from fastapi import APIRouter, Depends
from typing import List, Annotated
from app.schemas.case import Case, CaseCreate
from app.services.case_service import CaseService
case_service = CaseService()
from app.core.deps import get_current_user, require_permission
from app.core.security import User, Permission

router = APIRouter(prefix="/cases", tags=["cases"])

@router.post("", response_model=Case)
async def create_case(
    case_in: CaseCreate, 
    current_user: Annotated[User, Depends(require_permission(Permission.INTAKE_OFFICER))]
):
    return case_service.create_case(case_in, current_user.id, current_user.role)

@router.get("/{case_id}", response_model=Case)
async def get_case(
    case_id: str,
    current_user: Annotated[User, Depends(get_current_user)]
):
    return case_service.get_case(case_id)

@router.get("/{case_id}/timeline", response_model=List[dict])
async def get_case_timeline(
    case_id: str,
    current_user: Annotated[User, Depends(get_current_user)]
):
    return case_service.get_timeline(case_id)
