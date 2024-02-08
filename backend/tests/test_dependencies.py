import pytest
from fastapi import FastAPI, Request
from unittest.mock import MagicMock
from src.dependencies import get_app

@pytest.fixture
def app():
    return FastAPI()

def test_get_app_returns_app_instance(app):
    request = MagicMock(spec=Request)
    request.app = app

    returned_app = get_app(request)
    assert returned_app == app
