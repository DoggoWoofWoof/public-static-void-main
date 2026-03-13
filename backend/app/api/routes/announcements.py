# backend/app/api/routes/announcements.py
from fastapi import APIRouter, Depends
from typing import List, Annotated
from app.schemas.announcement import Announcement, AnnouncementCreate
from app.services.announcement_service import service as announcement_service
from app.core.deps import get_current_user
from app.core.security import User

router = APIRouter(tags=["announcements"])

@router.post("/announcements", response_model=Announcement)
async def create_announcement(
    ann_in: AnnouncementCreate,
    current_user: Annotated[User, Depends(get_current_user)]
):
    return announcement_service.create_announcement(ann_in, current_user)

@router.get("/cases/{case_id}/announcements", response_model=List[Announcement])
async def get_case_announcements(
    case_id: str,
    current_user: Annotated[User, Depends(get_current_user)]
):
    return announcement_service.get_announcements_for_case(case_id)
