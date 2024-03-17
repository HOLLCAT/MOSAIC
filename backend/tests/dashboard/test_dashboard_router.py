import pytest
from unittest.mock import patch, AsyncMock
from fastapi import FastAPI
from src.study.schemas import StudyResponse
from fastapi.testclient import TestClient
from src.dashboard.router import router as DashboardRouter
from src.auth.jwt import generate_jwt

SAMPLE_STUDY = {
    "title": "Example Study",
    "description": "Example Description",
    "accession_id": "DV_1A",
    "created_date": "11 February 2024",
    "authors": [],
    "samples": [],
    "owner_id": "owner1",
    "pending": "False",
}

TEST_USER = {
    "email": "test@mail.com",
    "user_id": "user1",
    "role": "tester",
}

app = FastAPI()
app.include_router(DashboardRouter, tags=["Dashboard"], prefix="/dashboard")


# The fixture for the FastAPI test client
@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


@pytest.mark.asyncio
async def test_get_study_dash(client):
    jwt_token = generate_jwt(
        TEST_USER["email"], TEST_USER["user_id"], TEST_USER["role"]
    )
    expected_study = StudyResponse(**SAMPLE_STUDY)
    with patch(
        "src.dashboard.router.service.get_user_studies",
        new_callable=AsyncMock,
    ) as mock_get_user_studies, patch(
        "src.dashboard.router.service.get_collaborator_studies",
        new_callable=AsyncMock,
    ) as mock_get_collaborator_studies:

        mock_get_user_studies.return_value = [expected_study]
        mock_get_collaborator_studies.return_value = []
        headers = {"Authorization": f"Bearer {jwt_token}"}
        response = client.get(f"/dashboard/studies", headers=headers)
        assert response.status_code == 200
