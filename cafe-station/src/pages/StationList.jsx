import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStations } from '../api'

export default function StationList() {
  const navigate = useNavigate()
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadStations() {
    try {
      setLoading(true)
      setError('')
      const data = await getStations()
      setStations(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load stations.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStations()
  }, [])

  function logout() {
    localStorage.removeItem('cafe_logged_in')
    navigate('/')
  }

  return (
    <div className="app-page">
      <header className="topbar">
        <div>
          <h1>PC Cafe Stations</h1>
          <p>Computer Cafe Station Management</p>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <main className="content">
        <div className="section-title">
          <div>
            <h2>Station List</h2>
            <p>Available PC rental workstations</p>
          </div>
          <button className="refresh-btn" onClick={loadStations}>
            Refresh
          </button>
        </div>

        {loading && <div className="status-box">Loading stations...</div>}

        {error && <div className="error-box">{error}</div>}

        {!loading && !error && stations.length === 0 && (
          <div className="empty-box">No stations found. Add your first station.</div>
        )}

        <div className="station-grid">
          {stations.map((station) => (
            <Link
              className="station-card"
              to={`/stations/${station.id}`}
              key={station.id}
            >
              <div className="station-icon">🖥️</div>
              <div>
                <h3>{station.station_name}</h3>
                <p>PC Number: {station.pc_number}</p>
                <span className="badge">{station.tier_category}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Link className="floating-btn" to="/stations/add" aria-label="Add Station">
        +
      </Link>
    </div>
  )
}