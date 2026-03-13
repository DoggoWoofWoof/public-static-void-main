"""Family link repository."""


class FamilyLinkRepo:
    TABLE = "family_links"

    async def find_by_case(self, case_id: str):
        return []

    async def insert(self, data: dict):
        return data
