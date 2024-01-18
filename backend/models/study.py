from beanie import Document
from datetime import datetime
from pydantic import Field, BaseModel, Extra
from typing import Optional, List
from models.user import User


class Sample(BaseModel):
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

    class Config:
        extra = Extra.allow


class Study(Document):
    accession_id: Optional[str] = None
    created_date: str = Field(
        default_factory=lambda: datetime.now().strftime("%d %B %Y")
    )
    owner_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    authors: List[str] = Field(default_factory=list)
    samples: List[Sample]

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Example Study",
                "description": "Example Description",
                "authors": ["Author 1", "Author 2"],
                "samples": [
                    {
                        "Sample": "Sample 1",
                        "Sample_ID": "Sample 1",
                        "SampleGroup": "Group 1",
                        "Sample_Project": "Project 1",
                        "Description": "Description 1",
                        "Organism": "Organism 1",
                        "Tissue": "Tissue 1",
                        "Sex": "Male",
                        "Cell_Line": "Cell Line 1",
                        "Mouse_Model": "Mouse Model 1",
                        "Biomaterial_provider": "Provider 1",
                        "Date_Sample_Prep": "01 January 2022",
                        "Biological_Repeat": "Repeat 1",
                        "fastq": "Fastq 1",
                    }
                ],
            }
        }

        class Settings:
            collection = "studies"


class StudyUpdate(BaseModel):
    study_title: Optional[str] = None
    study_type: Optional[str] = None
    study_description: Optional[str] = None
    authors: Optional[List[str]] = None
    samples: Optional[List[Sample]] = None
    # extra_fields: Dict[str, Any] = Field(default_factory=dict)

    class Config:
        json_schema_extra = {
            "example": {
                "study_title": "Updated Example Study",
                "study_type": "Updated Example Type",
                "study_description": "Updated Example Description",
                "authors": ["Updated Author 1", "Updated Author 2"],
                "samples": [],
                # "extra_fields": {"additional_info": "Updated Additional Info"},
            }
        }
