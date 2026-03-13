"""
BorderBridge — FastAPI application entry point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router

app = FastAPI(
    title="BorderBridge API",
    description="Identity confidence scoring and case management for displaced populations.",
    version="0.1.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all routes
app.include_router(api_router)


@app.get("/health", tags=["system"])
async def health_check():
    return {"status": "ok", "service": "borderbridge-api"}
