# backend/app/repositories/json_repo.py
import json
import os
from pathlib import Path
from typing import Any, Dict, List, Optional
import uuid
from datetime import datetime, timezone

# Compute absolute path to data/seed/ based on this file's location
BASE_DIR = Path(__file__).resolve().parent.parent.parent
SEED_DIR = BASE_DIR / "data" / "seed"

class JsonRepository:
    def __init__(self):
        # Ensure seed directory exists
        SEED_DIR.mkdir(parents=True, exist_ok=True)
        # Initialize empty files if they don't exist
        self._ensure_file_exists("profiles.json", [])
        self._ensure_file_exists("persons.json", [])
        self._ensure_file_exists("cases.json", [])
        self._ensure_file_exists("evidence_items.json", [])
        self._ensure_file_exists("family_links.json", [])
        self._ensure_file_exists("documents.json", [])
        self._ensure_file_exists("announcements.json", [])
        self._ensure_file_exists("referrals.json", [])
        self._ensure_file_exists("score_snapshots.json", [])
        self._ensure_file_exists("audit_logs.json", [])

    def _ensure_file_exists(self, filename: str, default_content: Any):
        filepath = SEED_DIR / filename
        if not filepath.exists():
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(default_content, f, indent=2)

    def _read_file(self, filename: str) -> List[Dict]:
        filepath = SEED_DIR / filename
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def _write_file(self, filename: str, data: List[Dict]):
        filepath = SEED_DIR / filename
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
            
    def _generate_id(self) -> str:
        return str(uuid.uuid4())
        
    def _now(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    # Generic CRUD
    def get_all(self, collection: str) -> List[Dict]:
        return self._read_file(f"{collection}.json")

    def get_by_id(self, collection: str, item_id: str) -> Optional[Dict]:
        items = self.get_all(collection)
        for item in items:
            if item.get("id") == item_id:
                return item
        return None
        
    def find_many(self, collection: str, filters: Dict[str, Any]) -> List[Dict]:
        items = self.get_all(collection)
        result = []
        for item in items:
            match = True
            for k, v in filters.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                result.append(item)
        return result

    def create(self, collection: str, data: Dict) -> Dict:
        items = self.get_all(collection)
        if "id" not in data:
            data["id"] = self._generate_id()
        items.append(data)
        self._write_file(f"{collection}.json", items)
        return data

    def update(self, collection: str, item_id: str, updates: Dict) -> Optional[Dict]:
        items = self.get_all(collection)
        for i, item in enumerate(items):
            if item.get("id") == item_id:
                items[i].update(updates)
                self._write_file(f"{collection}.json", items)
                return items[i]
        return None

    def delete(self, collection: str, item_id: str) -> bool:
        items = self.get_all(collection)
        filtered_items = [item for item in items if item.get("id") != item_id]
        if len(filtered_items) < len(items):
            self._write_file(f"{collection}.json", filtered_items)
            return True
        return False
        
    # Specific helpers
    def get_case_evidence(self, case_id: str) -> List[Dict]:
        return self.find_many("evidence_items", {"case_id": case_id})
        
    def get_case_documents(self, case_id: str) -> List[Dict]:
        return self.find_many("documents", {"case_id": case_id})

    def get_case_family_links(self, case_id: str) -> List[Dict]:
        return self.find_many("family_links", {"case_id": case_id})
        
    def get_latest_score(self, case_id: str) -> Optional[Dict]:
        scores = self.find_many("score_snapshots", {"case_id": case_id})
        if not scores:
            return None
        # Sort by created_at descending
        scores.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return scores[0]

    def add_audit_log(self, action: str, entity_type: str, entity_id: str, actor_id: str, role: str, detail: Dict):
        log_entry = {
            "id": self._generate_id(),
            "action": action,
            "entity_type": entity_type,
            "entity_id": entity_id,
            "actor_id": actor_id,
            "role": role,
            "timestamp": self._now(),
            "detail": detail
        }
        self.create("audit_logs", log_entry)

# Singleton instance
repo = JsonRepository()
