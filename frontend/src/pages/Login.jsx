import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import PasswordInput from '../components/auth/PasswordInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getAuthFeedback } from '../context/authErrors.js'
import { validateLogin } from '../context/authValidation.js'

function Login() {
  const { bootstrapError, clearError, error, isSubmitting, login } = useAuth()
  const location = useLocation()
  const submissionInProgress = useRef(false)
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
    if (submissionInProgress.current || isSubmitting) {
      return
    }

    const nextErrors = validateLogin(username, password)
    setErrors(nextErrors)
    setNotice('')
    clearError()

    if (Object.keys(nextErrors).length === 0) {
      submissionInProgress.current = true
      try {
        await login(username, password)
      } catch {
        // The auth context exposes a safe message for display below.
      } finally {
        submissionInProgress.current = false
      }
    }
  }

  const requestFeedback = error
    ? getAuthFeedback(error, { operation: 'login' })
    : null
  const bootstrapFeedback = bootstrapError
    ? getAuthFeedback(bootstrapError, { operation: 'bootstrap' })
    : null

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
      <form
        aria-busy={isSubmitting}
        className="space-y-5"
        noValidate
        onSubmit={handleSubmit}
      >
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
            disabled={isSubmitting}
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
          disabled={isSubmitting}
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

        {requestFeedback && (
          <p
            className={
              requestFeedback.type === 'notice'
                ? 'rounded-lg border border-blue-400/25 bg-blue-400/10 px-4 py-3 text-sm leading-6 text-blue-100'
                : 'rounded-lg border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-200'
            }
            role={requestFeedback.type === 'notice' ? 'status' : 'alert'}
          >
            {requestFeedback.message}
          </p>
        )}
        {bootstrapFeedback && !requestFeedback && (
          <p
            className={
              bootstrapFeedback.type === 'notice'
                ? 'rounded-lg border border-blue-400/25 bg-blue-400/10 px-4 py-3 text-sm leading-6 text-blue-100'
                : 'rounded-lg border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-200'
            }
            role={bootstrapFeedback.type === 'notice' ? 'status' : 'alert'}
          >
            {bootstrapFeedback.message}
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
          aria-busy={isSubmitting}
          className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111923] active:bg-blue-800"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg
                aria-hidden="true"
                className="size-4 animate-spin"
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
              Signing in…
            </span>
          ) : (
            'Log in'
          )}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
