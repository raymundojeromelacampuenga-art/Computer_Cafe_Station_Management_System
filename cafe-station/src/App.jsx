import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import StationList from './pages/StationList'
import AddStation from './pages/AddStation.jsx'
import StationDetails from './pages/StationDetails'

function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem('cafe_logged_in') === 'true'
  return loggedIn ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/stations"
        element={
          <PrivateRoute>
            <StationList />
          </PrivateRoute>
        }
      />

      <Route
        path="/stations/add"
        element={
          <PrivateRoute>
            <AddStation />
          </PrivateRoute>
        }
      />

      <Route
        path="/stations/:id"
        element={
          <PrivateRoute>
            <StationDetails />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
