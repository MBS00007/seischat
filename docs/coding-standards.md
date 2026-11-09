# SeisChat Coding Standards

These standards keep the codebase approachable for all six team members. They describe the intended implementation style; exact formatter, linter, and test commands are **TODO: Team Decision Required** until project manifests are created.

## Python Standards

- Follow PEP 8 and use type hints for public functions, route handlers, service methods, and model-facing interfaces.
- Keep FastAPI route handlers thin; put business rules in services and database operations in a consistent repository/data-access layer.
- Use clear docstrings for public modules and non-obvious public interfaces.
- Never store plaintext passwords or session credentials.
- Use explicit exception types and map expected failures to documented API error responses.
- Avoid broad `except Exception` blocks. Log unexpected failures using the project's agreed logging approach and return a safe error.
- Keep SQLAlchemy models and Alembic migrations synchronized; never edit an already-applied migration to change history.
- Use asynchronous code consistently with the selected database and WebSocket approach; the final choice is **TODO: Team Decision Required**.

## JavaScript Standards

- Use modern JavaScript supported by the selected React toolchain.
- Prefer functional React components and hooks.
- Keep components focused; extract reusable UI and state behavior rather than creating large components.
- Use the API and WebSocket client modules instead of scattering network calls through UI components.
- Validate and handle loading, empty, disconnected, unauthorized, and error states.
- Do not use `any`-style escape hatches or silently ignore failed requests.
- Keep user-provided content escaped by the framework and do not inject raw HTML without a reviewed requirement.

## Naming Conventions

| Item | Convention | Example |
| --- | --- | --- |
| Python modules/functions/variables | `snake_case` | `get_messages` |
| Python classes | `PascalCase` | `MessageService` |
| JavaScript variables/functions | `camelCase` | `sendMessage` |
| React components | `PascalCase` | `MessageList` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_MESSAGE_LENGTH` |
| Database tables/columns | lowercase `snake_case` | `created_at` |
| REST paths | lowercase plural resources | `/api/messages` |
| WebSocket events | lowercase `snake_case` | `new_message` |

Names should describe domain behavior rather than implementation details.

## Folder Organization

- `frontend/` contains React UI, client state, API calls, WebSocket handling, and styles.
- `backend/` contains FastAPI entry points, domain modules, database models, migrations, and tests.
- `docs/` contains product, architecture, data, API, event, and contribution contracts.
- Tests should live in the convention selected for each toolchain and remain close to the code or in a clearly named test tree.

The exact frontend and backend package layout is **TODO: Team Decision Required**. Do not add a new top-level service or technology without team agreement.

## Git Commit Conventions

- Write imperative, concise commit subjects: `Add message history endpoint`.
- Keep one logical change per commit where practical.
- Use a consistent prefix only if the team adopts one; the prefix format is **TODO: Team Decision Required**.
- Do not commit secrets, generated dependency directories, local databases, build outputs, or unrelated formatting changes.

## Branching Strategy

- Keep `main` releasable.
- Create short-lived branches from the current `main`.
- Use descriptive names such as `feature/message-history`, `fix/session-expiry`, or `docs/api-contract`.
- Rebase or update a branch according to repository policy before merge; force-push rules are **TODO: Team Decision Required**.

## Pull Request Guidelines

Each pull request should include:

- A concise summary of the problem and solution.
- Scope and any intentional behavior changes.
- Tests/checks run and their results.
- Documentation or migration notes when applicable.
- Screenshots or a short recording for meaningful UI changes.
- Explicit notes for unresolved decisions or follow-up work.

Keep pull requests reviewable and avoid mixing unrelated refactors with feature work.

## Code Review Expectations

Reviewers should check correctness, security, authorization, data consistency, error behavior, maintainability, tests, and contract/documentation updates. Review comments should be specific and respectful, distinguishing blocking defects from suggestions. At least one teammate review is expected before merge; the final approval count and ownership rules are **TODO: Team Decision Required**.

## Error Handling

- Validate input at the boundary and enforce authorization in the backend.
- Return stable, documented error codes and safe messages.
- Never reveal passwords, hashes, session credentials, or internal stack traces.
- Handle WebSocket disconnects explicitly and update presence after a connection closes.
- Log unexpected server failures with enough context to debug, without logging secrets.
- Do not convert failures into successful empty responses.

## Documentation Expectations

Update the relevant documentation when an endpoint, event, schema, user-visible behavior, or architectural decision changes. Keep examples valid JSON and consistent across the README, REST contract, WebSocket contract, and database design. Record unresolved choices as `TODO: Team Decision Required` until the team agrees and replaces the marker with the decision.
