# backend/app/services/evidence_service.py
from datetime import datetime, timezone
from fastapi import HTTPException
from app.repositories.evidence_repo import EvidenceRepo
from app.schemas.evidence import EvidenceCreate, EvidenceReview, EvidenceClass, EvidenceState
from app.services.case_service import CaseService
from app.schemas.case import CaseStatus

class EvidenceService:
    def add_evidence(self, case_id: str, evidence_in: EvidenceCreate, current_user: dict) -> dict:
        case_service.get_case(case_id) # ensure case exists
        
        evidence_data = evidence_in.model_dump()
        
        # Enforce refugee rules
        if current_user.role == "refugee":
            evidence_data["evidence_class"] = EvidenceClass.SELF_DECLARED.value
            evidence_data["state"] = EvidenceState.PENDING.value
        else:
             evidence_data["state"] = EvidenceState.PENDING.value # All starts as pending until reviewed

        evidence_data["source_actor_type"] = current_user.role
        evidence_data["source_user_id"] = current_user.id
        evidence_data["submitted_at"] = datetime.now(timezone.utc).isoformat()
        
        created = repo.create("evidence_items", evidence_data)
        
        repo.add_audit_log(
            action="add_evidence",
            entity_type="evidence_item",
            entity_id=created["id"],
            actor_id=current_user.id,
            role=current_user.role,
            detail={"type": evidence_data["evidence_type"], "class": evidence_data["evidence_class"]}
        )
        
        # Update case state if it's the first evidence
        case = repo.get_by_id("cases", case_id)
        if case and case["current_status"] == CaseStatus.INTAKE_CREATED.value:
            case_service.transition_state(case_id, CaseStatus.EVIDENCE_PENDING, current_user)
            
        return created

    def get_evidence(self, case_id: str) -> list[dict]:
        return repo.get_case_evidence(case_id)

    def review_evidence(self, evidence_id: str, review_in: EvidenceReview, current_user: dict) -> dict:
        evidence = repo.get_by_id("evidence_items", evidence_id)
        if not evidence:
            raise HTTPException(status_code=404, detail="Evidence not found")
            
        # Refugees cannot review
        if current_user.role == "refugee":
             raise HTTPException(status_code=403, detail="Refugees cannot review evidence.")
             
        # "refugees cannot modify accepted official data" (Not strictly applicable here as this is review, but adding guard)
        
        updates = {
            "state": review_in.state.value,
            "reviewed_at": datetime.now(timezone.utc).isoformat(),
            "reviewed_by": current_user.id
        }
        
        updated = repo.update("evidence_items", evidence_id, updates)
        
        repo.add_audit_log(
            action="review_evidence",
            entity_type="evidence_item",
            entity_id=evidence_id,
            actor_id=current_user.id,
            role=current_user.role,
            detail={"new_state": review_in.state.value}
        )
        return updated

service = EvidenceService()
