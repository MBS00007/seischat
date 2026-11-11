# SeisChat REST API Contract

All endpoints use JSON unless stated otherwise. The backend is authoritative for validation, identity, authorization, and timestamps. Error responses should use one consistent structure:

```json
{
  "error": {
    "code": "machine_readable_code",
    "message": "Human-readable explanation"
  }
}
```

Authentication uses a valid, unexpired, non-revoked server-side session carried by a Secure, HttpOnly cookie. State-changing requests also include the agreed CSRF protection.

### CSRF integration status

The frontend cannot yet implement the required CSRF protection because this contract does not define how to obtain a token, the CSRF cookie name and attributes, the request header name, the token format/validation rules, or any endpoint exemptions. The backend and frontend owners must agree on and document these details before state-changing authentication requests can be verified as integrated. The frontend must not guess the mechanism or bypass server checks.

## `POST /api/auth/register`

**Purpose:** Create a user account.

**Request**

```json
{
  "username": "ada",
  "password": "correct horse battery staple"
}
```

**Response: `201 Created`**

```json
{
  "user": {
    "id": "uuid",
    "username": "ada",
    "created_at": "2026-11-09T22:57:22Z"
  }
}
```

Authentication is not required. The response must not include a password or password hash.

Possible errors: `400 invalid_request`, `409 username_taken`, `422 validation_error`.

## `POST /api/auth/login`

**Purpose:** Authenticate an existing user and establish a session.

**Request**

```json
{
  "username": "ada",
  "password": "correct horse battery staple"
}
```

**Response: `200 OK`**

```json
{
  "user": {
    "id": "uuid",
    "username": "ada",
    "created_at": "2026-11-09T22:57:22Z"
  },
  "expires_at": "2026-11-09T23:57:22Z"
}
```

Authentication is not required. The server sets the session cookie; the session credential is not returned in JSON.

Possible errors: `401 invalid_credentials`, `422 validation_error`.

## `POST /api/auth/logout`

**Purpose:** Revoke the current authenticated session.

**Request:** No body.

**Response: `204 No Content`**

Authentication is required.

Possible errors: `401 unauthenticated`, `404 session_not_found`.

## `GET /api/auth/me`

**Purpose:** Return the currently authenticated user.

**Response: `200 OK`**

```json
{
  "user": {
    "id": "uuid",
    "username": "ada",
    "created_at": "2026-11-09T22:57:22Z"
  }
}
```

Authentication is required.

Possible errors: `401 unauthenticated`.

## `GET /api/messages`

**Purpose:** Retrieve previous messages for the shared chatroom.

**Request:** Optional query parameters:

- `cursor`: opaque cursor returned by the previous page; omit for the first page.
- `limit`: positive page size within the server-defined maximum.

Results use stable chronological ordering and return an opaque `next_cursor` when more history is available.

**Response: `200 OK`**

```json
{
  "messages": [
    {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "username": "ada"
      },
      "content": "Hello, everyone!",
      "created_at": "2026-11-09T22:57:22Z"
    }
  ],
  "next_cursor": "opaque-cursor-or-null"
}
```

Authentication is required. History includes messages created before the requesting user registered.

Possible errors: `401 unauthenticated`, `500 internal_error`.

## `DELETE /api/messages/{message_id}`

**Purpose:** Delete a message owned by the authenticated user.

**Request:** No body. `message_id` is the message UUID.

**Response: `204 No Content`**

Authentication is required. The server must verify ownership, hard-delete the row, and broadcast the documented `message_deleted` event.

Possible errors: `400 invalid_message_id`, `401 unauthenticated`, `403 message_not_owned`, `404 message_not_found`.

## `GET /api/users/online`

**Purpose:** Return the current authenticated users with active chat connections.

**Response: `200 OK`**

```json
{
  "users": [
    {
      "id": "uuid",
      "username": "ada"
    }
  ]
}
```

Authentication is required. Ordering and whether duplicate browser connections affect ordering are **TODO: Team Decision Required**.

Possible errors: `401 unauthenticated`, `500 internal_error`.

## Cross-Endpoint Rules

- Timestamps are ISO 8601 UTC strings.
- IDs use the database UUID representation.
- Error codes are stable machine-readable identifiers; messages are safe for display and must not expose secrets.
- Protected REST calls and `/ws/chat` use the same session validation rules.
- The user and message shapes above must remain compatible with WebSocket event payloads.
