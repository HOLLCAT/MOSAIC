from beanie import Document
from datetime import datetime
from pydantic import Field, BaseModel, Extra
from typing import Optional, Dict, Any, List


class Sample(BaseModel):
    # Sample: str
    Sample_ID: str
    SampleGroup: str
    Sample_Project: str
    Description: str
    Organism: str
    Tissue: str
    Sex: str
    Cell_Line: str
    Mouse_Model: str
    Biomaterial_provider: str
    Date_Sample_Prep: str
    Biological_Repeat: str
    fastq: str

    class Config:
        extra = Extra.allow


class Study(Document):
    accession_id: Optional[str] = None
    created_date: str = Field(
        default_factory=lambda: datetime.now().strftime("%d %B %Y")
    )
    study_title: Optional[str] = None
    study_type: Optional[str] = None
    study_description: Optional[str] = None
    authors: List[str] = Field(default_factory=list)
    samples: List[Sample]

    class Config:
        json_schema_extra = {
            "example": {
                "accession_id": "Example Accession ID",
                "created_date": "01 January 2022",
                "study_title": "Example Study",
                "study_type": "Example Type",
                "study_description": "Example Description",
                "authors": ["Author 1", "Author 2"],
                "samples": [
                    {
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
    organism: Optional[str] = None
    study_description: Optional[str] = None
    extra_fields: Dict[str, Any] = Field(default_factory=dict)

    class Config:
        json_schema_extra = {
            "example": {
                "study_title": "",
                "study_type": "",
                "organism": "",
                "study_description": "",
                "extra_fields": {"additional_info": ""},
            }
        }
