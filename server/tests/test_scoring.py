"""Tests for scoring endpoints."""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_get_latest_score():
    res = client.get("/cases/test-id/score/latest")
    assert res.status_code == 200
    data = res.json()
    assert "predicted_score" in data
    assert "confidence_band" in data
    assert "top_factors" in data
