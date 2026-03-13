"""Score repository."""


class ScoreRepo:
    TABLE = "scores"

    async def find_latest(self, case_id: str):
        return None

    async def insert(self, data: dict):
        return data
