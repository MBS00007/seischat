import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getAuthFeedback } from './authErrors.js'

test('describes a missing authentication endpoint as an informational notice', () => {
  assert.deepEqual(
    getAuthFeedback({ status: 404 }, { operation: 'bootstrap' }),
    {
      message:
        'Authentication is not available yet because the server endpoint is missing or unavailable. Please try again when backend authentication is ready.',
      type: 'notice',
    },
  )
})

test('distinguishes network errors, server failures, and invalid login credentials', () => {
  assert.match(
    getAuthFeedback({ code: 'network_error' }, { operation: 'login' }).message,
    /could not be reached/,
  )
  assert.match(
    getAuthFeedback({ status: 503 }, { operation: 'register' }).message,
    /could not complete this request/,
  )
  assert.match(
    getAuthFeedback({ status: 401 }, { operation: 'login' }).message,
    /username or password was not recognized/,
  )
})

test('uses the server validation message for documented client errors', () => {
  assert.deepEqual(
    getAuthFeedback(
      { status: 409, message: 'That username is already in use.' },
      { operation: 'register' },
    ),
    { message: 'That username is already in use.', type: 'error' },
  )
})
