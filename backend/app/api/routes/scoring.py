# backend/app/api/routes/scoring.py
from fastapi import APIRouter, Depends
from typing import Annotated
from app.schemas.scoring import ScoreSnapshot
from app.services.scoring_service import service as scoring_service
from app.core.deps import get_current_user, require_permission
from app.core.security import User, Permission

router = APIRouter(tags=["scoring"])

@router.post("/score/recompute", response_model=ScoreSnapshot)
async def recompute_score(
    case_id: str,
    current_user: Annotated[User, Depends(require_permission(Permission.CASE_MANAGER))]
):
    return scoring_service.recompute(case_id, current_user)

@router.get("/score/latest", response_model=ScoreSnapshot | None)
async def get_latest_score(
    case_id: str,
    current_user: Annotated[User, Depends(get_current_user)]
):
    from app.repositories.json_repo import repo
    return repo.get_latest_score(case_id)
