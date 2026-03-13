# backend/app/api/routes/family_links.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Annotated
from app.schemas.family_link import FamilyLink, FamilyLinkCreate, FamilyLinkReview
from app.repositories.family_link_repo import FamilyLinkRepo
from app.core.deps import get_current_user, require_permission
from app.core.security import User, Permission
from datetime import datetime, timezone

repo = FamilyLinkRepo()

router = APIRouter(tags=["family_links"])

@router.post("/cases/{case_id}/family-links", response_model=FamilyLink)
async def add_family_link(
    case_id: str,
    link_in: FamilyLinkCreate,
    current_user: Annotated[User, Depends(get_current_user)]
):
    data = link_in.model_dump()
    data["created_at"] = datetime.now(timezone.utc).isoformat()
    # Enforce rules similar to evidence
    if current_user.role == "refugee":
        data["link_status"] = "declared"
    else:
        data["link_status"] = "declared" # standard default
        
    created = repo.create("family_links", data)
    repo.add_audit_log(
            action="create_family_link",
            entity_type="family_link",
            entity_id=created["id"],
            actor_id=current_user.id,
            role=current_user.role,
            detail={"relation": data["relation_type"]}
    )
    return created

@router.patch("/family-links/{link_id}", response_model=FamilyLink)
async def update_family_link(
    link_id: str,
    review_in: FamilyLinkReview,
    current_user: Annotated[User, Depends(require_permission(Permission.REVIEWER))]
):
     link = repo.get_by_id("family_links", link_id)
     if not link:
         raise HTTPException(status_code=404, detail="Link not found")
         
     updates = {"link_status": review_in.link_status.value}
     updated = repo.update("family_links", link_id, updates)
     
     repo.add_audit_log(
            action="update_family_link",
            entity_type="family_link",
            entity_id=link_id,
            actor_id=current_user.id,
            role=current_user.role,
            detail={"new_status": review_in.link_status.value}
    )
     return updated
