# SeisChat Learning Roadmap

This roadmap is a sequence, not a gate. Learn the minimum foundation before starting a role, then learn deeper concepts while implementing a small vertical slice with a partner.

## Foundations

1. **Team orientation:** Read the README, requirements, architecture, API contract, WebSocket events, database design, coding standards, and glossary. Draw the browser-to-FastAPI-to-PostgreSQL path.
2. **Git and collaboration:** Clone, branch, commit, open a PR, review a teammate’s change, and explain a diff.
3. **Web basics:** Practice HTTP methods/statuses, JSON, cookies, browser developer tools, and REST.
4. **Language foundations:** Review JavaScript modules/async functions and Python functions/types/exceptions.
5. **Data basics:** Create a PostgreSQL table, primary key, foreign key, unique constraint, and transaction.

Free resources should be selected from official documentation first: React Learn, FastAPI documentation, Python documentation/tutorial, PostgreSQL documentation, SQLAlchemy documentation, Alembic documentation, MDN Web Docs, OWASP Cheat Sheets, and the Git documentation. Use the current official versions; do not copy links into the handbook until the team verifies them.

## Role-specific learning

- **Member 1:** Python, SQL, PostgreSQL, SQLAlchemy, Alembic, transactions.
- **Member 2:** HTTP auth, cookies, hashing, sessions, CSRF, CORS, FastAPI dependencies.
- **Member 3:** React components/props/state/hooks, routing, forms, Tailwind, API requests.
- **Member 4:** React async state, WebSocket lifecycle, event parsing, reconnect states.
- **Member 5:** SQL query ordering, cursor pagination, transactions, authorization, event sequencing.
- **Member 6:** Assertions, fixtures, test boundaries, API/WebSocket/browser tests, defect reports.

Each member should pair with the role immediately upstream and downstream of their work. For example, Member 5 pairs with Members 1, 2, and 4 rather than implementing messaging alone.

## Practical exercises

Before feature implementation, each person completes one small exercise from the skills matrix and teaches it back in ten minutes. Exercises should use SeisChat concepts: a user row, a login request, a controlled form, a socket event, a cursor list, or an acceptance-criterion test.

## Learning during implementation

Work in vertical slices:

1. Agree on the contract and draw the flow.
2. Implement the smallest backend/data path.
3. Add the frontend or WebSocket consumer.
4. Add success and failure tests.
5. Demonstrate the feature to a teammate.
6. Update documentation and record an unresolved decision if necessary.

Do not require every developer to master every framework before coding. Require every developer to understand the contracts they consume and the failure modes they can affect.

## Integration knowledge

After auth and chatroom slices exist, every member should trace registration, login/session cookie, protected access, history, send/persist/broadcast, deletion, presence, logout, and reconnect. Use the integration diagrams and ask the owner to explain each boundary.

## Testing knowledge

Learn the test pyramid in parallel with features. Start with unit tests for pure rules, add API/database/WebSocket/component tests at boundaries, then run a small E2E MVP flow. Turn every discovered bug into a regression test and keep test commands in the repository documentation.

## Final system understanding

Before V1 release, every member must be able to:

- Draw the architecture without notes.
- Explain the cookie session and Argon2id flow.
- Trace a message from browser event to PostgreSQL to broadcast.
- Explain cursor pagination and hard deletion.
- Diagnose an authentication, database, frontend, and WebSocket failure.
- Run the relevant tests and explain what they prove.
- Describe one security risk and one integration risk.

## Team learning principles

Nobody merges code they cannot explain. Every feature has tests. Important architectural decisions are documented. Developers review each other’s work, understand how features connect to the whole system, review AI-generated code, and never use AI as a replacement for fundamentals. Pair programming and technical demonstrations are expected.
