# backend/app/services/scoring_service.py
from datetime import datetime, timezone
from app.repositories.json_repo import repo
from app.ml.feature_builder import build_features
from app.ml.infer import predict
from app.schemas.scoring import ScoreSnapshot
from app.schemas.evidence import EvidenceState, EvidenceClass
from app.services.case_service import service as case_service
from app.schemas.case import CaseStatus

class ScoringService:
    def recompute(self, case_id: str, current_user: dict) -> dict:
        case = case_service.get_case(case_id)
        
        # 1. Gather all case data
        evidence = repo.get_case_evidence(case_id)
        docs = repo.get_case_documents(case_id)
        links = repo.get_case_family_links(case_id)
        
        # 2. Build features
        features = build_features(evidence, links, docs)
        
        # 3. Predict score
        predicted_score = predict(features)
        
        # 4. Apply Governance constraints
        constraints = []
        has_reviewed_evidence = any(e.get("state") in [EvidenceState.ACCEPTED.value, EvidenceState.REJECTED.value, EvidenceState.DISPUTED.value] for e in evidence)
        has_disputed_official = any(e.get("state") == EvidenceState.DISPUTED.value and e.get("evidence_class") == EvidenceClass.OFFICIAL.value for e in evidence)
        
        cap_score = 100
        
        if not has_reviewed_evidence:
             constraints.append("No verified status if no reviewed evidence exists.")
             cap_score = min(cap_score, 39)
             
        if has_disputed_official:
            constraints.append("No high_confidence if disputed official evidence is present.")
            cap_score = min(cap_score, 79)
            
        final_score = min(predicted_score, cap_score)
        
        # 5. Determine band
        if final_score < 40: band = "under_review"
        elif final_score < 60: band = "provisional"
        elif final_score < 80: band = "verified"
        else: band = "high_confidence"
        
        # 6. Save snapshot
        snapshot_data = {
            "id": repo._generate_id(),
            "case_id": case_id,
            "model_name": "mock_policy_weights",
            "model_version": "1.0",
            "predicted_score": final_score,
            "confidence_band": band,
            "feature_snapshot": features.model_dump(),
            "explanation": {"constraints": constraints},
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        created = repo.create("score_snapshots", snapshot_data)
        
        repo.add_audit_log(
            action="recompute_score",
            entity_type="case",
            entity_id=case_id,
            actor_id=current_user.id,
            role=current_user.role,
            detail={"score": final_score, "band": band}
        )
        
        # Provide limited auto-transitions based on score
        # Note: 'verified_for_handoff' requires officer review, handled via UI action.
        current_status = CaseStatus(case["current_status"])
        if current_status == CaseStatus.EVIDENCE_PENDING and final_score >= 40:
             case_service.transition_state(case_id, CaseStatus.PROVISIONAL_IDENTITY, current_user)
             
        if has_disputed_official and current_status in [CaseStatus.EVIDENCE_PENDING, CaseStatus.PROVISIONAL_IDENTITY, CaseStatus.VERIFIED_FOR_HANDOFF]:
             case_service.transition_state(case_id, CaseStatus.REVIEW_REQUIRED, current_user)
        
        return created
        
service = ScoringService()
