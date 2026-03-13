"""Documents routes."""

from fastapi import APIRouter
from app.services.document_service import DocumentService

router = APIRouter()
service = DocumentService()


@router.get("/cases/{case_id}/documents")
async def list_documents(case_id: str):
    return await service.list_documents(case_id)


@router.post("/cases/{case_id}/documents")
async def upload_document(case_id: str):
    # TODO: file upload handling
    return {"message": "Document upload endpoint — not yet implemented"}
