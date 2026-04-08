import axios from 'axios'

const API_URL = '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth service
export const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })
    return res.data
  },
  register: async (name: string, email: string, password: string) => {
    const res = await api.post('/auth/register', { name, email, password })
    return res.data
  },
  getMe: async () => {
    const res = await api.get('/auth/me')
    return res.data
  },
  logout: () => {
    localStorage.removeItem('token')
  },
}

// Flight service
export const flightService = {
  search: async (origin: string, destination: string, departureDate?: string) => {
    const res = await api.get('/flights/search', {
      params: { origin, destination, departureDate },
    })
    return res.data
  },
  getById: async (id: string) => {
    const res = await api.get(`/flights/${id}`)
    return res.data
  },
  getAll: async () => {
    const res = await api.get('/flights')
    return res.data
  },
}

// Booking service
export const bookingService = {
  create: async (bookingData: any) => {
    const res = await api.post('/bookings', bookingData)
    return res.data
  },
  getById: async (id: string) => {
    const res = await api.get(`/bookings/${id}`)
    return res.data
  },
  getByUserId: async () => {
    const res = await api.get('/bookings/user')
    return res.data
  },
  cancel: async (id: string) => {
    const res = await api.patch(`/bookings/${id}/cancel`)
    return res.data
  },
  refund: async (id: string) => {
    const res = await api.patch(`/bookings/${id}/refund`)
    return res.data
  },
}

export default api
