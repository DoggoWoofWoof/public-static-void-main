# backend/app/repositories/supabase_repo.py
from typing import Any, Dict, List, Optional

class SupabaseRepository:
    def __init__(self):
        # Stub implementation. In a real scenario, initialize Supabase client here.
        pass

    def get_all(self, collection: str) -> List[Dict]:
        raise NotImplementedError("Supabase repo stub")

    def get_by_id(self, collection: str, item_id: str) -> Optional[Dict]:
        raise NotImplementedError("Supabase repo stub")
        
    def find_many(self, collection: str, filters: Dict[str, Any]) -> List[Dict]:
        raise NotImplementedError("Supabase repo stub")

    def create(self, collection: str, data: Dict) -> Dict:
        raise NotImplementedError("Supabase repo stub")

    def update(self, collection: str, item_id: str, updates: Dict) -> Optional[Dict]:
        raise NotImplementedError("Supabase repo stub")

    def delete(self, collection: str, item_id: str) -> bool:
        raise NotImplementedError("Supabase repo stub")
        
    def get_case_evidence(self, case_id: str) -> List[Dict]:
         raise NotImplementedError("Supabase repo stub")
        
    def get_case_documents(self, case_id: str) -> List[Dict]:
         raise NotImplementedError("Supabase repo stub")

    def get_case_family_links(self, case_id: str) -> List[Dict]:
         raise NotImplementedError("Supabase repo stub")
        
    def get_latest_score(self, case_id: str) -> Optional[Dict]:
         raise NotImplementedError("Supabase repo stub")

    def add_audit_log(self, action: str, entity_type: str, entity_id: str, actor_id: str, role: str, detail: Dict):
         raise NotImplementedError("Supabase repo stub")
