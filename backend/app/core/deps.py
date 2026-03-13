# backend/app/core/deps.py
from typing import Annotated
from fastapi import Header, HTTPException, Depends
from app.core.security import get_demo_user, User, Permission

# A mock dependency to get the current user based on a header token (username in this demo)
async def get_current_user(x_demo_username: Annotated[str, Header()] = "auth_manager") -> User:
    user = get_demo_user(x_demo_username)
    if not user:
         raise HTTPException(status_code=401, detail="Invalid Demo Username provided in X-Demo-Username header.")
    return user

# Dependency factory for checking permissions
def require_permission(required_permission: Permission):
    def permission_checker(current_user: Annotated[User, Depends(get_current_user)]) -> User:
        if required_permission not in current_user.permissions:
            raise HTTPException(status_code=403, detail=f"User does not have required permission: {required_permission.value}")
        return current_user
    return permission_checker

async def get_scoring_service():
    from app.services.scoring_service import ScoringService
    return ScoringService()
