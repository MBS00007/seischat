import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute, GuestOnlyRoute } from './components/auth/RouteGuards.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ChatroomPlaceholder from './pages/ChatroomPlaceholder.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestOnlyRoute />}>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<ChatroomPlaceholder />} path="/chat" />
          </Route>
          <Route element={<Navigate replace to="/login" />} path="*" />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
