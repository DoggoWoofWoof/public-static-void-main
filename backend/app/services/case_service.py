# backend/app/services/case_service.py
from datetime import datetime, timezone
from fastapi import HTTPException
from app.repositories.json_repo import repo
from app.schemas.case import CaseCreate, CaseStatus

class CaseService:
    def create_case(self, case_in: CaseCreate, current_user_id: str, current_role: str) -> dict:
        case_data = case_in.model_dump()
        case_data["opened_at"] = datetime.now(timezone.utc).isoformat()
        case_data["created_by"] = current_user_id
        case_data["current_status"] = CaseStatus.INTAKE_CREATED.value
        case_data["case_code"] = f"CAS-{repo._generate_id()[:8].upper()}"
        
        created_case = repo.create("cases", case_data)
        
        repo.add_audit_log(
            action="create_case",
            entity_type="case",
            entity_id=created_case["id"],
            actor_id=current_user_id,
            role=current_role,
            detail={"case_code": created_case["case_code"]}
        )
        return created_case

    def get_case(self, case_id: str) -> dict:
        case = repo.get_by_id("cases", case_id)
        if not case:
            raise HTTPException(status_code=404, detail="Case not found")
        return case

    def transition_state(self, case_id: str, new_status: CaseStatus, current_user: dict) -> dict:
        case = self.get_case(case_id)
        current_status = CaseStatus(case["current_status"])
        
        # Valid transition rules based on Context.md
        valid_transitions = {
            CaseStatus.INTAKE_CREATED: [CaseStatus.EVIDENCE_PENDING],
            CaseStatus.EVIDENCE_PENDING: [CaseStatus.PROVISIONAL_IDENTITY, CaseStatus.REVIEW_REQUIRED],
            CaseStatus.PROVISIONAL_IDENTITY: [CaseStatus.REVIEW_REQUIRED, CaseStatus.VERIFIED_FOR_HANDOFF],
            CaseStatus.REVIEW_REQUIRED: [CaseStatus.PROVISIONAL_IDENTITY, CaseStatus.VERIFIED_FOR_HANDOFF],
            CaseStatus.VERIFIED_FOR_HANDOFF: [CaseStatus.REFERRED, CaseStatus.REVIEW_REQUIRED],
            CaseStatus.REFERRED: [CaseStatus.SERVICE_IN_PROGRESS, CaseStatus.REVIEW_REQUIRED],
            CaseStatus.SERVICE_IN_PROGRESS: []
        }
        
        if new_status not in valid_transitions.get(current_status, []):
             raise HTTPException(status_code=400, detail=f"Invalid transition from {current_status.value} to {new_status.value}")
             
        # "refugees cannot trigger case state transitions directly" constraint
        if current_user.role == "refugee":
            raise HTTPException(status_code=403, detail="Refugees cannot trigger case state transitions.")

        updated_case = repo.update("cases", case_id, {"current_status": new_status.value})
        
        repo.add_audit_log(
            action="transition_state",
            entity_type="case",
            entity_id=case_id,
            actor_id=current_user.id,
            role=current_user.role,
            detail={"from": current_status.value, "to": new_status.value}
        )
        return updated_case
        
    def get_timeline(self, case_id: str) -> list[dict]:
        self.get_case(case_id) # ensure it exists
        logs = repo.find_many("audit_logs", {"entity_id": case_id, "entity_type": "case"})
        # Sort logs chronologically
        logs.sort(key=lambda x: x.get("timestamp", ""))
        return logs

service = CaseService()
