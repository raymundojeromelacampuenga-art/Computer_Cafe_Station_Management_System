export async function getStations() {
    const response = await fetch('/api/stations')
  
    if (!response.ok) {
      throw new Error('Failed to load stations.')
    }
  
    return response.json()
  }
  
  export async function getStation(id) {
    const response = await fetch(`/api/stations/${id}`)
  
    if (!response.ok) {
      throw new Error('Station not found.')
    }
  
    return response.json()
  }
  
  export async function createStation(data) {
    const response = await fetch('/api/stations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
  
    const result = await response.json().catch(() => ({}))
  
    if (!response.ok) {
      const error = new Error('Unable to save station.')
      error.validation = result.errors || {}
      error.messageFromServer = result.message || ''
      throw error
    }
  
    return result
  }
  