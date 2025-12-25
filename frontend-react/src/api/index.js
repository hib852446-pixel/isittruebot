import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`📨 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status}`, response.data)
    return response
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const analyzeText = async ({ text, requestType, temperature }) => {
  const response = await api.post('/analyze', {
    text,
    request_type: requestType,
    temperature,
  })
  return response.data
}

export const checkHealth = async () => {
  const response = await api.get('/health')
  return response.data
}

export const detectType = async (text) => {
  const response = await api.post('/detect-type', { text })
  return response.data
}

export default api
