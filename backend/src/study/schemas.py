from pydantic import BaseModel, field_validator, model_validator
from typing import Optional, List
from src.upload.schemas import FileType
import re


class BaseSample(BaseModel):
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
    def trim_and_capitalize(cls, values):
        for field, value in values.items():
            if isinstance(value, str):
                values[field] = value.strip().upper()

        return values

    class Config:
        extra = "allow"


class Sample(BaseSample):
    File: Optional[FileType] = None

    def sanitize_sample_id(sample_id: str) -> str:
        """Sanitize the sample ID to ensure it only contains valid characters."""
        return re.sub(r"[^\w\-_\.]", "_", sample_id)

    @field_validator("Sample_ID")
    def validate_and_sanitize_sample_id(cls, v):
        """Pydantic validator to sanitize the Sample_ID field."""
        return cls.sanitize_sample_id(v)

    @field_validator("Sample_ID")
    def validate_sample_id_value(cls, v):
        """Pydantic validator to check the Sample_ID field is not empty."""
        if not v or v == "":
            raise ValueError("Sample_ID cannot be empty")
        return v

    @field_validator("Sample")
    def validate_sample_id_value(cls, v):
        """Pydantic validator to check the Sample_ID field is not empty."""
        if not v or v == "":
            raise ValueError("Sample_ID cannot be empty")
        return v


class SampleResponse(BaseSample):

    @model_validator(mode="before")
    def remove_file(cls, values):
        values.pop("File", None)
        return values


class SampleResponse(BaseSample):

    @model_validator(mode="before")
    def remove_file(cls, values):
        values.pop("File", None)
        return values


class BaseStudy(BaseModel):
    title: str
    description: str
    authors: List[str]


class CreateStudy(BaseStudy):
    owner_id: Optional[str] = None
    samples: List[Sample]

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Example Study",
                "description": "Example Description",
                "authors": ["Author 1", "Author 2"],
                "samples": [
                    {
                        "Sample": "DV_1A_1",
                        "Sample_ID": "1A_1",
                        "SampleGroup": "Grsoup_1",
                        "Sample_Project": "sample_project_1",
                        "Description": "Human Sample",
                        "Organism": "Homo sapiens",
                        "Tissue": "Liver",
                        "Sex": "Female",
                        "Cell_Line": "HeLa",
                        "Mouse_Model": "Model_1",
                        "Biomaterial_Provider": "Provider A",
                        "Date_Sample_Prep": "2022-01-01",
                        "Biological_Repeat": "1",
                    },
                    {
                        "Sample": "DV_1A_2",
                        "Sample_ID": "1A_2",
                        "SampleGroup": "Grsoup_1",
                        "Sample_Project": "sample_project_1",
                        "Description": "Human Sample",
                        "Organism": "Homo sapiens",
                        "Tissue": "Liver",
                        "Sex": "Male",
                        "Cell_Line": "231",
                        "Mouse_Model": "Model_2",
                        "Biomaterial_Provider": "Provider Z",
                        "Date_Sample_Prep": "2022-01-04",
                        "Biological_Repeat": "12",
                    },
                ],
            }
        }


class StudyResponse(BaseStudy):
    accession_id: str
    created_date: str
    samples: List[SampleResponse]


class StudyUpdate(BaseStudy):
    samples: List[BaseSample]

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Example Study",
                "description": "Example Description",
                "authors": ["Author 1", "Author 2"],
                "samples": [
                    {
                        "Sample": "DV_1A_1",
                        "Sample_ID": "1A_1",
                        "SampleGroup": "Grsoup_1",
                        "Sample_Project": "sample_project_1",
                        "Description": "Human Sample",
                        "Organism": "Homo sapiens",
                        "Tissue": "Liver",
                        "Sex": "Female",
                        "Cell_Line": "HeLa",
                        "Mouse_Model": "Model_1",
                        "Biomaterial_Provider": "Provider A",
                        "Date_Sample_Prep": "2022-01-01",
                        "Biological_Repeat": "1",
                    },
                    {
                        "Sample": "DV_1A_2",
                        "Sample_ID": "1A_2",
                        "SampleGroup": "Grsoup_1",
                        "Sample_Project": "sample_project_1",
                        "Description": "Human Sample",
                        "Organism": "Homo sapiens",
                        "Tissue": "Liver",
                        "Sex": "Male",
                        "Cell_Line": "231",
                        "Mouse_Model": "Model_2",
                        "Biomaterial_Provider": "Provider Z",
                        "Date_Sample_Prep": "2022-01-04",
                        "Biological_Repeat": "12",
                    },
                ],
            }
        }


class HomePageData(BaseModel):
    projects: int
    files: int
    genes: int
