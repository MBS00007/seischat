# SeisChat Glossary

| Term | Simple explanation | SeisChat use |
| --- | --- | --- |
| API | A defined way for programs to communicate. | React uses the backend API for auth, history, deletion, and presence. |
| Endpoint | One address and operation in an API. | `POST /api/auth/login` is a login endpoint. |
| HTTP | The request/response protocol used by browsers and servers. | Registration and REST calls use HTTP. |
| REST | A style of HTTP API organized around resources and methods. | Messages are retrieved with `GET` and deleted with `DELETE`. |
| WebSocket | A long-lived two-way connection. | `/ws/chat` carries live messages and presence events. |
| Session | Server-side record proving a user is authenticated for a period. | A session links a cookie credential to a user, expiry, and revocation. |
| Cookie | A small browser-managed value sent with matching requests. | The browser sends the session cookie to protected requests. |
| HttpOnly | A cookie flag preventing JavaScript from reading the cookie. | The session credential is HttpOnly to reduce script theft. |
| Secure cookie | A cookie sent only over HTTPS (with local development exceptions configured safely). | Production session cookies must be Secure. |
| CSRF | A cross-site request trick that abuses a victim’s cookies. | State-changing cookie requests require CSRF protection. |
| CORS | Browser rules controlling which origins may call a server. | FastAPI allows the known frontend origin with credentials. |
| Hashing | One-way transformation used for verification, not recovery. | Passwords use Argon2id hashes; session credentials are also stored as hashes. |
| Argon2id | A memory-hard password hashing algorithm. | FastAPI verifies passwords with Argon2id. |
| ORM | A tool mapping program objects to database rows. | SQLAlchemy maps users, sessions, and messages. |
| Migration | A versioned database schema change. | Alembic creates the SeisChat tables from an empty database. |
| Primary key | A unique identifier for a row. | UUIDs identify users, sessions, and messages. |
| Foreign key | A link from one table to another. | `messages.user_id` points to `users.id`. |
| Constraint | A database rule that rejects invalid data. | Unique usernames and required message authors are constraints. |
| Index | A data structure that makes selected queries faster. | Message ordering and session expiry queries use indexes. |
| Transaction | A group of database operations that succeeds or rolls back together. | A message is committed before `new_message` is broadcast. |
| Cursor pagination | Fetching the next stable page using a marker from the previous page. | History uses an ordered cursor rather than an unstable offset. |
| Hard deletion | Removing a row from the database. | An owned message is deleted and clients receive `message_deleted`. |
| Presence | Current information about who is connected. | Active WebSocket connections determine online users. |
| Authentication | Proving which user is making a request. | The session identifies the current user. |
| Authorization | Checking what an authenticated user may do. | Only the message owner may delete a message. |
| Component | A reusable piece of a React interface. | `MessageList` and `MessageComposer` are components. |
| Props | Values passed into a React component. | A message row receives message data and callbacks as props. |
| State | Data a component/application remembers and updates. | Chat state includes messages, user, presence, and connection status. |
| Hook | A React function for using state or lifecycle behavior. | A WebSocket hook manages connection setup and cleanup. |
| REST client | Code that calls documented HTTP endpoints. | The frontend API client sends cookie-authenticated requests. |
| Event | A named WebSocket message with a payload. | `new_message` confirms persisted chat data. |
| Unit test | A focused test of one rule or function. | Validate message content without a database. |
| Integration test | A test of multiple real components together. | Verify a FastAPI route writes to PostgreSQL. |
| API test | A test of an HTTP contract. | Verify login status, cookie behavior, and response shape. |
| WebSocket test | A test of connection and event behavior. | Verify auth rejection and message broadcast. |
| End-to-end test | A test through the user-facing system. | Register, login, chat, delete, and logout in a browser flow. |
| Fixture | Reusable controlled test setup. | A fixture creates a user and authenticated session. |
| Mock | A test replacement for a dependency. | Mock an unavailable external boundary, but prefer real database tests for queries. |
| Acceptance criterion | A condition showing a feature is complete. | Two authenticated sessions can exchange persisted messages. |
