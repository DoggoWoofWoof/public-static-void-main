"""Tests for announcement endpoints."""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_list_announcements():
    res = client.get("/cases/test-id/announcements")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
