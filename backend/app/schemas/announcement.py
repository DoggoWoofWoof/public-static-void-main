# backend/app/schemas/announcement.py
from pydantic import BaseModel, ConfigDict
from enum import Enum
from typing import Optional

class TargetType(str, Enum):
    CASE = "case"
    FAMILY = "family"
    LOCATION = "location"
    STATUS_GROUP = "status_group"
    SEGMENT = "segment"

class AnnouncementBase(BaseModel):
    title: str
    body: str
    announcement_type: str
    target_type: TargetType
    target_ref: str

class AnnouncementCreate(AnnouncementBase):
    pass

class Announcement(AnnouncementBase):
    id: str
    published_by: Optional[str] = None
    published_at: str
    valid_until: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
