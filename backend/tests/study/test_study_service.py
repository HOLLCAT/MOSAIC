import pytest
from unittest.mock import AsyncMock
from src.study.service import get_next_mosaic_id


@pytest.mark.asyncio
async def test_get_next_mosaic_id():
    mock_db = AsyncMock()
    mock_db.counters.find_one_and_update.return_value = {"counter": 1}

    mosaic_id = await get_next_mosaic_id(mock_db)
    assert mosaic_id == "MOSAIC-0001"


from unittest.mock import patch, MagicMock


@pytest.mark.asyncio
@patch("src.study.service.study_collection")
async def test_get_studies_returns_list_of_studies(mock_study_collection):
    from src.study.service import get_studies

    # Use MagicMock to create a simulated Study object
    mock_study1 = MagicMock(
        accession_id="MOSAIC-0001",
        owner_id="owner1",
        title="Study 1",
        description="Description 1",
        authors=[],
        samples=[],
    )
    mock_study2 = MagicMock(
        accession_id="MOSAIC-0002",
        owner_id="owner2",
        title="Study 2",
        description="Description 2",
        authors=[],
        samples=[],
    )

    # Set the simulated return value of the all().to_list() method
    mock_study_collection.all.return_value.to_list = AsyncMock(
        return_value=[mock_study1, mock_study2]
    )

    # Call the get_studies function and verify the return value
    studies = await get_studies()
    assert len(studies) == 2
