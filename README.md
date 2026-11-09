# SeisChat

**Connect • Chat • Call • Grow**

SeisChat is a web-based, real-time messaging application for registered users. The MVP provides one shared chatroom, persistent text messages, authenticated access, message ownership controls, and live online presence for a six-member engineering team to build and maintain together.

## Objectives

- Provide a simple and reliable shared chat experience.
- Make messages available to authenticated users across sessions, including messages sent before a user registered.
- Keep the system modular, understandable, and appropriate for a small team.
- Establish clear contracts before application implementation begins.

## Core Features

- User registration, login, logout, and unique usernames.
- One authenticated shared chatroom.
- Real-time text messaging over WebSockets.
- Persistent message storage in PostgreSQL.
- Retrieval of previous messages.
- Deletion of a user's own messages, reflected for everyone.
- Live online-user display with connect/disconnect updates.

Private messaging, multiple chatrooms, groups, voice/video calls, file/image sharing, reactions, read receipts, AI summaries, and push notifications are outside the V1 scope.

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React (JavaScript), Tailwind CSS |
| Backend | Python, FastAPI, SQLAlchemy, Alembic |
| Database | PostgreSQL |
| Real-time communication | WebSockets |
| Version control | Git and GitHub |
| Architecture | Modular monolith |

## Repository Structure

```text
seischat/
├── frontend/                 # React and Tailwind CSS application
├── backend/                  # FastAPI modular monolith
├── .github/
│   └── copilot-instructions.md
├── docs/
│   ├── team/
│   ├── engineering-guides/
│   ├── learning/
│   ├── architecture.md
│   ├── requirements.md
│   ├── database-design.md
│   ├── api-contract.md
│   ├── websocket-events.md
│   └── coding-standards.md
├── .env.example
├── .gitignore
└── README.md
```

The `frontend/` and `backend/` directories are intentionally empty until implementation work begins.

## Development Setup

### Prerequisites

- Git
- Python 3.11 or a team-approved compatible version
- Node.js and npm (team-approved LTS versions)
- PostgreSQL

Exact supported versions are **TODO: Team Decision Required**.

### Clone and configure

```bash
git clone <repository-url>
cd seischat
cp .env.example .env
```

Do not commit `.env`. Replace every placeholder with local development values. The `DATABASE_URL` must point to a PostgreSQL database, and `SECRET_KEY` must be a locally generated secret.

### Run the backend

The backend implementation and dependency manifest are not created yet. Once they exist, the expected local workflow is:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt  # TODO: Team Decision Required: dependency workflow
alembic upgrade head
uvicorn app.main:app --reload
```

The backend host, port, and migration workflow are **TODO: Team Decision Required** until implementation is added.

### Run the frontend

The frontend implementation and package manifest are not created yet. Once they exist, the expected local workflow is:

```bash
cd frontend
npm install
npm run dev
```

The frontend development command and port are **TODO: Team Decision Required** until the project scaffold is added.

## Environment Variables

Copy `.env.example` to `.env` and set:

- `DATABASE_URL`: PostgreSQL connection URL.
- `SECRET_KEY`: secret used by the backend for authentication-related signing or encryption.
- `SESSION_EXPIRE_MINUTES`: session lifetime in minutes.
- `FRONTEND_URL`: allowed frontend origin for local development and CORS.

Authentication uses server-side sessions in Secure, HttpOnly cookies, with Argon2id password hashing and CSRF protection. See [the API contract](docs/api-contract.md) and [database design](docs/database-design.md).

## Documentation

- [Architecture](docs/architecture.md)
- [Requirements](docs/requirements.md)
- [Database design](docs/database-design.md)
- [REST API contract](docs/api-contract.md)
- [WebSocket events](docs/websocket-events.md)
- [Coding standards](docs/coding-standards.md)
- [Engineering Handbook](docs/team/team.md)

## Team Contribution Guidelines

1. Create a focused branch from `main`; use the naming and commit conventions in [coding standards](docs/coding-standards.md).
2. Keep changes scoped to one feature, fix, or documentation concern.
3. Update relevant contracts and documentation when behavior changes.
4. Run the applicable checks locally before opening a pull request.
5. Open a pull request with a clear summary, testing notes, and screenshots for meaningful UI changes.
6. Request review from at least one teammate and resolve review comments before merging.

No repository URL, deployment URL, or team member names are assumed by this document.
