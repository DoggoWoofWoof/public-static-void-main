"""Scoring service — integrates with ML inference."""

from datetime import datetime, timezone


class ScoringService:
    async def get_latest_score(self, case_id: str) -> dict:
        # TODO: fetch from score_repo
        return {
            "case_id": case_id,
            "predicted_score": 65.2,
            "confidence_band": "provisional_identity",
            "top_factors": [
                {"name": "Verified NGO record", "impact": 15.0},
                {"name": "Family confirmation (wife)", "impact": 10.5},
                {"name": "Employer confirmation", "impact": 8.3},
            ],
            "blocking_constraints": [],
            "computed_at": datetime.now(timezone.utc).isoformat(),
        }

    async def recompute_score(self, case_id: str) -> dict:
        # TODO: call infer.py, save to score_repo
        return await self.get_latest_score(case_id)
