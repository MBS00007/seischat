import { useAuth } from '../context/AuthContext.jsx'

function ChatroomPlaceholder() {
  const { clearError, error, isSubmitting, logout } = useAuth()

  async function handleLogout() {
    clearError()
    try {
      await logout()
    } catch {
      // The shared auth error is displayed below.
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-8 text-slate-100">
      <h1 className="text-2xl font-semibold">Chatroom</h1>
      <p className="mt-2 text-slate-400">
        The chatroom interface will be added separately.
      </p>
      {error && (
        <p className="mt-4 text-sm text-rose-300" role="alert">
          {error.message}
        </p>
      )}
      <button
        className="mt-6 rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        onClick={handleLogout}
        type="button"
      >
        {isSubmitting ? 'Signing out…' : 'Sign out'}
      </button>
    </main>
  )
}

export default ChatroomPlaceholder
