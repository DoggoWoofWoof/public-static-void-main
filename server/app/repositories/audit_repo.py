"""Audit log repository."""


class AuditRepo:
    TABLE = "audit_log"

    async def log_action(self, action: str, user: str, case_id: str, details: dict | None = None):
        # TODO: insert into audit_log table
        pass

    async def get_log(self, case_id: str):
        return []
