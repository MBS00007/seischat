import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import {
  getGuestRouteDestination,
  getProtectedRouteDestination,
} from '../../routing/routeAccess.js'

function SessionLoading() {
  return (
    <main aria-busy="true" className="p-8 text-center text-slate-300">
      <p role="status">Checking your session…</p>
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
