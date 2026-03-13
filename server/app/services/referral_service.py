"""Referral service."""


class ReferralService:
    async def list_referrals(self, case_id: str) -> list:
        return []

    async def create_referral(self, case_id: str, data, created_by: str | None = None) -> dict:
        return {
            "id": "ref-new",
            "case_id": case_id,
            "referral_type": data.referral_type,
            "description": data.description,
            "status": "pending",
        }
