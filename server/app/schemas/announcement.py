"""Announcement schemas."""
from pydantic import BaseModel
from typing import Optional


class AnnouncementOut(BaseModel):
    id: str
    announcement_type: str  # appointment_reminder | food_shelter_medical | document_request | screening_update | employment_pathway | school_enrollment
    title: str
    body: str
    target_case_id: Optional[str] = None
    posted_by: Optional[str] = None
    created_at: Optional[str] = None
