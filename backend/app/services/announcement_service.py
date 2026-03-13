# backend/app/services/announcement_service.py
from datetime import datetime, timezone
from fastapi import HTTPException
from app.repositories.json_repo import repo
from app.schemas.announcement import AnnouncementCreate
from app.core.security import Permission

class AnnouncementService:
    def create_announcement(self, announcement_in: AnnouncementCreate, current_user: dict) -> dict:
         if Permission.COMMUNICATIONS_PUBLISHER not in current_user.permissions and Permission.PARTNER_SERVICE_OFFICER not in current_user.permissions:
              raise HTTPException(status_code=403, detail="Not authorized to publish announcements.")
              
         data = announcement_in.model_dump()
         data["published_by"] = current_user.id
         data["published_at"] = datetime.now(timezone.utc).isoformat()
         
         created = repo.create("announcements", data)
         
         repo.add_audit_log(
             action="create_announcement",
             entity_type="announcement",
             entity_id=created["id"],
             actor_id=current_user.id,
             role=current_user.role,
             detail={"title": data["title"]}
         )
         return created
         
    def get_announcements_for_case(self, case_id: str) -> list[dict]:
         # Rough logic: In a real system, would match target_ref against case attributes
         # For MVP, just return all announcements targeting this case specifically + global ones
         all_announcements = repo.get_all("announcements")
         return [a for a in all_announcements if (a.get("target_type") == "case" and a.get("target_ref") == case_id) or a.get("target_type") == "segment"]

service = AnnouncementService()
