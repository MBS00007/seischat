import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import PasswordInput from '../components/auth/PasswordInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const { clearError, error, isSubmitting, login } = useAuth()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState(
    location.state?.sessionExpired
      ? 'Your session expired. Please sign in again.'
      : location.state?.notice || '',
  )

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}
    if (!username.trim()) {
      nextErrors.username = 'Enter your username.'
    }
    if (!password) {
      nextErrors.password = 'Enter your password.'
    }

    setErrors(nextErrors)
    setNotice('')
    clearError()

    if (Object.keys(nextErrors).length === 0) {
      try {
        await login(username, password)
      } catch {
        // The auth context exposes the request error for display below.
      }
    }
  }

  return (
    <AuthLayout
      description={{
        heading: 'Welcome back',
        text: 'Sign in to continue to your team space.',
      }}
      footer={
        <>
          New to SeisChat?{' '}
          <Link
            className="font-medium text-blue-300 underline-offset-4 transition-colors hover:text-blue-200 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            to="/register"
          >
            Create an account
          </Link>
        </>
      }
      title="Sign in"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="login-username"
          >
            Username
          </label>
          <input
            aria-describedby={
              errors.username ? 'login-username-error' : undefined
            }
            aria-invalid={Boolean(errors.username)}
            autoComplete="username"
            className="w-full rounded-lg border border-slate-700 bg-[#0d141c] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            id="login-username"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value)
              setErrors((current) => ({ ...current, username: '' }))
              setNotice('')
              clearError()
            }}
            placeholder="Your username"
            required
            type="text"
            value={username}
          />
          {errors.username && (
            <p
              className="mt-2 text-sm text-rose-300"
              id="login-username-error"
              role="alert"
            >
              {errors.username}
            </p>
          )}
        </div>

        <PasswordInput
          autoComplete="current-password"
          error={errors.password}
          id="login-password"
          label="Password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value)
            setErrors((current) => ({ ...current, password: '' }))
            setNotice('')
            clearError()
          }}
          value={password}
        />

        {error && (
          <p
            className="rounded-lg border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-200"
            role="alert"
          >
            {error.message}
          </p>
        )}
        {notice && (
          <p
            className="rounded-lg border border-blue-400/25 bg-blue-400/10 px-4 py-3 text-sm leading-6 text-blue-100"
            role="status"
          >
            {notice}
          </p>
        )}

        <button
          className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111923] active:bg-blue-800"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Signing in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
