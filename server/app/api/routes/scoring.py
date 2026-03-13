"""Scoring routes — identity confidence scoring."""

from fastapi import APIRouter
from app.schemas.scoring import ScoreOut
from app.services.scoring_service import ScoringService

router = APIRouter()
service = ScoringService()


@router.get("/cases/{case_id}/score/latest", response_model=ScoreOut)
async def get_latest_score(case_id: str):
    return await service.get_latest_score(case_id)


@router.post("/cases/{case_id}/score/recompute", response_model=ScoreOut)
async def recompute_score(case_id: str):
    return await service.recompute_score(case_id)
