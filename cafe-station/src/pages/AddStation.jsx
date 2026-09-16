import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStation } from "../api.js";

const initialForm = {
  station_name: '',
  pc_number: '',
  tier_category: '',
  hourly_rate: ''
}

export default function AddStation() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [saving, setSaving] = useState(false)

  function updateField(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }

  function validate() {
    const newErrors = {}

    if (!form.station_name.trim()) {
      newErrors.station_name = 'Station name is required.'
    }

    if (!form.pc_number.trim()) {
      newErrors.pc_number = 'PC number is required.'
    }

    if (!form.tier_category) {
      newErrors.tier_category = 'Please select a tier/category.'
    }

    if (form.hourly_rate === '') {
      newErrors.hourly_rate = 'Hourly rate is required.'
    } else if (isNaN(Number(form.hourly_rate))) {
      newErrors.hourly_rate = 'Hourly rate must be a valid number.'
    } else if (Number(form.hourly_rate) < 0) {
      newErrors.hourly_rate = 'Hourly rate cannot be negative.'
    }

    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const clientErrors = validate()

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      setGeneralError('')
      return
    }

    try {
      setSaving(true)
      setErrors({})
      setGeneralError('')

      const station = await createStation({
        station_name: form.station_name.trim(),
        pc_number: form.pc_number.trim(),
        tier_category: form.tier_category,
        hourly_rate: Number(form.hourly_rate)
      })

      navigate(`/stations/${station.id}`)
    } catch (err) {
      // Laravel validation errors look like { field: ["message", ...] }.
      // Flatten each field down to its first message for display.
      if (err.errors) {
        const fieldErrors = {}
        Object.entries(err.errors).forEach(([field, messages]) => {
          fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages
        })
        setErrors(fieldErrors)
        setGeneralError('')
      } else {
        setErrors({})
        setGeneralError(err.message || 'Failed to save station.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="app-page">
      <header className="topbar">
        <div>
          <h1>Add Station</h1>
          <p>Create a new PC rental workstation</p>
        </div>
      </header>

      <main className="form-container">
        <button className="back-link" onClick={() => navigate('/stations')}>
          ← Back to Station List
        </button>

        <div className="form-card">
          <h2>Station Information</h2>

          {generalError && <div className="error-box">{generalError}</div>}

          <form onSubmit={handleSubmit}>
            <label>Station Name</label>
            <input
              name="station_name"
              value={form.station_name}
              onChange={updateField}
              placeholder="e.g. Station A"
            />
            {errors.station_name && <small className="field-error">{errors.station_name}</small>}

            <label>PC Number</label>
            <input
              name="pc_number"
              value={form.pc_number}
              onChange={updateField}
              placeholder="e.g. PC-001"
            />
            {errors.pc_number && <small className="field-error">{errors.pc_number}</small>}

            <label>Tier / Category</label>
            <select
              name="tier_category"
              value={form.tier_category}
              onChange={updateField}
            >
              <option value="">Select category</option>
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
              <option value="Streaming Room">Streaming Room</option>
            </select>
            {errors.tier_category && <small className="field-error">{errors.tier_category}</small>}

            <label>Hourly Rate</label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="hourly_rate"
              value={form.hourly_rate}
              onChange={updateField}
              placeholder="e.g. 50"
            />
            {errors.hourly_rate && <small className="field-error">{errors.hourly_rate}</small>}

            <button className="primary-btn" type="submit" disablend={saving}>
              {saving ? 'Saving...' : 'Save Station'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}