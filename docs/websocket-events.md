# SeisChat WebSocket Events

## Endpoint and Connection Rules

Clients connect to:

```text
/ws/chat
```

The connection must be authenticated using the session transport selected by the team. An unauthenticated or expired session is rejected. The chatroom is shared; no room identifier is sent because V1 has exactly one room.

All application messages are JSON objects with an `event` discriminator and a `payload` object:

```json
{
  "event": "event_name",
  "payload": {}
}
```

The server is authoritative for IDs, usernames, timestamps, persistence, authorization, and online presence.

## Client-to-Server: `send_message`

**Purpose:** Request creation of a text message in the shared chatroom.

**Payload**

```json
{
  "content": "Hello, everyone!"
}
```

**Example**

```json
{
  "event": "send_message",
  "payload": {
    "content": "Hello, everyone!"
  }
}
```

The client must send non-empty text. The server trims or rejects whitespace according to the agreed validation policy, persists the message, assigns its ID and timestamp, and broadcasts `new_message`. The client must not invent a successful message ID or timestamp.

Invalid input produces an `error` event to the requesting client. The message length limit is **TODO: Team Decision Required**.

## Server-to-Client: `new_message`

**Purpose:** Confirm a persisted message to every connected chatroom client.

**Payload**

```json
{
  "id": "uuid",
  "user": {
    "id": "uuid",
    "username": "ada"
  },
  "content": "Hello, everyone!",
  "created_at": "2026-11-09T22:57:22Z",
  "deleted_at": null
}
```

**Example**

```json
{
  "event": "new_message",
  "payload": {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "username": "ada"
    },
    "content": "Hello, everyone!",
    "created_at": "2026-11-09T22:57:22Z",
    "deleted_at": null
  }
}
```

Clients append or reconcile this message using its server ID. The server sends it only after successful persistence.

## Server-to-Client: `message_deleted`

**Purpose:** Inform every connected client that a message is no longer available as an active message.

**Payload**

```json
{
  "message_id": "uuid",
  "deleted_at": "2026-11-09T22:58:00Z"
}
```

**Example**

```json
{
  "event": "message_deleted",
  "payload": {
    "message_id": "uuid",
    "deleted_at": "2026-11-09T22:58:00Z"
  }
}
```

Clients update the matching message consistently. Whether the UI removes the message or displays a deletion marker follows the database/API deletion decision, currently **TODO: Team Decision Required**.

## Server-to-Client: `online_users`

**Purpose:** Publish the current online-user snapshot after connection-state changes.

**Payload**

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

**Example**

```json
{
  "event": "online_users",
  "payload": {
    "users": [
      {
        "id": "uuid",
        "username": "ada"
      }
    ]
  }
}
```

The server broadcasts this event when an authenticated user joins or leaves. A user remains online while at least one active chat connection exists. The initial snapshot may also be delivered immediately after a client connects.

## Server-to-Client: `error`

**Purpose:** Report a request or connection-level failure without closing a healthy connection unnecessarily.

**Payload**

```json
{
  "code": "invalid_message",
  "message": "Message content cannot be empty."
}
```

**Example**

```json
{
  "event": "error",
  "payload": {
    "code": "invalid_message",
    "message": "Message content cannot be empty."
  }
}
```

Clients should show a safe, useful error and leave existing confirmed messages unchanged. Authentication failures may reject or close the connection rather than send an application error event.

## Ordering and Failure Rules

- A `new_message` event follows successful database persistence.
- A `message_deleted` event follows successful authorization and deletion operation.
- Presence changes are broadcast after the connection manager updates its state.
- Clients should handle duplicate events idempotently by ID where practical.
- Reconnect behavior, backoff, and whether missed events are replayed are **TODO: Team Decision Required**. REST history retrieval remains the source for recovering missed messages.
