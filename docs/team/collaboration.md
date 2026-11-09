# Collaboration Guide

## Git workflow

Keep `main` releasable. Start each focused task from an up-to-date `main` and use a short-lived branch:

```text
feature/message-history
fix/session-expiry
docs/engineering-handbook
test/websocket-presence
```

Commit one logical change at a time with an imperative subject. Do not commit secrets, local databases, generated dependencies, or unrelated formatting.

## Pull requests and review

1. Explain the problem, approach, scope, tests, and documentation/migration impact.
2. Keep the PR focused and link the relevant contract or requirement.
3. Request at least one teammate review before merging.
4. The author gives a short walkthrough when the change affects architecture, security, data, or cross-component behavior.
5. Reviewers check correctness, authorization, failure paths, tests, maintainability, and contract consistency.
6. Resolve blocking comments and record intentional follow-ups.

Nobody should merge code they cannot explain. AI-generated code must be read, tested, and understood by the author and reviewer.

## Communication rhythm

**Daily:** Share what changed, what is next, and one blocker or risk. Mention contract changes immediately rather than waiting for a meeting.

**Weekly technical meeting:** Review architecture decisions, integration progress, failing tests, migrations, security concerns, and the next vertical slice. Update the relevant documentation during or immediately after the meeting.

**Knowledge-sharing sessions:** Rotate short demonstrations: trace a request, explain a migration, show a browser auth flow, inspect a WebSocket event, or diagnose a failing test. Prefer diagrams and live code over slides.

## Pair programming

Pair on first implementations of authentication, database migrations, WebSocket lifecycle, cursor pagination, and test fixtures. The driver types; the navigator asks “what contract does this rely on?” and “how will we test the failure path?” Switch roles regularly.

## Blockers and conflict resolution

Raise a blocker when progress is stopped by an unclear contract, environment issue, failing dependency, or missing review. Include what was tried, the exact error, and the smallest decision needed. A second teammate investigates before escalating to the whole team.

Resolve design disagreements by returning to requirements, approved decisions, security, simplicity for beginners, and testability. Record the decision and alternatives in the appropriate documentation. Do not resolve disagreement by silently changing a contract.

## Documentation updates

Update API/event contracts, architecture, database design, and the handbook when behavior or decisions change. Examples must stay valid JSON and use the same identifiers, status codes, cookies, and event names as implementation. Documentation is part of the feature, not optional cleanup.
