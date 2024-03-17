from beanie import Document
from datetime import datetime
from pydantic import Field
from typing import Optional, List

from src.study.schemas import Sample

from src.dashboard.schemas import Collaborator, Audit


class Counter(Document):
    _id: int
    assertion: str = None


class Study(Document):
    accession_id: Optional[str] = None
    created_date: str = Field(
        default_factory=lambda: datetime.now().strftime("%d %B %Y")
    )
    owner_id: str
    title: str
    description: str
    authors: List[str] = Field(default_factory=list)
    samples: List[Sample]
    pending: bool = True
    
    collaborators: Optional[List[Collaborator]] = None
    audit_messages: List[Audit] = Field(default_factory=list) 


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
                        "file": {
                            "fastq_upload_endpoint": "/study/upload/MOSAIC-0000",
                            "fastq_download_endpoint": "/study/download/MOSAIC-0000/29382871393",
                            "file_name": "fastq.gz",
                            "file_uuid": "dwedwfsfw-fwfefsdw-sfwefw-fswf"
                        },
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
                    "file": {
                            "fastq_upload_endpoint": "/study/upload/MOSAIC-0000",
                            "fastq_download_endpoint": "/study/download/MOSAIC-0000/29382871393",
                            "file_name": "fastq.gz",
                            "file_uuid": "dwedwfsfw-fwfefsdw-sfwefw-fswf"
                        },
                    },
                ],
            }
        }

        class Settings:
            collection = "studies"
