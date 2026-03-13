"""Case repository — Supabase queries for cases."""


class CaseRepo:
    TABLE = "cases"

    async def find_all(self, status=None, search=None):
        # TODO: supabase query
        return []

    async def find_by_id(self, case_id: str):
        return None

    async def insert(self, data: dict):
        return data
