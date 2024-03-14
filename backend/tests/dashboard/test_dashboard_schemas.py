import pytest
from datetime import datetime
from pydantic import ValidationError
from src.dashboard.schemas import SampleResponse, StudyResponse

# Sample data to populate all required fields
sample_required_fields = {
    "Sample_ID": "1", 
    "File": "path/to/file",  
    "Sample": "SampleValue",
    "SampleGroup": "SampleGroupValue",
    "Sample_Project": "SampleProjectValue",
    "Description": "DescriptionValue",
    "Organism": "OrganismValue",
    "Tissue": "TissueValue",
    "Sex": "Male",
    "Cell_Line": "CellLineValue",
    "Mouse_Model": "MouseModelValue",
    "Biomaterial_Provider": "BiomaterialProviderValue",
    "Date_Sample_Prep": "2020-01-01",
    "Biological_Repeat": "1",
}

def test_sample_response_with_file():
    sample_data = sample_required_fields.copy()
    sample_data["File"] = "path/to/file"
    sample = SampleResponse(**sample_data)
    assert sample.File is True

def test_sample_response_without_file():
    sample_data = sample_required_fields.copy()
    sample_data["File"] = None
    sample = SampleResponse(**sample_data)
    assert sample.File is False

def test_study_response_creation():
    study_data = {
        "accession_id": "ACC123",
        "created_date": datetime.now().isoformat(),
        "title": "Study Title",
        "description": "Study Description",
        "authors": ["Author1", "Author2"],
        "samples": [
            sample_required_fields.copy(),
            sample_required_fields.copy()
        ]
    }
    study_data["samples"][1]["File"] = None  # The second sample has no files
    study = StudyResponse(**study_data)
    assert len(study.samples) == 2
    assert study.samples[0].File is True
    assert study.samples[1].File is False
