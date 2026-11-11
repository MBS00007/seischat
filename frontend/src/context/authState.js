export const initialAuthState = {
  user: null,
  isLoading: true,
  isSubmitting: false,
  sessionExpired: false,
  error: null,
}

export function authReducer(state, action) {
  switch (action.type) {
    case 'sessionResolved':
      return {
        ...state,
        user: action.user,
        isLoading: false,
        sessionExpired: false,
        error: null,
      }
    case 'sessionExpired':
      return {
        ...state,
        user: null,
        isLoading: false,
        isSubmitting: false,
        sessionExpired: true,
        error: null,
      }
    case 'loggedOut':
      return {
        ...state,
        user: null,
        isSubmitting: false,
        sessionExpired: false,
        error: null,
      }
    case 'bootstrapFailed':
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.error,
      }
    case 'submissionStarted':
      return { ...state, isSubmitting: true, error: null }
    case 'loginSucceeded':
      return {
        ...state,
        user: action.user,
        isSubmitting: false,
        sessionExpired: false,
        error: null,
      }
    case 'submissionSucceeded':
      return { ...state, isSubmitting: false, error: null }
    case 'submissionFailed':
      return { ...state, isSubmitting: false, error: action.error }
    case 'errorCleared':
      return { ...state, error: null }
    default:
      return state
  }
}

function isExpiredSessionError(error) {
  return (
    error?.status === 401 ||
    error?.code === 'unauthenticated' ||
    error?.code === 'session_not_found'
  )
}

export function createAuthActions(service, dispatch) {
  return {
    async loadCurrentUser() {
      try {
        const response = await service.getCurrentUser()
        dispatch({ type: 'sessionResolved', user: response.user })
      } catch (error) {
        if (isExpiredSessionError(error)) {
          dispatch({ type: 'sessionExpired' })
        } else {
          dispatch({ type: 'bootstrapFailed', error })
        }
      }
    },

    async login(username, password) {
      dispatch({ type: 'submissionStarted' })
      try {
        const response = await service.login(username, password)
        if (!response?.user) {
          throw new Error('The login response did not include a user.')
        }
        dispatch({ type: 'loginSucceeded', user: response.user })
        return response
      } catch (error) {
        dispatch({ type: 'submissionFailed', error })
        throw error
      }
    },

    async register(username, password) {
      dispatch({ type: 'submissionStarted' })
      try {
        const response = await service.register(username, password)
        dispatch({ type: 'submissionSucceeded' })
        return response
      } catch (error) {
        dispatch({ type: 'submissionFailed', error })
        throw error
      }
    },

    async logout() {
      dispatch({ type: 'submissionStarted' })
      try {
        await service.logout()
        dispatch({ type: 'loggedOut' })
      } catch (error) {
        if (isExpiredSessionError(error)) {
          dispatch({ type: 'sessionExpired' })
          return
        }
        dispatch({ type: 'submissionFailed', error })
        throw error
      }
    },
  }
}
