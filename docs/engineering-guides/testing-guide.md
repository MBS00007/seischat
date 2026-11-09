# Testing Engineering Guide

## 1. Purpose

Testing gives the team confidence that each beginner-built part works alone and in the real SeisChat flow. A test should prove behavior, not merely repeat implementation details.

## 2. Responsibility

Every developer writes tests for their feature. Member 6 coordinates coverage, fixtures, regression tracking, and release checks, but quality is shared.

## 3. Concepts first

Know assertions, fixtures, isolation, deterministic data, test doubles, HTTP status codes, database transactions, browser state, and asynchronous WebSocket behavior.

## 4. Tools

Use the project’s selected Python test runner, FastAPI test client/WebSocket client, PostgreSQL test database, React component test tools, and browser E2E runner once manifests exist. Do not install tools just for this documentation change.

## 5. Features and practical MVP scenarios

| MVP feature | Minimum scenarios |
| --- | --- |
| Registration | Valid account; duplicate username; invalid/empty input; no password/hash in response |
| Login/session | Valid login; invalid password; Secure/HttpOnly cookie; `/me`; expiry/revocation; logout |
| Security | Missing session; CSRF failure; allowed/disallowed CORS origin; unauthenticated WebSocket |
| History | First cursor page; next cursor; stable ordering; old messages visible to a newly registered user; empty result |
| Sending | Valid message persists; whitespace/limit validation; response/event uses server ID/time; failed transaction does not broadcast |
| Deletion | Owner succeeds; another user gets forbidden; missing message; row is gone; all clients receive `message_deleted` |
| Presence | Initial snapshot; second connection; last disconnect; duplicate browser connections; reconnect |
| Frontend | Form states; protected redirect; message list/composer; loading/error/disconnected states; cursor control |
| End to end | Register, login, open chat, load history, send from one client, receive in another, delete, logout |

## 6. Implementation sequence

1. Turn each acceptance criterion into a test case.
2. Build small deterministic fixtures for users, sessions, and messages.
3. Unit-test pure validation and state helpers.
4. API-test routes with a real test database where persistence matters.
5. WebSocket-test authentication, events, ordering, and cleanup.
6. Component-test rendering and user interaction.
7. Run an end-to-end happy path and important failure paths.
8. Record commands, failures, environment assumptions, and coverage gaps.

## 7. Expected files/components

Keep tests in a predictable backend/frontend test tree with shared fixtures, factories, API tests, database tests, WebSocket tests, component tests, and E2E tests. Name tests by behavior.

## 8. Connections

Unit tests isolate rules; integration tests prove route/service/database boundaries; API tests prove contracts; WebSocket tests prove live behavior; component tests prove browser rendering; E2E tests prove the whole flow. A passing unit test cannot prove a cookie or database migration works.

## 9. Mocking and coverage

Mock external boundaries only when the real boundary is unavailable or slow. Prefer a real PostgreSQL test database for queries and transactions. Coverage is a signal for missing thought, not a target to game; prioritize security, authorization, persistence, and failure paths.

## 10. Common mistakes

Do not share mutable fixtures, depend on test order, assert private implementation details, test only happy paths, mock away the database query being tested, ignore async cleanup, or call a green suite proof that deployment is ready.

## 11. Security

Never put real passwords, tokens, cookies, or production data in tests or logs. Test that secrets are absent from responses and that unauthorized users cannot infer protected records.

## 12. Acceptance criteria

Every MVP requirement has at least one automated test and an understandable manual demonstration where appropriate. Failures are reproducible, test commands are documented, and regressions become tests.

## 13. Questions

What boundary does this test prove? Why is this dependency real or mocked? How is database state isolated? What proves the message was persisted before broadcast? Which test prevents another user deleting a message? How would you reproduce a flaky reconnect failure?
