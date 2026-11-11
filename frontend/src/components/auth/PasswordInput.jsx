import { useState } from 'react'

function PasswordInput({
  autoComplete,
  error,
  id,
  label,
  name,
  onChange,
  value,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const errorId = `${id}-error`

  return (
    <div>
      <label
        className="mb-2 block text-sm font-medium text-slate-200"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          autoComplete={autoComplete}
          className="w-full rounded-lg border border-slate-700 bg-[#0d141c] px-4 py-3 pr-12 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
          id={id}
          name={name}
          onChange={onChange}
          required
          type={isVisible ? 'text' : 'password'}
          value={value}
        />
        <button
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-4 text-slate-400 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
          onClick={() => setIsVisible((visible) => !visible)}
          type="button"
        >
          {isVisible ? (
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
              <path
                d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.5 5.1 9 6-.2.4-1.2 2-2.9 3.4M6.2 6.2C4.3 7.5 3.2 9.3 3 11c.5.9 3.8 8 9 8 1.1 0 2.1-.3 3-.8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 12s3.3-7 9-7 9 7 9 7-3.3 7-9 7-9-7-9-7Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
              <circle
                cx="12"
                cy="12"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-rose-300" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default PasswordInput
