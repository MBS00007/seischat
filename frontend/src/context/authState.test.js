import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  authReducer,
  createAuthActions,
  initialAuthState,
} from './authState.js'
import {
  getGuestRouteDestination,
  getProtectedRouteDestination,
} from '../routing/routeAccess.js'

const user = {
  id: 'user-id',
  username: 'ada',
  created_at: '2026-11-09T22:57:22Z',
}

function createHarness(service, initialState = initialAuthState) {
  let state = initialState
  const actions = createAuthActions(service, (action) => {
    state = authReducer(state, action)
  })

  return {
    actions,
    get state() {
      return state
    },
  }
}

test('session bootstrap stores the current user from the documented response', async () => {
  const harness = createHarness({
    async getCurrentUser() {
      return { user }
    },
  })

  await harness.actions.loadCurrentUser()

  assert.equal(harness.state.user, user)
  assert.equal(harness.state.isLoading, false)
  assert.equal(harness.state.sessionExpired, false)
})

test('session bootstrap treats 401 as an expired unauthenticated session', async () => {
  const harness = createHarness({
    async getCurrentUser() {
      throw { status: 401, code: 'unauthenticated' }
    },
  })

  await harness.actions.loadCurrentUser()

  assert.equal(harness.state.user, null)
  assert.equal(harness.state.isLoading, false)
  assert.equal(harness.state.sessionExpired, true)
  assert.equal(harness.state.error, null)
})

test('session bootstrap retains unexpected errors for user feedback', async () => {
  const serviceError = new Error('API base URL is not configured.')
  const harness = createHarness({
    async getCurrentUser() {
      throw serviceError
    },
  })

  await harness.actions.loadCurrentUser()

  assert.equal(harness.state.isLoading, false)
  assert.equal(harness.state.error, serviceError)
})

test('login updates authenticated state using the returned user', async () => {
  const harness = createHarness({
    async login(username, password) {
      assert.equal(username, 'ada')
      assert.equal(password, 'secret')
      return { user, expires_at: '2026-11-09T23:57:22Z' }
    },
  })

  await harness.actions.login('ada', 'secret')

  assert.equal(harness.state.user, user)
  assert.equal(harness.state.isSubmitting, false)
  assert.equal(harness.state.sessionExpired, false)
})

test('registration does not authenticate because the contract creates no session', async () => {
  const harness = createHarness({
    async register() {
      return { user }
    },
  })

  await harness.actions.register('ada', 'secret')

  assert.equal(harness.state.user, null)
  assert.equal(harness.state.isSubmitting, false)
})

test('successful logout clears authenticated state', async () => {
  const harness = createHarness(
    { async logout() {} },
    authReducer(initialAuthState, { type: 'sessionResolved', user }),
  )

  await harness.actions.logout()

  assert.equal(harness.state.user, null)
  assert.equal(harness.state.sessionExpired, false)
  assert.equal(harness.state.isSubmitting, false)
})

test('expired logout clears the user while other logout failures preserve it', async () => {
  let state = authReducer(initialAuthState, { type: 'sessionResolved', user })
  const actions = createAuthActions(
    {
      async logout() {
        throw { status: 401, code: 'unauthenticated' }
      },
    },
    (action) => {
      state = authReducer(state, action)
    },
  )

  await actions.logout()

  assert.equal(state.user, null)
  assert.equal(state.sessionExpired, true)

  state = authReducer(initialAuthState, { type: 'sessionResolved', user })
  const failure = new Error('Server unavailable.')
  const failedActions = createAuthActions(
    {
      async logout() {
        throw failure
      },
    },
    (action) => {
      state = authReducer(state, action)
    },
  )

  await assert.rejects(failedActions.logout(), failure)
  assert.equal(state.user, user)
  assert.equal(state.error, failure)
  assert.equal(state.isSubmitting, false)
})

test('route decisions hold during loading and protect private destinations', () => {
  const location = { pathname: '/chat' }

  assert.equal(
    getProtectedRouteDestination({
      isLoading: true,
      isAuthenticated: false,
      location,
    }),
    null,
  )
  assert.deepEqual(
    getProtectedRouteDestination({
      isLoading: false,
      isAuthenticated: false,
      location,
      sessionExpired: true,
    }),
    {
      pathname: '/login',
      state: { from: location, sessionExpired: true },
    },
  )
  assert.equal(
    getProtectedRouteDestination({
      isLoading: false,
      isAuthenticated: true,
      location,
    }),
    null,
  )
})

test('guest routes redirect authenticated users to the requested or default route', () => {
  assert.equal(
    getGuestRouteDestination({
      isLoading: false,
      isAuthenticated: true,
      location: { state: { from: { pathname: '/chat' } } },
    }),
    '/chat',
  )
  assert.equal(
    getGuestRouteDestination({
      isLoading: false,
      isAuthenticated: true,
      location: { state: null },
    }),
    '/chat',
  )
  assert.equal(
    getGuestRouteDestination({
      isLoading: false,
      isAuthenticated: false,
      location: { state: null },
    }),
    null,
  )
})
