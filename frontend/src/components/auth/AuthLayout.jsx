import { Link } from 'react-router-dom'

function AuthLayout({ children, description, footer, title }) {
  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#080b18] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 -top-48 -z-10 size-[34rem] rounded-full bg-blue-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -right-40 -z-10 size-[38rem] rounded-full bg-violet-600/20 blur-3xl"
      />

      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 shadow-2xl shadow-black/40 backdrop-blur-xl md:grid-cols-[0.95fr_1.05fr]">
        <aside className="flex flex-col justify-between bg-gradient-to-br from-blue-950/70 via-slate-950/50 to-violet-950/60 p-7 sm:p-10 lg:p-12">
          <div>
            <Link
              aria-label="SeisChat home"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              to="/login"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-500 text-slate-950 shadow-lg shadow-blue-500/20">
                <svg
                  aria-hidden="true"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 6.75A2.75 2.75 0 0 1 7.75 4h8.5A2.75 2.75 0 0 1 19 6.75v5.5A2.75 2.75 0 0 1 16.25 15H11l-4.5 4v-4.3A2.75 2.75 0 0 1 5 12.25v-5.5Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M9 9.5h6M9 12h3"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>
              <span className="text-xl font-semibold tracking-tight text-white">
                SeisChat
              </span>
            </Link>

            <div className="mt-10 md:mt-24">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Your team, in sync
              </p>
              <h1 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Six minds. One connection. One platform.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300 sm:text-base">
                A shared space for your team to connect, exchange ideas, and
                keep every conversation moving.
              </p>
            </div>
          </div>

          <div className="mt-10 hidden items-center gap-2 text-xs text-slate-400 md:flex">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]"
            />
            A clearer way to stay connected
          </div>
        </aside>

        <section
          aria-labelledby="auth-title"
          className="border-t border-white/10 bg-slate-900/70 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14"
        >
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium text-cyan-300">{title}</p>
              <h2
                className="mt-2 text-3xl font-semibold tracking-tight text-white"
                id="auth-title"
              >
                {description.heading}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description.text}
              </p>
            </div>

            {children}

            <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthLayout
