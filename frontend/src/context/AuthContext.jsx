import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { authService } from '../services/authService.js'
import { authReducer, createAuthActions, initialAuthState } from './authState.js'

const AuthContext = createContext(null)

export function AuthProvider({ children, service = authService }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)
  const actions = useMemo(
    () => createAuthActions(service, dispatch),
    [service],
  )

  useEffect(() => {
    actions.loadCurrentUser()
  }, [actions])

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.user),
      ...actions,
      clearError() {
        dispatch({ type: 'errorCleared' })
      },
    }),
    [actions, state],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }
  return context
}
