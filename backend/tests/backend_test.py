"""Backend tests for Silkstrand Academy API"""
import os
import pytest
import requests
from datetime import datetime

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or \
    open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip().rstrip("/")

API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Root
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Silkstrand" in data["message"]


# Contact
class TestContact:
    def test_create_and_list_contact(self, client):
        payload = {
            "name": "TEST_Jane",
            "email": "TEST_jane@example.com",
            "subject": "TEST subject",
            "message": "Hello from test",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert "id" in body
        assert "created_at" in body

        r2 = client.get(f"{API}/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert any(it["id"] == body["id"] for it in items)

    def test_contact_validation(self, client):
        r = client.post(f"{API}/contact", json={"name": "x", "email": "not-an-email", "subject": "s", "message": "m"})
        assert r.status_code == 422


# Admissions
class TestAdmissions:
    def test_create_and_list_admission(self, client):
        payload = {
            "student_name": "TEST_Student",
            "parent_name": "TEST_Parent",
            "email": "TEST_parent@example.com",
            "phone": "+1-555-0100",
            "grade": "Grade 5",
            "program": "Core Program",
            "notes": "Interested in STEM",
        }
        r = client.post(f"{API}/admissions", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["student_name"] == payload["student_name"]
        assert body["notes"] == payload["notes"]
        assert "id" in body

        r2 = client.get(f"{API}/admissions")
        assert r2.status_code == 200
        items = r2.json()
        assert any(it["id"] == body["id"] for it in items)

    def test_admission_empty_notes(self, client):
        payload = {
            "student_name": "TEST_S2",
            "parent_name": "TEST_P2",
            "email": "TEST_p2@example.com",
            "phone": "555-1111",
            "grade": "Grade 1",
            "program": "Weavers",
        }
        r = client.post(f"{API}/admissions", json=payload)
        assert r.status_code == 200
        assert r.json()["notes"] == ""


# Events
class TestEvents:
    def test_seeded_events_sorted(self, client):
        r = client.get(f"{API}/events")
        assert r.status_code == 200
        items = r.json()
        assert len(items) >= 5
        dates = [it["date"] for it in items]
        assert dates == sorted(dates)
        # No mongo _id
        for it in items:
            assert "_id" not in it

    def test_create_and_delete_event(self, client):
        payload = {
            "title": "TEST_Event",
            "description": "test desc",
            "date": "2026-12-01",
            "location": "Test Hall",
            "category": "academic",
        }
        r = client.post(f"{API}/events", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["title"] == "TEST_Event"
        eid = body["id"]

        r2 = client.delete(f"{API}/events/{eid}")
        assert r2.status_code == 200
        assert r2.json().get("ok") is True

        # Deleting again => 404
        r3 = client.delete(f"{API}/events/{eid}")
        assert r3.status_code == 404
