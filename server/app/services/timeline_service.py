"""Timeline service — aggregates case events into a timeline."""


class TimelineService:
    async def get_timeline(self, case_id: str) -> list:
        """Returns chronological list of events for a case."""
        # TODO: aggregate from evidence, score snapshots, status changes
        return []
