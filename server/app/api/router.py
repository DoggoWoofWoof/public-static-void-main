"""
API router — aggregates all route modules.
"""

from fastapi import APIRouter

from app.api.routes import auth, cases, evidence, documents, family_links, announcements, referrals, scoring

api_router = APIRouter(prefix="/api" if False else "")  # no prefix for simplicity

# Mount route modules
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(cases.router, prefix="/cases", tags=["cases"])
api_router.include_router(evidence.router, tags=["evidence"])
api_router.include_router(documents.router, tags=["documents"])
api_router.include_router(family_links.router, tags=["family-links"])
api_router.include_router(announcements.router, tags=["announcements"])
api_router.include_router(referrals.router, tags=["referrals"])
api_router.include_router(scoring.router, tags=["scoring"])
