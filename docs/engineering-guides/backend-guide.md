# Backend Engineering Guide

## 1. Purpose

This guide explains how the FastAPI modular monolith receives browser requests, applies rules, uses PostgreSQL, and returns REST or WebSocket results.

## 2. Responsibility

The backend owns validation, authentication, authorization, business rules, transactions, persistence, server-generated IDs/timestamps, event ordering, and safe errors. It exposes the documented REST endpoints and `/ws/chat`; it does not own HTML or frontend layout.

## 3. Concepts first

Know Python modules/functions, HTTP methods/statuses, JSON, dependency injection, relational data, transactions, cookies, hashing, and asynchronous connection lifecycle.

## 4. Tools

Python, FastAPI, Pydantic request/response validation, SQLAlchemy, Alembic, PostgreSQL, Argon2id, secure cookie sessions, CSRF middleware/dependencies, explicit CORS, and a WebSocket test client.

## 5. Features

Implement application configuration, database session dependency, models/migrations, auth routes, session validation, protected REST routes, WebSocket connection management, message validation/persistence/broadcast, ownership-based hard deletion, and online presence.

## 6. Implementation sequence

1. Create a modular package layout for configuration, auth, users, messages, WebSockets, models, and migrations.
2. Add environment-driven settings and a PostgreSQL session factory.
3. Define SQLAlchemy models and create reviewed Alembic migrations.
4. Add registration with Argon2id hashing and duplicate handling.
5. Add login, random session credential generation, credential hashing, database session creation, and Secure/HttpOnly cookie response.
6. Add session dependency, logout revocation, `/me`, CSRF checks, and explicit credentialed CORS.
7. Add cursor history and ownership-checked hard deletion.
8. Authenticate `/ws/chat`, validate `send_message`, persist in a transaction, and broadcast documented events only after success.
9. Track active connections per user and publish `online_users` after changes.
10. Add unit, API, database, and WebSocket tests.

## 7. Expected files/components

Use clear equivalents of `main`, `config`, `db`, `models`, `auth` routes/services/dependencies, `messages` routes/services/repositories, WebSocket connection manager, schemas, migrations, and backend tests. Exact layout should follow the repository’s chosen convention.

## 8. Connections

The browser sends an HTTP request to FastAPI. A route validates the request, obtains the authenticated user and database session, calls a service, commits or rolls back, and returns a documented response. For WebSockets, the connection is authenticated first; each event is parsed, authorized, persisted when needed, and broadcast to active connections. FastAPI never trusts a client-supplied user ID.

## 9. Testing

Test request validation and status codes, duplicate registration, Argon2id verification, cookie flags, session expiration/revocation, CSRF/CORS, protected routes, cursor boundaries, transaction rollback, message ownership/hard deletion, WebSocket rejection, event ordering, malformed payloads, presence counts, and disconnect cleanup.

## 10. Common mistakes

Do not put business logic in routes, store plaintext secrets, use a client-supplied author, broadcast before commit, delete without ownership checks, edit applied migrations, use wildcard credentialed CORS, swallow exceptions, or leave presence entries after disconnect.

## 11. Security

Use Argon2id for passwords; store only a hash of the session credential; set Secure, HttpOnly, and appropriate SameSite cookie settings; enforce CSRF for state-changing cookie requests; restrict CORS; use safe errors; never log passwords, tokens, cookies, or hashes.

## 12. Acceptance criteria

All documented routes work with stable errors. Protected resources reject missing/expired/revoked sessions. Messages persist before broadcasts, only owners can hard-delete, WebSocket presence reflects active connections, and migrations reproduce the schema from a clean database.

## 13. Questions

How does a cookie become a user? Where is authorization enforced? What is committed before `new_message`? How does logout affect old requests? Why does CORS not replace CSRF? What happens if a WebSocket disconnects during a broadcast?
