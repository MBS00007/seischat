# SeisChat Copilot Instructions

## Project identity

SeisChat is a beginner-friendly web-based real-time messaging application. V1 is one shared chatroom for registered users, with persistent text messages, authenticated access, ownership-based hard deletion, message history, and live online presence. The goal is both a working product and a team that can explain the system.

Before changing code or documentation, inspect the relevant repository files and contracts. Understand the task, explain the approach for substantial changes, preserve existing architecture, and avoid unnecessary dependencies.

## Approved architecture and stack

- Frontend: React with JavaScript and Tailwind CSS.
- Backend: Python, FastAPI, SQLAlchemy, and Alembic in a modular monolith.
- Database: PostgreSQL.
- Real time: WebSockets at `/ws/chat`.
- Authentication: server-side sessions carried in Secure, HttpOnly cookies; passwords hashed with Argon2id; CSRF protection for state-changing HTTP requests; explicit CORS configuration.
- Messages: hard deletion. A deleted message is removed from PostgreSQL and clients receive `message_deleted`.
- History: cursor-based pagination.
- Git: `main`, short-lived feature branches, pull requests, and at least one teammate review before merging.

Do not silently replace an approved technology, add a service, change deletion semantics, or change session transport. Do not invent endpoints or WebSocket events; use `docs/api-contract.md` and `docs/websocket-events.md`.

## Architecture rules

Keep route handlers thin. Put validation at boundaries, business rules in services, and database access behind a consistent SQLAlchemy data-access pattern. Alembic is the only production schema-change mechanism. PostgreSQL is the source of truth for users, sessions, and messages; in-memory connection management is the source of truth for live WebSocket presence in the single-process MVP.

The backend is authoritative for identity, authorization, IDs, timestamps, persistence, and presence. The frontend renders server-confirmed state and must handle loading, empty, error, unauthorized, and disconnected states.

## Frontend conventions

- Use focused functional React components and hooks.
- Keep API and WebSocket communication in client modules rather than scattering calls through UI components.
- Use `credentials: "include"` for cookie-authenticated requests.
- Never decide ownership, username uniqueness, or authorization in the browser.
- Do not inject raw HTML from message content.
- Reconcile messages by server ID and remove deleted messages only after the server confirmation/event.
- Keep user-visible error messages safe and useful.

## Backend conventions

- Use type hints and clear names.
- Validate request bodies and WebSocket payloads at the boundary.
- Return the documented error shape and status codes.
- Hash passwords with Argon2id; never log or store plaintext passwords.
- Generate unpredictable session credentials, store only a credential hash, set Secure and HttpOnly cookie attributes, and enforce expiration/revocation.
- Apply CSRF protection to state-changing cookie-authenticated HTTP requests. Configure CORS to the known frontend origin and allow credentials without using a wildcard origin.
- Verify message ownership on the backend before hard deletion.
- Treat a `new_message` event as successful only after database persistence.
- Handle WebSocket disconnects explicitly and broadcast updated presence.
- Never use broad exception catches or success-shaped fallbacks.

## REST and WebSocket contracts

REST resources are documented in `docs/api-contract.md`: registration, login, logout, current user, cursor-paginated message history, message deletion, and online users. WebSocket events are documented in `docs/websocket-events.md`: `send_message`, `new_message`, `message_deleted`, `online_users`, and `error`. Keep JSON shapes, status codes, IDs, timestamps, and error codes consistent across contracts.

## Testing requirements

Every implemented feature needs focused tests. Cover validation, authorization, persistence, failure paths, and integration boundaries. At minimum, test registration and duplicate usernames, login/session/cookie behavior, CSRF failures, protected access, cursor history, message persistence and broadcast, ownership-based hard deletion, presence changes, reconnect behavior, frontend loading/error states, and end-to-end MVP flows. Explain the exact commands used to run tests.

## Git and documentation

Use a descriptive short-lived branch such as `feature/message-history`, `fix/session-expiry`, or `docs/engineering-handbook`. Open a focused pull request, describe the change and checks, request at least one teammate review, and do not merge code the author cannot explain.

Update the relevant documentation when an endpoint, event, schema, user-visible behavior, or architectural decision changes. Keep examples valid and cross-document contracts synchronized.

## Teaching mode

For substantial work, explain:

1. The problem and concepts involved.
2. The implementation approach and why it fits the architecture.
3. Files changed and connections to other components.
4. How to test it and common mistakes.
5. Security and integration risks.
6. Questions the assigned developer should be able to answer.

AI-generated code must be reviewed, tested, and understood by a teammate. AI is a mentor and accelerator, not a replacement for learning fundamentals. Keep explanations brief for trivial edits, but never hide important architectural reasoning.
