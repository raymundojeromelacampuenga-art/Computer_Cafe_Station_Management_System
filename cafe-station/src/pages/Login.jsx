import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password) {
      setError('Please enter both username and password.')
      return
    }

    if (username === 'cafe_admin' && password === 'pccafe2026') {
      localStorage.setItem('cafe_logged_in', 'true')
      navigate('/stations')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">˗ˏˋ☕ˎˊ˗</div>
        <h1>PC Cafe</h1>
        <p className="subtitle">Station Management System</p>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          {error && <div className="error-box">{error}</div>}

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
