from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def now_iso():
    return datetime.now(timezone.utc).isoformat()


# ---------- MODELS ----------
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)

class ContactOut(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: str

class AdmissionCreate(BaseModel):
    student_name: str = Field(..., min_length=1, max_length=120)
    parent_name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=3, max_length=30)
    grade: str = Field(..., min_length=1, max_length=40)
    program: str = Field(..., min_length=1, max_length=80)
    notes: Optional[str] = Field(default="", max_length=2000)

class AdmissionOut(BaseModel):
    id: str
    student_name: str
    parent_name: str
    email: str
    phone: str
    grade: str
    program: str
    notes: str
    created_at: str

class EventCreate(BaseModel):
    title: str
    description: str
    date: str  # ISO date
    location: str
    category: str  # academic | sports | arts | community

class EventOut(EventCreate):
    id: str
    created_at: str


# ---------- ROUTES ----------
@api_router.get("/")
async def root():
    return {"message": "Silkstrand Academy API"}


# Contact
@api_router.post("/contact", response_model=ContactOut)
async def create_contact(payload: ContactCreate):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now_iso()
    await db.contacts.insert_one(doc.copy())
    doc.pop("_id", None)
    return ContactOut(**doc)

@api_router.get("/contact", response_model=List[ContactOut])
async def list_contacts():
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


# Admissions
@api_router.post("/admissions", response_model=AdmissionOut)
async def create_admission(payload: AdmissionCreate):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now_iso()
    doc["notes"] = doc.get("notes") or ""
    await db.admissions.insert_one(doc.copy())
    doc.pop("_id", None)
    return AdmissionOut(**doc)

@api_router.get("/admissions", response_model=List[AdmissionOut])
async def list_admissions():
    items = await db.admissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


# Events
@api_router.post("/events", response_model=EventOut)
async def create_event(payload: EventCreate):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now_iso()
    await db.events.insert_one(doc.copy())
    doc.pop("_id", None)
    return EventOut(**doc)

@api_router.get("/events", response_model=List[EventOut])
async def list_events():
    items = await db.events.find({}, {"_id": 0}).sort("date", 1).to_list(500)
    return items

@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    res = await db.events.delete_one({"id": event_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"ok": True}


# Seed demo events if none present
@app.on_event("startup")
async def seed_events():
    try:
        count = await db.events.count_documents({})
        if count == 0:
            seed = [
                {"title": "Spring Science Fair", "description": "Young minds showcase inventions, coding demos, and robotics projects across grades 5–12.", "date": "2026-03-14", "location": "Main Auditorium", "category": "academic"},
                {"title": "Inter-House Athletics Meet", "description": "A full-day athletics championship with track, field, and relay events.", "date": "2026-04-02", "location": "Silk Field", "category": "sports"},
                {"title": "Silkstrand Arts Night", "description": "Student paintings, pottery, and a live orchestra performance under the stars.", "date": "2026-04-19", "location": "Webgarden Pavilion", "category": "arts"},
                {"title": "Community Reading Day", "description": "Parents and alumni read with primary students across classrooms.", "date": "2026-05-08", "location": "Weaver Library", "category": "community"},
                {"title": "Model United Nations", "description": "Two-day delegate conference hosting 20 schools across the region.", "date": "2026-05-23", "location": "Strand Hall", "category": "academic"},
            ]
            for s in seed:
                s["id"] = str(uuid.uuid4())
                s["created_at"] = now_iso()
                await db.events.insert_one(s)
    except Exception as e:
        logger.error(f"Seed failure: {e}")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
