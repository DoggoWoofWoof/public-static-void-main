# backend/app/ml/feature_builder.py
from app.schemas.scoring import FeatureSnapshot
from app.schemas.evidence import EvidenceClass, EvidenceState
from app.schemas.family_link import LinkStatus
from app.schemas.document import DocumentState

def build_features(evidence_items: list[dict], family_links: list[dict], documents: list[dict]) -> FeatureSnapshot:
    official_count = 0
    corroborated_count = 0
    self_declared_count = 0
    
    accepted_official = 0
    accepted_corroborated = 0
    disputed_count = 0
    rejected_count = 0
    
    bio_match = 0
    gov_record = 0
    ngo_record = 0
    fam_conf = 0
    
    for item in evidence_items:
        cls = item.get("evidence_class")
        state = item.get("state")
        typ = item.get("evidence_type", "")
        
        if cls == EvidenceClass.OFFICIAL.value:
            official_count += 1
            if state == EvidenceState.ACCEPTED.value:
                accepted_official += 1
        elif cls == EvidenceClass.CORROBORATED.value:
            corroborated_count += 1
            if state == EvidenceState.ACCEPTED.value:
                accepted_corroborated += 1
        elif cls == EvidenceClass.SELF_DECLARED.value:
            self_declared_count += 1
            
        if state == EvidenceState.DISPUTED.value:
            disputed_count += 1
        elif state == EvidenceState.REJECTED.value:
            rejected_count += 1
            
        if typ == "biometric_match" and state == EvidenceState.ACCEPTED.value:
            bio_match = 1
        if typ == "government_record" and state == EvidenceState.ACCEPTED.value:
            gov_record = 1
        if typ == "ngo_record" and state == EvidenceState.ACCEPTED.value:
            ngo_record = 1
        if typ == "family_confirmation" and state == EvidenceState.ACCEPTED.value:
            fam_conf = 1
            
    verified_links = sum(1 for link in family_links if link.get("link_status") == LinkStatus.VERIFIED.value)
    
    docs_verified = sum(1 for doc in documents if doc.get("state") == DocumentState.VERIFIED.value)
    docs_rejected = sum(1 for doc in documents if doc.get("state") == DocumentState.REJECTED.value)
            
    return FeatureSnapshot(
        official_evidence_count=official_count,
        corroborated_evidence_count=corroborated_count,
        self_declared_count=self_declared_count,
        accepted_official_count=accepted_official,
        accepted_corroborated_count=accepted_corroborated,
        disputed_count=disputed_count,
        rejected_count=rejected_count,
        biometric_match_present=bio_match,
        government_record_present=gov_record,
        verified_ngo_record_present=ngo_record,
        family_confirmation_present=fam_conf,
        verified_family_links_count=verified_links,
        documents_verified_count=docs_verified,
        documents_rejected_count=docs_rejected,
        external_confirmed_matches=0
    )
