from beanie import Document
from datetime import datetime
from pydantic import Field, BaseModel, create_model
from typing import Optional, Dict, Any


class Study(Document):
    accession_id: Optional[str] = None
    created_date: str = Field(default_factory=lambda: datetime.now().strftime("%d %B %Y"))
    study_title: Optional[str] = None
    study_type: Optional[str] = None
    organism: Optional[str] = None
    study_description: Optional[str] = None
    extra_fields: Dict[str, Any] = Field(default_factory=dict)  # For additional, dynamic fields
    
    class Config:
        json_schema_extra = {
            "example": {
                "study_title": "Example Study",
                "study_type": "Example Type",
                "organism": "Example Organism",
                "study_description": "Example Description",
                "extra_fields": {"additional_info": "example"}
            }
        }
        
        
        class Settings:
            collection = "studies"


from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class StudyUpdate(BaseModel):
    study_title: Optional[str] = None
    study_type: Optional[str] = None
    organism: Optional[str] = None
    study_description: Optional[str] = None
    extra_fields: Dict[str, Any] = Field(default_factory=dict)  # For additional, dynamic fields

    class Config:
        json_schema_extra = {
            "example": {
                "study_title": "Updated Example Study",
                "study_type": "Updated Example Type",
                "organism": "Updated Example Organism",
                "study_description": "Updated Example Description",
                "extra_fields": {"additional_info": "example"}
            }
        }

        

class Response(BaseModel):
    data: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "data": "Sample data",
            }
        }
        
