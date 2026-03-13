from fastapi import APIRouter
from app.api.routes import cases, evidence, family_links, documents, scoring, announcements, referrals

api_router = APIRouter()
api_router.include_router(cases.router)
api_router.include_router(evidence.router)
api_router.include_router(family_links.router)
api_router.include_router(documents.router)
api_router.include_router(scoring.router)
api_router.include_router(announcements.router)
api_router.include_router(referrals.router)
