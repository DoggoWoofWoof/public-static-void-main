# backend/app/core/security.py

from enum import Enum
from pydantic import BaseModel

class Role(str, Enum):
    REFUGEE = "refugee"
    AUTHORITY = "authority"
    PARTNER = "partner"

class Permission(str, Enum):
    # Authority permissions
    INTAKE_OFFICER = "intake_officer"
    REVIEWER = "reviewer"
    CASE_MANAGER = "case_manager"
    COMMUNICATIONS_PUBLISHER = "communications_publisher"
    
    # Partner permissions
    PARTNER_SERVICE_OFFICER = "partner_service_officer"
    
    # Refugee permissions
    READ_ONLY_SELF_SERVICE = "read_only_self_service"

class User(BaseModel):
    id: str
    username: str
    role: Role
    permissions: list[Permission]

# Hardcoded demo users
DEMO_USERS = {
    # Authorities
    "auth_intake": User(
        id="auth_intake_1",
        username="auth_intake",
        role=Role.AUTHORITY,
        permissions=[Permission.INTAKE_OFFICER]
    ),
    "auth_reviewer": User(
        id="auth_reviewer_1",
        username="auth_reviewer",
        role=Role.AUTHORITY,
        permissions=[Permission.REVIEWER]
    ),
    "auth_manager": User(
        id="auth_manager_1",
        username="auth_manager",
        role=Role.AUTHORITY,
        permissions=[Permission.CASE_MANAGER, Permission.REVIEWER, Permission.INTAKE_OFFICER, Permission.COMMUNICATIONS_PUBLISHER]
    ),
    "auth_publisher": User(
         id="auth_publisher_1",
         username="auth_publisher",
         role=Role.AUTHORITY,
         permissions=[Permission.COMMUNICATIONS_PUBLISHER]
    ),

    # Partners
    "partner_user": User(
        id="partner_user_1",
        username="partner_user",
        role=Role.PARTNER,
        permissions=[Permission.PARTNER_SERVICE_OFFICER]
    ),

    # Refugees
    "refugee_user": User(
        id="refugee_user_1",
        username="refugee_user",
        role=Role.REFUGEE,
        permissions=[Permission.READ_ONLY_SELF_SERVICE]
    )
}

def get_demo_user(username: str) -> User | None:
    return DEMO_USERS.get(username)
