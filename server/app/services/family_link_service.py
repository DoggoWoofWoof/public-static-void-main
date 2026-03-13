"""Family link service."""


class FamilyLinkService:
    async def list_links(self, case_id: str) -> list:
        return []

    async def declare_link(self, case_id: str, data: dict) -> dict:
        return {"id": "fl-new", "case_id": case_id, "trust_state": "declared", **data}
