"""Announcement service."""


class AnnouncementService:
    async def list_announcements(self, case_id: str) -> list:
        return []

    async def create_announcement(self, data: dict, posted_by: str | None = None) -> dict:
        return {"id": "ann-new", "announcement_type": data.get("announcement_type", "notice"), **data}
