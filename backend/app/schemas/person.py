# backend/app/schemas/person.py

from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class PersonBase(BaseModel):
    primary_name: str
    alt_names: list[str] = Field(default_factory=list)
    dob: Optional[date] = None
    sex: Optional[str] = None
    nationality: Optional[str] = None
    primary_language: Optional[str] = None

class PersonCreate(PersonBase):
    pass

class Person(PersonBase):
    id: str
    created_at: str
    created_by: Optional[str] = None

    class Config:
        from_attributes = True

