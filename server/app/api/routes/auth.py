"""Auth routes — login and token generation."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.auth import LoginRequest, LoginResponse
from app.core.security import create_access_token

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(body: LoginRequest):
    # For hackathon demo: accept any email with password "demo1234"
    if body.password != "demo1234":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": body.email, "role": "authority"})
    return LoginResponse(access_token=token, token_type="bearer")
