export function getAuthFeedback(error, { operation }) {
  if (error?.code === 'api_configuration_error') {
    return {
      message:
        'The authentication service is not configured yet. Please try again later.',
      type: 'error',
    }
  }

  if (error?.code === 'network_error') {
    return {
      message:
        'The SeisChat server could not be reached. Check your connection and try again.',
      type: 'error',
    }
  }

  if (error?.status === 404) {
    return {
      message:
        'Authentication is not available yet because the server endpoint is missing or unavailable. Please try again when backend authentication is ready.',
      type: 'notice',
    }
  }

  if (error?.status >= 500) {
    return {
      message:
        'The SeisChat server could not complete this request. Please try again later.',
      type: 'error',
    }
  }

  if (error?.status === 401 && operation === 'login') {
    return {
      message: 'That username or password was not recognized. Please try again.',
      type: 'error',
    }
  }

  if (error?.code === 'invalid_response' || error?.code === 'invalid_json_response') {
    return {
      message:
        'The SeisChat server returned an unexpected response. Please try again later.',
      type: 'error',
    }
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return { message: error.message, type: 'error' }
  }

  return {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  }
}
