from pydantic import BaseModel
from typing import Optional, List


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
        extra = "allow"


class BaseStudy(BaseModel):
    title: str
    description: str
    authors: List[str]
    samples: List[Sample]


class CreateStudy(BaseStudy):
    owner_id: Optional[str] = None

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


class StudyUpdate(BaseStudy):

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