import { Link } from 'react-router-dom'
import seisChatLogo from '../../assets/seis-chat-logo.png'

function AuthLayout({ children, description, footer, title }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#0b1118] px-4 py-8 text-slate-100 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700/70 bg-[#111923] shadow-xl shadow-black/20 md:grid-cols-[0.92fr_1.08fr]">
        <aside className="flex flex-col justify-between bg-[#121f2c] p-7 sm:p-10 lg:p-12">
          <div>
            <Link
              aria-label="SeisChat home"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#121f2c]"
              to="/login"
            >
              <img
                alt=""
                className="size-10 shrink-0 object-contain"
                src={seisChatLogo}
              />
              <span className="text-lg font-semibold tracking-[-0.03em] text-slate-50">
                SeisChat
              </span>
            </Link>

            <div className="mt-10 md:mt-24">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
                Conversation, made clear
              </p>
              <h1 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                A quieter space for better conversations.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
                Bring your team together in one thoughtful space to share ideas
                and keep in touch.
              </p>
            </div>
          </div>

          <div className="mt-10 hidden border-t border-slate-700/80 pt-5 text-xs tracking-wide text-slate-400 md:block">
            Made for the conversations that matter.
          </div>
        </aside>

        <section
          aria-labelledby="auth-title"
          className="border-t border-slate-700/70 bg-[#111923] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14"
        >
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium text-blue-300">{title}</p>
              <h2
                className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-white"
                id="auth-title"
              >
                {description.heading}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description.text}
              </p>
            </div>

            {children}

            <div className="mt-8 border-t border-slate-700/70 pt-6 text-center text-sm text-slate-400">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthLayout
