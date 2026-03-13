"""Family links routes."""

from fastapi import APIRouter
from app.services.family_link_service import FamilyLinkService

router = APIRouter()
service = FamilyLinkService()


@router.get("/cases/{case_id}/family-links")
async def list_family_links(case_id: str):
    return await service.list_links(case_id)


@router.post("/cases/{case_id}/family-links")
async def declare_family_link(case_id: str, body: dict):
    return await service.declare_link(case_id, body)
