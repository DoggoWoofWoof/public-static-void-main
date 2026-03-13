"""Evidence service."""


class EvidenceService:
    async def list_evidence(self, case_id: str) -> list:
        return []

    async def add_evidence(self, case_id: str, data, added_by: str | None = None) -> dict:
        return {
            "id": "ev-new",
            "case_id": case_id,
            "evidence_type": data.evidence_type,
            "trust_class": data.trust_class,
            "source": data.source,
            "review_status": "pending",
        }
