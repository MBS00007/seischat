import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import {
  getGuestRouteDestination,
  getProtectedRouteDestination,
} from '../../routing/routeAccess.js'

function SessionLoading() {
  return (
    <main
      aria-busy="true"
      className="flex min-h-dvh items-center justify-center bg-[#0b1118] p-8 text-slate-300"
    >
      <p className="inline-flex items-center gap-3" role="status">
        <svg
          aria-hidden="true"
          className="size-5 animate-spin text-blue-300"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 0 1 8-8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
        Checking your session…
      </p>
    </main>
  )
}

export function ProtectedRoute({ children }) {
  const auth = useAuth()
  const location = useLocation()
  const destination = getProtectedRouteDestination({
    isLoading: auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
    location,
    sessionExpired: auth.sessionExpired,
  })

  if (auth.isLoading) {
    return <SessionLoading />
  }
  if (destination) {
    return (
      <Navigate
        replace
        state={destination.state}
        to={destination.pathname}
      />
    )
  }
  return children || <Outlet />
}

export function GuestOnlyRoute({ children }) {
  const auth = useAuth()
  const location = useLocation()
  const destination = getGuestRouteDestination({
    isLoading: auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
    location,
  })

  if (auth.isLoading) {
    return <SessionLoading />
  }
  if (destination) {
    return <Navigate replace to={destination} />
  }
  return children || <Outlet />
}
