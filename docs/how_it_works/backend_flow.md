# Backend Flow

### Backend Project Structure
```
backend/
├── nginx/
│ ├── default.conf
│ └── nginx.conf
├── src/
│ ├── auth/
│ │ ├── init.py
│ │ ├── config.py
│ │ ├── constants.py
│ │ ├── exceptions.py
│ │ ├── jwt.py
│ │ ├── models.py
│ │ ├── router.py
│ │ ├── schemas.py
│ │ ├── service.py
│ │ └── utils.py
│ ├── dashboard/
│ │ ├── init.py
│ │ ├── constants.py
│ │ ├── exceptions.py
│ │ ├── router.py
│ │ ├── schemas.py
│ │ └── service.py
│ ├── sampleFileUpload/
│ │ ├── init.py
│ │ ├── constants.py
│ │ ├── exceptions.py
│ │ ├── router.py
│ │ ├── schemas.py
│ │ ├── service.py
│ │ └── utils.py
│ ├── study/
│ │ ├── init.py
│ │ ├── constants.py
│ │ ├── exceptions.py
│ │ ├── models.py
│ │ ├── router.py
│ │ ├── schemas.py
│ │ ├── service.py
│ │ └── utils.py
│ ├── init.py
│ ├── app.py
│ ├── database.py
│ ├── dependencies.py
│ ├── exceptions.py
│ ├── logging.py
│ └── middleware.py
├── tests/
│ ├── init.py
│ ├── auth/
│ ├── study/
│ ├── test_database.py
│ ├── test_dependencies.py
│ └── test_exceptions.py
├── .env.sample
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── main.py
├── pytest.ini
├── requirements.txt
└── run_tests.bat
````

## Module Files

Each module (e.g., `study`) has a standard set of files:

- `constants.py`: Contains error codes and constant strings used throughout the module.
- `exceptions.py`: Defines exception classes used for error handling within the module's routes.
- `router.py`: Contains all FastAPI route definitions for the module.
- `schemas.py`: Holds Pydantic models for validating user input.
- `service.py`: Includes functions that interact with the database.
- `utils.py`: Provides utility functions to support `router.py`.

For more info on the modules go to [API modules section](/docs/api)

## Other Files

Other important files located in the root directory include:

- `app.py`: The FastAPI application instance is created here, routers are included, and database lifespan is managed.
- `database.py`: Sets up database connections and contains shared database utility functions.
- `dependencies.py`: Contains dependencies that are injected into FastAPI routes.
- `exceptions.py`: The base exception file from which each module's exceptions are derived.
- `logging.py`: Configures logging to track backend API requests.
- `middleware.py`: Manages middleware operations, including request logging.
- `main.py`: Entry point to run the backend service locally.
- `tests/`: Directory containing tests for the modules.
- `docker-compose.yml` & `Dockerfile`: Docker configuration files for containerization of the backend.
- `requirements.txt`: Lists all the dependencies required to run the backend.
- `requirements.dev.txt`: Lists all the dependencies required to run the backend in the local machine to run all tests.

## Docker and Deployment Files

- Docker-related files (`Dockerfile` and `docker-compose.yml`) are used for containerization and orchestration of the backend services.
- `.env.sample` is a template for setting up environment variables required by the application.
- `.env.dev` is a template for setting up environment variables required by the application for developers.
- `run_tests.bat` is a batch script for executing automated tests on Windows systems.

## Testing

The `tests/` directory contains all the automated tests for the modules. It includes specific tests for database interactions, dependencies, and exception handling. These tests are essential for maintaining code quality and ensuring the robustness of the backend services.



