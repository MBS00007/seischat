# SeisChat backend

The backend is a FastAPI modular monolith. It is the HTTP entry point for
future authentication, messaging, and WebSocket features, and uses SQLAlchemy
and Alembic to work with PostgreSQL.

## Folder structure

- `app/main.py` creates the FastAPI application and configures CORS.
- `app/core/config.py` loads environment-backed settings.
- `app/database/connection.py` creates the SQLAlchemy engine and request
  session dependency.
- `app/database/base.py` holds the declarative base for future models.
- `app/api/routes/` contains thin HTTP route modules. Phase 1 includes only
  `GET /health`.
- `migrations/` contains Alembic configuration and future migration revisions.
- `tests/` contains tests that can run without a live PostgreSQL server.

Authentication, user/message models, migrations, REST resources, and
WebSocket chat are intentionally deferred to later phases.

## Local setup

From the repository root, open PowerShell and run:

```powershell
cd backend
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

`.env` is local-only and is ignored by Git. Set `DATABASE_URL` to a
PostgreSQL database you own locally. `FRONTEND_ORIGIN` must exactly match the
browser origin, which is `http://localhost:5173` for the current Vite setup.

## Run the API

```powershell
uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/health`. A successful response is:

```json
{"status": "ok"}
```

The health endpoint reports only application availability; it does not expose
database credentials or infrastructure details.

## Run tests

```powershell
pytest
```

The Phase 1 tests cover application import, the health response, and settings
loaded from environment variables. They do not require PostgreSQL because no
database query is made by the health route.

## Alembic migrations

Alembic is configured now so future SQLAlchemy models can be migrated. There
are no Phase 1 models or migration revisions, so do not run or claim a schema
migration yet.

After a later phase adds models, create and review a revision from `backend`:

```powershell
alembic revision --autogenerate -m "Describe the schema change"
alembic upgrade head
```

To undo the latest applied revision:

```powershell
alembic downgrade -1
```

`migrations/env.py` loads the same `DATABASE_URL` setting as the application
and imports `Base.metadata`, which is how Alembic discovers model tables.
