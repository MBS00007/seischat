# SeisChat Requirements

## Project Objectives

SeisChat will provide a simple, reliable web-based messaging platform where registered users communicate in one shared chatroom in real time. The MVP should be understandable to a six-member team, preserve messages in PostgreSQL, and provide clear feedback when authentication, messaging, or presence operations fail.

## User Roles

### Guest

- Can access registration and login screens.
- Can submit registration or login requests.
- Cannot read chat history, connect to the chatroom, see online users, send messages, or delete messages.

### Authenticated user

- Has a unique username and valid authenticated session.
- Can access the shared chatroom and previous messages.
- Can send text messages.
- Can delete only messages they own.
- Can see the current online-user list.

There are no administrator, moderator, or privileged roles in V1.

## Functional Requirements

1. The system shall allow a guest to register with a unique username and password.
2. The system shall reject a registration that conflicts with an existing username.
3. The system shall allow a registered user to log in and establish an authenticated session.
4. The system shall allow an authenticated user to log out and invalidate that session.
5. The system shall expose the authenticated user's identity through `GET /api/auth/me`.
6. The system shall provide one shared chatroom to authenticated users.
7. The system shall allow an authenticated user to send non-empty text messages in real time.
8. The system shall persist messages in PostgreSQL with their author and creation timestamp.
9. The system shall allow authenticated users to retrieve previous messages, including messages created before their registration.
10. The system shall allow a user to delete only their own messages.
11. The system shall notify all connected chatroom clients when a message is deleted.
12. The system shall display currently online authenticated users.
13. The system shall update online presence when a user connects or disconnects.
14. The system shall return structured errors for invalid input, unauthenticated access, authorization failures, missing records, and server failures.

## Non-Functional Requirements

- **Reliability**: persisted messages must survive browser refreshes and backend restarts, subject to database availability.
- **Security**: passwords must never be stored in plaintext; protected endpoints and WebSocket connections must validate authentication; users must not delete another user's messages.
- **Consistency**: REST and WebSocket payloads must use the same user and message concepts and identifiers.
- **Maintainability**: backend modules, frontend responsibilities, and API/event contracts should remain independently understandable.
- **Responsiveness**: normal chat messages should be delivered to connected clients without avoidable polling delays.
- **Usability**: users should receive clear feedback for connection, validation, authentication, and server errors.
- **Scalability boundary**: V1 targets one shared room and a modular monolith. Multi-process presence coordination is not required for the initial implementation.
- **Privacy**: secrets and local environment values must not be committed to Git.

Performance targets, availability targets, supported browsers, and exact password policy are **TODO: Team Decision Required**.

## MVP Scope

Included: registration, login/logout, unique usernames, one authenticated shared chatroom, real-time text messages, PostgreSQL persistence, historical message retrieval, self-message deletion, deletion broadcasts, online-user display, and automatic presence updates.

## Excluded from V1

- Private messaging.
- Multiple chatrooms.
- Group creation.
- Voice and video calls.
- File and image sharing.
- Message reactions.
- Read receipts.
- AI summaries.
- Push notifications.

The product tagline includes “Call,” but voice and video calling are explicitly excluded from the V1 implementation.

## Acceptance Criteria

- A new user can register with valid details; duplicate usernames receive a clear error.
- A registered user can log in, access the chatroom, and log out.
- An unauthenticated user cannot access protected REST resources or the chatroom WebSocket.
- Two authenticated browser sessions can exchange text messages in real time.
- A message remains available after refresh and can be retrieved by users who registered later.
- Only the message author can delete a message; unauthorized deletion is rejected.
- A deletion is reflected in every connected client.
- Connecting and disconnecting users update the online-user display for all connected clients.
- Invalid payloads and server failures produce documented, structured errors.
- The implementation matches the REST, database, and WebSocket contracts in this repository.
