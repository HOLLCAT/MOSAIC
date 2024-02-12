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
    "created_date": "11 February 2024",
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
async def test_search_studies_returns_studies(client):
    title = "Example"
    expected_studies = [StudyResponse(**SAMPLE_STUDY)]

    with patch(
        "src.study.router.service.get_search_studies", new_callable=AsyncMock
    ) as mock_search_studies:
        mock_search_studies.return_value = expected_studies

        response = client.get(f"/study/search/{title}")
        assert response.status_code == 200
        assert response.json() == [SAMPLE_STUDY]


@pytest.mark.asyncio
async def test_search_studies_returns_404_when_no_match(client):
    title = "Nonexistent Title"

    with patch(
        "src.study.router.service.get_search_studies", new_callable=AsyncMock
    ) as mock_search_studies:
        mock_search_studies.return_value = None

        response = client.get(f"/study/search/{title}")
        assert response.status_code == 404
        assert response.json() == {"detail": "Study not found."}
