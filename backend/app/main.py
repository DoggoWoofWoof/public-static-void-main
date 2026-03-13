from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    cases,
    evidence,
    family_links,
    documents,
    scoring,
    announcements,
    referrals,
)

app = FastAPI(
    title="BorderBridge Backend API",
    description="Identity confidence scoring and case management for displaced populations.",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}


# Register routers
app.include_router(cases.router, tags=["Cases"])
app.include_router(evidence.router, tags=["Evidence"])
app.include_router(family_links.router, tags=["Family Links"])
app.include_router(documents.router, tags=["Documents"])
app.include_router(scoring.router, prefix="/cases/{case_id}", tags=["Scoring"])
app.include_router(announcements.router, tags=["Announcements"])
app.include_router(referrals.router, tags=["Referrals"])
