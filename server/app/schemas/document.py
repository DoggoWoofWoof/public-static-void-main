"""Document schemas."""
from pydantic import BaseModel
from typing import Optional


class DocumentOut(BaseModel):
    id: str
    case_id: str
    filename: str
    doc_type: Optional[str] = None
    uploaded_at: Optional[str] = None
