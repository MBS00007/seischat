# Role-Based Skills Matrix

Skill levels mean: **Must know before implementation** (foundation needed to start), **Learn while implementing** (guided practice is expected), and **Useful for future development** (not an MVP blocker).

## Member 1: Backend foundation and database

| Category | Skills |
| --- | --- |
| Must know before implementation | Python basics, functions/classes, virtual environments, SQL tables/keys, HTTP basics, Git branches |
| Learn while implementing | FastAPI structure and dependency injection, SQLAlchemy sessions/models, PostgreSQL constraints/indexes, Alembic revisions, transaction boundaries |
| Useful for future development | Query plans, connection pooling, async database drivers, observability, multi-process deployment |
| SeisChat use | Models users/sessions/messages, protects relationships, supports history and ownership queries |
| Should explain | Why a migration is needed, how a request obtains a database session, and what a rollback protects |

**Exercise:** Create a local users/messages schema, insert two users, violate a foreign key intentionally, and explain the error and rollback.

## Member 2: Authentication and backend security

| Category | Skills |
| --- | --- |
| Must know before implementation | HTTP methods/statuses, passwords versus hashes, basic browser cookies, Python error handling |
| Learn while implementing | Argon2id, server-side sessions, Secure/HttpOnly/SameSite cookies, CSRF, CORS with credentials, auth dependencies |
| Useful for future development | Rate limiting, security headers, audit logging, secret rotation, threat modeling |
| SeisChat use | Protects REST and `/ws/chat`, prevents session theft misuse and cross-site state changes |
| Should explain | Why Argon2id is hashing, why HttpOnly is not CSRF protection, and how logout revokes a session |

**Exercise:** Trace a login in browser developer tools and identify the request, response, cookie attributes, and subsequent authenticated request.

## Member 3: Frontend foundation and authentication UI

| Category | Skills |
| --- | --- |
| Must know before implementation | JavaScript functions/objects, HTML forms, CSS basics, npm scripts, Git |
| Learn while implementing | React components/props/state/hooks, routing, controlled forms, API clients, Tailwind utilities, accessible feedback |
| Useful for future development | State libraries, performance profiling, accessibility audits, visual regression testing |
| SeisChat use | Renders auth flows and protects the chat route while relying on FastAPI for truth |
| Should explain | When state changes, why `credentials: "include"` is needed, and why a route guard is not authorization |

**Exercise:** Build a small controlled login form with idle, submitting, success, and error states.

## Member 4: Chatroom and WebSocket frontend integration

| Category | Skills |
| --- | --- |
| Must know before implementation | React state/events, JSON, browser network tools, basic asynchronous JavaScript |
| Learn while implementing | WebSocket lifecycle, event discriminators, reconnect/backoff, message reconciliation, presence state |
| Useful for future development | Shared connection workers, offline queues, performance tuning, multi-room state |
| SeisChat use | Displays confirmed messages and online users and reacts to server events |
| Should explain | What happens when a socket opens/closes, why local messages are not proof of persistence, and how duplicate events are avoided |

**Exercise:** Write a tiny client that logs each documented event and handles a close/reconnect state.

## Member 5: Messaging, history and integration

| Category | Skills |
| --- | --- |
| Must know before implementation | SQL querying, Python service functions, REST/JSON, React list rendering |
| Learn while implementing | Cursor pagination, ownership checks, transactions, broadcast sequencing, hard deletion, integration contracts |
| Useful for future development | Full-text search, moderation, message edits, event brokers, horizontal scaling |
| SeisChat use | Connects message input, database persistence, history retrieval, deletion, and broadcasts |
| Should explain | Why offsets can drift, what a cursor represents, why deletion is authorized server-side, and why persistence precedes broadcast |

**Exercise:** Paginate a sorted list using a last-seen timestamp/ID cursor and test equal-timestamp ordering.

## Member 6: Testing, QA and deployment preparation

| Category | Skills |
| --- | --- |
| Must know before implementation | Assertions, test isolation, Git, command-line basics, reading logs |
| Learn while implementing | Unit/integration/API/WebSocket/component/E2E tests, fixtures, mocks, coverage, defect reports |
| Useful for future development | CI pipelines, containers, load testing, monitoring, rollback automation |
| SeisChat use | Verifies all contracts and catches cross-role regressions |
| Should explain | What each test boundary proves, what should be mocked, and how to reproduce a defect |

**Exercise:** Turn one MVP acceptance criterion into an API test and one browser-flow test, then document the command and expected result.

## Team-wide learning rule

No member needs to master every technology before starting. Learn the minimum prerequisite, implement a small vertical slice with a partner, and teach the result back to the team. Future skills are explicitly not blockers for the MVP.
