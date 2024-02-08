from fastapi import FastAPI
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from src.study.router import router as StudyRouter
from src.study.schemas import StudyResponse

app = FastAPI()
app.include_router(StudyRouter, tags=["Study"], prefix="/study")


# The fixture for the FastAPI test client
@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


SAMPLE_STUDY = {
    "title": "Example Study",
    "description": "Example Description",
    "accession_id": "DV_1A",
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


@pytest.mark.asyncio
async def test_get_study_should_return_study_when_study_exists(client):
    accession_id = "1"
    expected_study = StudyResponse(**SAMPLE_STUDY)

    with patch(
        "src.study.router.service.get_study_by_id", new_callable=AsyncMock
    ) as mock_get_study:
        mock_get_study.return_value = expected_study

        response = client.get(f"/study/{accession_id}")
        assert response.status_code == 200
        assert response.json() == SAMPLE_STUDY


@pytest.mark.asyncio
async def test_get_study_should_return_404_when_study_not_found(client):
    accession_id = "non_existing_id"

    with patch(
        "src.study.router.service.get_study_by_id", new_callable=AsyncMock
    ) as mock_get_study:
        mock_get_study.return_value = None

        response = client.get(f"/study/{accession_id}")
        assert response.status_code == 404
        assert response.json() == {"detail": "Study not found."}
