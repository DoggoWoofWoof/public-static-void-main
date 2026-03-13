"""Announcements routes — one-way, authority-posted, targeted messages."""

from fastapi import APIRouter, Depends
from app.schemas.announcement import AnnouncementOut
from app.core.deps import get_current_user
from app.services.announcement_service import AnnouncementService

router = APIRouter()
service = AnnouncementService()


@router.get("/cases/{case_id}/announcements", response_model=list[AnnouncementOut])
async def list_announcements(case_id: str):
    return await service.list_announcements(case_id)


@router.post("/announcements")
async def create_announcement(body: dict, user: dict = Depends(get_current_user)):
    """Only verified authorities/partners can post announcements."""
    return await service.create_announcement(body, posted_by=user.get("sub"))
