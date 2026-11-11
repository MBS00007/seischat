import { apiClient } from './apiClient.js'

export function createAuthService(client = apiClient) {
  return {
    register(username, password) {
      return client.request('/api/auth/register', {
        method: 'POST',
        body: { username, password },
      })
    },
    login(username, password) {
      return client.request('/api/auth/login', {
        method: 'POST',
        body: { username, password },
      })
    },
    logout() {
      return client.request('/api/auth/logout', { method: 'POST' })
    },
    getCurrentUser() {
      return client.request('/api/auth/me')
    },
  }
}

export const authService = createAuthService()
export const { register, login, logout, getCurrentUser } = authService
