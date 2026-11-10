import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import PasswordInput from '../components/auth/PasswordInput.jsx'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}
    if (!username.trim()) {
      nextErrors.username = 'Choose a username.'
    }
    if (!password) {
      nextErrors.password = 'Enter a password.'
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'The passwords do not match.'
    }

    setErrors(nextErrors)
    setNotice('')

    if (Object.keys(nextErrors).length === 0) {
      setNotice(
        'Your details are ready. Account creation will be connected to the backend in the next phase; no request was sent.',
      )
    }
  }

  return (
    <AuthLayout
      description={{
        heading: 'Create your account',
        text: 'Set up your SeisChat username and password to get started.',
      }}
      footer={
        <>
          Already have an account?{' '}
          <Link
            className="font-medium text-cyan-300 underline-offset-4 transition hover:text-cyan-200 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            to="/login"
          >
            Log in
          </Link>
        </>
      }
      title="Join SeisChat"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="register-username"
          >
            Username
          </label>
          <input
            aria-describedby={
              errors.username ? 'register-username-error' : undefined
            }
            aria-invalid={Boolean(errors.username)}
            autoComplete="username"
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            id="register-username"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value)
              setErrors((current) => ({ ...current, username: '' }))
              setNotice('')
            }}
            placeholder="Choose a username"
            required
            type="text"
            value={username}
          />
          {errors.username && (
            <p
              className="mt-2 text-sm text-rose-300"
              id="register-username-error"
              role="alert"
            >
              {errors.username}
            </p>
          )}
        </div>

        <PasswordInput
          autoComplete="new-password"
          error={errors.password}
          id="register-password"
          label="Password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value)
            setErrors((current) => ({ ...current, password: '' }))
            setNotice('')
          }}
          value={password}
        />

        <PasswordInput
          autoComplete="new-password"
          error={errors.confirmPassword}
          id="register-confirm-password"
          label="Confirm password"
          name="confirmPassword"
          onChange={(event) => {
            setConfirmPassword(event.target.value)
            setErrors((current) => ({ ...current, confirmPassword: '' }))
            setNotice('')
          }}
          value={confirmPassword}
        />

        {notice && (
          <p
            className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-4 py-3 text-sm leading-6 text-cyan-100"
            role="status"
          >
            {notice}
          </p>
        )}

        <button
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition duration-200 hover:-translate-y-0.5 hover:from-blue-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:translate-y-0"
          type="submit"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register
