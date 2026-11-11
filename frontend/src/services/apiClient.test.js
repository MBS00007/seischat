import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ApiError, createApiClient } from './apiClient.js'
import { createAuthService } from './authService.js'

test('sends JSON requests with cookie credentials and parses JSON responses', async () => {
  let capturedRequest
  const client = createApiClient({
    baseUrl: 'https://api.example.test/',
    fetchImpl: async (url, options) => {
      capturedRequest = { url, options }
      return Response.json({ user: { id: 'user-id' } }, { status: 201 })
    },
  })

  const result = await client.request('/api/auth/register', {
    method: 'POST',
    body: { username: 'ada', password: 'secret' },
  })

  assert.deepEqual(result, { user: { id: 'user-id' } })
  assert.equal(capturedRequest.url, 'https://api.example.test/api/auth/register')
  assert.equal(capturedRequest.options.credentials, 'include')
  assert.equal(capturedRequest.options.headers.get('Accept'), 'application/json')
  assert.equal(
    capturedRequest.options.headers.get('Content-Type'),
    'application/json',
  )
  assert.equal(
    capturedRequest.options.body,
    JSON.stringify({ username: 'ada', password: 'secret' }),
  )
})

test('returns undefined for 204 responses without parsing JSON', async () => {
  const client = createApiClient({
    baseUrl: 'https://api.example.test',
    fetchImpl: async () => new Response(null, { status: 204 }),
  })

  assert.equal(
    await client.request('/api/auth/logout', { method: 'POST' }),
    undefined,
  )
})

test('preserves the status and documented backend error code', async () => {
  const client = createApiClient({
    baseUrl: 'https://api.example.test',
    fetchImpl: async () =>
      Response.json(
        {
          error: {
            code: 'username_taken',
            message: 'That username is already in use.',
          },
        },
        { status: 409 },
      ),
  })

  await assert.rejects(
    client.request('/api/auth/register', { method: 'POST', body: {} }),
    (error) => {
      assert.ok(error instanceof ApiError)
      assert.equal(error.status, 409)
      assert.equal(error.code, 'username_taken')
      assert.equal(error.message, 'That username is already in use.')
      return true
    },
  )
})

test('reports network failures with an explicit reusable error', async () => {
  const networkCause = new TypeError('fetch failed')
  const client = createApiClient({
    baseUrl: 'https://api.example.test',
    fetchImpl: async () => {
      throw networkCause
    },
  })

  await assert.rejects(
    client.request('/api/auth/me'),
    (error) => {
      assert.ok(error instanceof ApiError)
      assert.equal(error.status, null)
      assert.equal(error.code, 'network_error')
      assert.equal(error.cause, networkCause)
      return true
    },
  )
})

test('fails explicitly when the API base URL is not configured', async () => {
  const client = createApiClient({ baseUrl: '' })
  await assert.rejects(
    client.request('/api/auth/me'),
    (error) =>
      error instanceof ApiError && error.code === 'api_configuration_error',
  )
})

test('auth service uses only the documented authentication endpoints', async () => {
  const calls = []
  const service = createAuthService({
    request(path, options) {
      calls.push({ path, options })
      return Promise.resolve()
    },
  })

  await service.register('ada', 'register-password')
  await service.login('ada', 'login-password')
  await service.logout()
  await service.getCurrentUser()

  assert.deepEqual(calls, [
    {
      path: '/api/auth/register',
      options: {
        method: 'POST',
        body: { username: 'ada', password: 'register-password' },
      },
    },
    {
      path: '/api/auth/login',
      options: {
        method: 'POST',
        body: { username: 'ada', password: 'login-password' },
      },
    },
    { path: '/api/auth/logout', options: { method: 'POST' } },
    { path: '/api/auth/me', options: undefined },
  ])
})
