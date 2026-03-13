"""Tests for case endpoints."""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"


def test_list_cases():
    res = client.get("/cases")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
