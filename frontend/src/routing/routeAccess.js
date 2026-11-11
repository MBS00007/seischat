export function getProtectedRouteDestination({
  isLoading,
  isAuthenticated,
  location,
  sessionExpired,
}) {
  if (isLoading || isAuthenticated) {
    return null
  }

  return {
    pathname: '/login',
    state: {
      from: location,
      sessionExpired,
    },
  }
}

export function getGuestRouteDestination({
  isLoading,
  isAuthenticated,
  location,
}) {
  if (isLoading || !isAuthenticated) {
    return null
  }

  return location.state?.from?.pathname || '/chat'
}
