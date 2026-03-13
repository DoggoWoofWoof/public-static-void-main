# backend/app/services/referral_service.py
from datetime import datetime, timezone
from fastapi import HTTPException
from app.repositories.referral_repo import ReferralRepo
from app.schemas.referral import ReferralCreate, ReferralUpdate, ReferralStatus
from app.services.case_service import CaseService
from app.schemas.case import CaseStatus
from app.core.security import Permission

class ReferralService:
    def create_referral(self, case_id: str, referral_in: ReferralCreate, current_user: dict) -> dict:
        case_service.get_case(case_id)
        
        # Governance constraint: "no employment referral without case-manager approval"
        # Since only case managers can approve, and creating essentially starts this process:
        if current_user.role != "authority" or Permission.CASE_MANAGER not in current_user.permissions:
             raise HTTPException(status_code=403, detail="Only Case Managers can create referrals.")
        
        referral_data = referral_in.model_dump()
        referral_data["status"] = ReferralStatus.OPEN.value
        referral_data["created_by"] = current_user.id
        referral_data["created_at"] = datetime.now(timezone.utc).isoformat()
        
        created = repo.create("referrals", referral_data)
        
        repo.add_audit_log(
            action="create_referral",
            entity_type="referral",
            entity_id=created["id"],
            actor_id=current_user.id,
            role=current_user.role,
            detail={"to_agency": referral_data["to_agency"]}
        )
        
        # Transition case to referred
        case = repo.get_by_id("cases", case_id)
        if case and case["current_status"] in [CaseStatus.VERIFIED_FOR_HANDOFF.value]:
            case_service.transition_state(case_id, CaseStatus.REFERRED, current_user)
            
        return created

    def update_referral(self, referral_id: str, update_in: ReferralUpdate, current_user: dict) -> dict:
        referral = repo.get_by_id("referrals", referral_id)
        if not referral:
             raise HTTPException(status_code=404, detail="Referral not found")
             
        updates = {"status": update_in.status.value}
        updated = repo.update("referrals", referral_id, updates)
        
        repo.add_audit_log(
            action="update_referral",
            entity_type="referral",
            entity_id=referral_id,
            actor_id=current_user.id,
            role=current_user.role,
            detail={"new_status": update_in.status.value}
        )
        return updated

service = ReferralService()
