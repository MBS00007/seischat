# Frontend Engineering Guide

## 1. Purpose

This guide helps the frontend owner build a clear React/Tailwind browser experience while keeping identity, validation, authorization, persistence, and event ordering on FastAPI.

## 2. Responsibility

The frontend owns presentation, browser navigation, local UI state, form interaction, API/WebSocket clients, and user feedback. FastAPI owns authentication, validation, authorization, timestamps, IDs, persistence, pagination truth, and broadcasts. A frontend route guard improves UX; it is not security.

## 3. Concepts first

Understand JavaScript modules, HTML forms, React components, props, state, hooks, controlled inputs, asynchronous requests, JSON, cookies, and WebSocket lifecycle.

## 4. Tools

React with JavaScript, Tailwind CSS, the chosen React router, browser developer tools, the documented REST API, and the WebSocket endpoint `/ws/chat`. Do not add a state library unless the team agrees it is necessary.

## 5. Features

Build registration/login pages, protected routing, logout, a shared chatroom, message list/composer, cursor history controls, online users, delete controls for owned messages, WebSocket events, and loading/error/disconnected states.

## 6. Implementation sequence

1. Establish folders for pages, components, client modules, hooks, and tests.
2. Create an API client that sends JSON and uses `credentials: "include"` for cookie sessions.
3. Build forms with client-side usability validation, while displaying server validation errors.
4. Bootstrap auth with `GET /api/auth/me`; redirect guests to login and authenticated users to chat.
5. Add the chat layout and initial cursor-based history request.
6. Add the WebSocket client and handle only documented events.
7. Render server-confirmed `new_message`, `message_deleted`, and `online_users` state.
8. Add composer, delete action, next-history control, reconnect state, and accessible feedback.
9. Test each state and the complete browser flow.

## 7. Expected files/components

Expected names may vary, but responsibilities should be visible: `pages/Register`, `pages/Login`, `pages/Chatroom`, `components/MessageList`, `MessageComposer`, `OnlineUsers`, `StatusBanner`, an API client, a WebSocket client/hook, auth state, and component tests.

## 8. Connections

Login establishes the server session cookie. The API client sends that cookie to protected REST requests. The browser then opens `/ws/chat` using the same session rules. History fills the initial list; confirmed WebSocket events update it. Deletion comes from REST authorization and a broadcast event. The frontend never invents message IDs, timestamps, usernames, or success.

## 9. Testing

Test form validation, submission/loading, server errors, protected redirects, cookie credentials, logout, empty/history/loading/error states, message rendering, composer behavior, cursor navigation, delete updates, WebSocket event parsing, presence, disconnect/reconnect, and a two-client flow where practical.

## 10. Common mistakes

Do not store session secrets in JavaScript storage, assume a route guard protects the server, append an optimistic message as confirmed, ignore duplicate events, lose the cursor, render raw HTML, hide failed requests, or leave a socket open after unmount.

## 11. Security

Use Secure/HttpOnly cookies as configured by the backend, include CSRF protection as required for state-changing HTTP requests, do not log credentials, escape message content through React, and treat all server data as untrusted display data.

## 12. Acceptance criteria

Guests can register/login but cannot see chat. Authenticated users can load history, send and receive confirmed messages, see online users, delete only their own messages through the documented flow, recover from disconnects, and receive clear feedback for loading, errors, unauthorized access, and empty states.

## 13. Questions

Which state is server-confirmed? Why is `credentials: "include"` required? Which errors come from FastAPI? What happens when the socket closes? How does cursor history recover missed messages? Why can the frontend show a delete button but not authorize deletion?
