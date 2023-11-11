from fastapi.testclient import TestClient

from src.server import app


client = TestClient(app)


def test_dummy():
    response = client.get('/healthcheck')
    assert response.status_code == 200
    assert isinstance(response.json()['number'], float)
