import pytest
from fastapi import FastAPI


@pytest.mark.asyncio
async def test_get_database():
    from unittest.mock import MagicMock
    from src.database import get_database

    app = FastAPI()
    app.state.mongodb_client = MagicMock()
    app.state.mongodb_client.get_default_database.return_value = "test_database"
    db = await get_database(app)
    assert db == "test_database"


from unittest.mock import patch


@pytest.mark.asyncio
@patch("src.database.AsyncIOMotorClient")
@patch("src.database.init_beanie")
async def test_initiate_database(mock_init_beanie, mock_client):
    from src.database import initiate_database

    app = FastAPI()
    await initiate_database(app)
    mock_client.assert_called_once()
    mock_init_beanie.assert_awaited_once()


@pytest.mark.asyncio
@patch("src.database.AsyncIOMotorClient")
async def test_shutdown_database(mock_client_class):
    from src.database import shutdown_database
    from unittest.mock import MagicMock

    mock_client = MagicMock()
    await shutdown_database(mock_client)
    mock_client.close.assert_called_once()


def test_convert_objectid_to_str():
    from bson import ObjectId
    from src.database import convert_objectid_to_str

    data = {"_id": ObjectId(), "nested": {"_id": ObjectId()}}
    converted_data = convert_objectid_to_str(data)
    assert isinstance(converted_data["_id"], str)
    assert isinstance(converted_data["nested"]["_id"], str)
