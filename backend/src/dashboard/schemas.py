from pydantic import model_validator, EmailStr, BaseModel, Field
from typing import List, Optional
from datetime import datetime


class Audit(BaseModel):
    created_date: str = Field(
        default_factory=lambda: datetime.now().strftime("%d %B %Y")
    )
    user_email: str
    action: Optional[str] = None
    description: str


class CreateAuditMessage(BaseModel):
    description: str

    class Config:
        json_schema_extra = {"example": {"description": "Example description"}}


class AuditMessageResponse(BaseModel):
    name: str
    created_date: str
    action: str
    description: str


class Collaborator(BaseModel):
    email: EmailStr
    position: str

    class Config:
        json_schema_extra = {
            "name": "John",
            "position": "pipeline manager",
        }


class SampleResponse(BaseModel):
    Sample: str
    Sample_ID: str
    SampleGroup: str
    Sample_Project: str
    Description: str
    Organism: str
    Tissue: str
    Sex: str
    Cell_Line: str
    Mouse_Model: str
    Biomaterial_Provider: str
    Date_Sample_Prep: str
    Biological_Repeat: str

    @model_validator(mode="before")
    def has_file(cls, values):
        if "File" in values and values["File"] is not None:
            values["File"] = True
        else:
            values["File"] = False
        return values

    class Config:
        extra = "allow"


class CreateCollaborator(BaseModel):
    email: EmailStr
    position: Optional[str] = None


class CollaboratorResponse(BaseModel):
    name: str
    email: EmailStr
    position: str


class StudyResponse(BaseModel):
    title: str
    description: str
    authors: List[str]
    accession_id: str
    created_date: str
    samples: List[SampleResponse]
    isOwner: bool
    isPublished: bool
