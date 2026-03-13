"""Case service — business logic for cases."""


class CaseService:
    async def list_cases(self, status: str | None = None, search: str | None = None) -> list:
        # TODO: call case_repo
        return []

    async def get_case(self, case_id: str) -> dict:
        # TODO: call case_repo
        return {"case_id": case_id, "case_code": "BB-0000", "status": "intake", "person": {"name": "Demo"}}

    async def create_case(self, data, created_by: str | None = None) -> dict:
        # TODO: call case_repo
        return {"case_id": "new", "case_code": "BB-0001", "status": "intake", "person": data.person.model_dump()}
