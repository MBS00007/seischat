# SeisChat Team Responsibilities

The six roles below are provisional ownership areas, not silos. Each feature has a primary owner, but at least one other developer must understand the design, tests, and failure modes. Ownership means coordinating the work and keeping documentation current, not becoming the only person who can change it.

## Member 1: Backend foundation and database

**Main responsibility:** Establish the FastAPI application structure, configuration, SQLAlchemy models, database sessions, and Alembic workflow.

**Secondary responsibilities:** Shared error handling, logging conventions, repository/data-access patterns, migration review, and backend developer setup.

**Owns:** Application startup, `users`, `sessions`, and `messages` model foundations; database connection configuration; migration baseline; common backend utilities.

**Deliverables:** Runnable backend skeleton, documented environment setup, initial migrations, model tests, database test fixture, and an architecture walkthrough.

**Dependencies:** Coordinates with Member 2 on session fields and security; Member 5 on message fields and pagination indexes; Member 6 on test fixtures and migration checks; Members 3–4 on API shape assumptions.

**Must understand:** HTTP request flow, FastAPI dependency injection, relational constraints, transactions, SQLAlchemy sessions, and why migrations are versioned.

**Must test:** Model constraints, foreign keys, transaction rollback, migration upgrade path, cursor ordering, and database isolation between tests.

**Must demonstrate:** A registration-related row path from API dependency to SQLAlchemy model and PostgreSQL, plus how a migration is created and reviewed.

## Member 2: Authentication and backend security

**Main responsibility:** Implement secure registration, login, logout, current-user lookup, server-side sessions, Argon2id hashing, CSRF, and CORS.

**Secondary responsibilities:** Authentication dependencies for REST and WebSockets, security-focused error handling, session expiry/revocation, and threat-model documentation.

**Owns:** `/api/auth/*`, cookie policy, session validation, password policy implementation, CSRF checks, and protected-route behavior.

**Deliverables:** Auth services and routes, secure cookie/session handling, CSRF and CORS configuration, security tests, and a short threat-model walkthrough.

**Dependencies:** Member 1 supplies models and transactions; Member 3 consumes auth responses and protected-route behavior; Member 4 consumes WebSocket authentication; Member 6 reviews security tests.

**Must understand:** Hashing versus encryption, session identifiers versus password hashes, browser cookies, CSRF, CORS, authentication versus authorization, and safe error messages.

**Must test:** Duplicate registration, invalid credentials, cookie attributes, expiration/revocation, CSRF rejection, CORS behavior, protected REST access, and unauthenticated WebSocket rejection.

**Must demonstrate:** A browser login request creating a server-side session and how the same session is checked by REST and WebSocket code.

## Member 3: Frontend foundation and authentication UI

**Main responsibility:** Establish the React/Tailwind structure, routing, API client, registration/login screens, auth state, and protected routes.

**Secondary responsibilities:** Shared layout, accessible form patterns, loading/error feedback, and frontend testing conventions.

**Owns:** Guest pages, auth forms, current-user bootstrap, logout UI, route guards, and the cookie-aware HTTP client.

**Deliverables:** Frontend scaffold, auth screens, protected route behavior, API client tests, and a UI walkthrough showing failure states.

**Dependencies:** Member 2 defines API and cookie/CSRF behavior; Member 1 confirms local run configuration; Member 4 consumes protected chat layout; Member 6 reviews component and browser-flow tests.

**Must understand:** Components, props, state, hooks, routing, controlled forms, `credentials: "include"`, and why frontend checks do not replace backend authorization.

**Must test:** Form validation, duplicate username and invalid-login errors, loading states, protected redirects, logout, and API failure handling.

**Must demonstrate:** The browser flow from login form to `/api/auth/me` to protected chatroom access.

## Member 4: Chatroom interface and WebSocket frontend integration

**Main responsibility:** Build the authenticated chatroom UI and WebSocket client lifecycle.

**Secondary responsibilities:** Online-user display, connection status, reconnect behavior, accessible message rendering, and event parsing.

**Owns:** Chatroom layout, message list presentation, WebSocket connection manager, presence UI, disconnected/reconnecting states, and event-driven state updates.

**Deliverables:** Chatroom shell, WebSocket client, event handlers, presence display, reconnection behavior, and component/integration tests.

**Dependencies:** Member 2 defines WebSocket authentication; Member 5 defines message/history/deletion behavior; Member 3 supplies protected routing and shared UI; Member 6 tests multi-client scenarios.

**Must understand:** WebSocket lifecycle, server-authoritative state, idempotent event handling, reconnect limitations, and the difference between optimistic and confirmed UI.

**Must test:** Connect/reject, `new_message`, `message_deleted`, `online_users`, malformed/error events, disconnect/reconnect, and empty/loading states.

**Must demonstrate:** Two browser clients receiving a persisted message and a deletion/presence event without duplicating or inventing data.

## Member 5: Messaging, history and integration

**Main responsibility:** Implement message creation, cursor-based history, ownership-based hard deletion, and the backend/frontend integration of those features.

**Secondary responsibilities:** Message validation, broadcast ordering, API/event contract synchronization, and performance-conscious queries.

**Owns:** `GET /api/messages`, `DELETE /api/messages/{message_id}`, WebSocket message processing, message repository/service logic, pagination UI behavior, and deletion reconciliation.

**Deliverables:** Message model usage, cursor query, send/persist/broadcast path, hard deletion path, pagination UI, contract updates, and integration tests.

**Dependencies:** Member 1 provides models/indexes; Member 2 provides authenticated identity; Member 4 consumes events; Member 6 tests full flows and edge cases.

**Must understand:** Transactions, cursor pagination, ownership authorization, event ordering, idempotency, and why broadcast follows persistence.

**Must test:** Empty/oversized messages, ordering, next/previous cursor behavior, old history, persistence after refresh, own versus another user's deletion, missing messages, and broadcast consistency.

**Must demonstrate:** A message’s complete lifecycle from browser event to PostgreSQL row to broadcast, then hard deletion and client update.

## Member 6: Testing, quality assurance and deployment preparation

**Main responsibility:** Build the test strategy, quality gates, cross-feature test fixtures, and deployment-readiness checklist.

**Secondary responsibilities:** CI preparation when the team chooses it, test documentation, release checklists, migration safety, and defect triage.

**Owns:** Test plan, shared fixtures, API/WebSocket/browser integration coverage, regression tracking, and deployment/environment documentation.

**Deliverables:** Test matrix, automated MVP tests, reproducible test commands, bug reports, pre-release checklist, and a final system-understanding demo.

**Dependencies:** Needs testable interfaces from every member; pairs with each owner rather than testing only at the end.

**Must understand:** Test pyramid, isolation, mocking boundaries, database transactions, browser behavior, WebSocket concurrency, and the difference between a failing test and an environment failure.

**Must test:** Every MVP acceptance criterion, security failures, migrations, reconnects, multi-client messaging, hard deletion, and regression cases from bugs.

**Must demonstrate:** A clean test run, a deliberately failing test diagnosis, and the release checklist with known risks.

## Shared responsibility rule

Every owner must teach one teammate their area, review another area, and update the handbook or relevant contract when behavior changes. Nobody should merge code they cannot explain, and no important component should have only one knowledgeable person.
