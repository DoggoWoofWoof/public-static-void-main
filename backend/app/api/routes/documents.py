# backend/app/api/routes/documents.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Annotated
from app.schemas.document import Document, DocumentCreate, DocumentReview
from app.repositories.document_repo import DocumentRepo
from app.core.deps import get_current_user, require_permission
from app.core.security import User, Permission
from datetime import datetime, timezone

repo = DocumentRepo()

router = APIRouter(tags=["documents"])

@router.post("/cases/{case_id}/documents/register", response_model=Document)
async def register_document(
    case_id: str,
    doc_in: DocumentCreate,
    current_user: Annotated[User, Depends(get_current_user)]
):
    data = doc_in.model_dump()
    data["uploaded_by"] = current_user.id
    data["uploaded_at"] = datetime.now(timezone.utc).isoformat()
    data["state"] = "pending"
    
    created = repo.create("documents", data)
    
    repo.add_audit_log(
            action="register_document",
            entity_type="document",
            entity_id=created["id"],
            actor_id=current_user.id,
            role=current_user.role,
            detail={"type": data["document_type"]}
    )
    return created

@router.patch("/documents/{document_id}/review", response_model=Document)
async def review_document(
    document_id: str,
    review_in: DocumentReview,
    current_user: Annotated[User, Depends(require_permission(Permission.REVIEWER))]
):
     doc = repo.get_by_id("documents", document_id)
     if not doc:
         raise HTTPException(status_code=404, detail="Document not found")
         
     updates = {
         "state": review_in.state.value,
         "verified_by": current_user.id,
         "verified_at": datetime.now(timezone.utc).isoformat()
     }
     
     updated = repo.update("documents", document_id, updates)
     
     repo.add_audit_log(
            action="review_document",
            entity_type="document",
            entity_id=document_id,
            actor_id=current_user.id,
            role=current_user.role,
            detail={"new_state": review_in.state.value}
     )
     return updated
