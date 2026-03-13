"""Announcement repository."""


class AnnouncementRepo:
    TABLE = "announcements"

    async def find_by_case(self, case_id: str):
        return []

    async def insert(self, data: dict):
        return data
