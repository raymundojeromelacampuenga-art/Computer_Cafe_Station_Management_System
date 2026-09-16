import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStationDetails } from '../api'

export default function StationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [station, setStation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadStation() {
      try {
        setLoading(true)
        setError('')
        const data = await getStationDetails(id)
        setStation(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadStation()
  }, [id])

  return (
    <div className="app-page">
      <header className="topbar">
        <div>
          <h1>Station Details</h1>
          <p>Complete workstation information</p>
        </div>
      </header>

      <main className="details-container">
        <button className="back-link" onClick={() => navigate('/stations')}>
          ← Back to Station List
        </button>

        {loading && <div className="status-box">Loading station...</div>}

        {error && <div className="error-box">{error}</div>}

        {!loading && !error && station && (
          <div className="details-card">
            <div className="large-icon">🖥️</div>
            <span className="badge">{station.tier_category}</span>

            <h2>{station.station_name}</h2>
            <p className="details-subtitle">Computer Cafe Workstation</p>

            <div className="details-list">
              <div>
                <span>Station ID</span>
                <strong>#{station.id}</strong>
              </div>
              <div>
                <span>PC Number</span>
                <strong>{station.pc_number}</strong>
              </div>
              <div>
                <span>Tier / Category</span>
                <strong>{station.tier_category}</strong>
              </div>
              <div>
                <span>Hourly Rate</span>
                <strong>₱{Number(station.hourly_rate).toFixed(2)}</strong>
              </div>
            </div>

            <button className="primary-btn" onClick={() => navigate('/stations')}>
              Back
            </button>
          </div>
        )}
      </main>
    </div>
  )
}