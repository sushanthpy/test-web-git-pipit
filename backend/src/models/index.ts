export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  createdAt: Date
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  class: string
  seatsAvailable: number
  amenities: string[]
  baggage: {
    carryOn: string
    checked: string
  }
  cancellationPolicy: string
}

export interface Booking {
  id: string
  userId: string
  flightId: string
  passengerName: string
  passengerEmail: string
  passengerPhone: string
  passport: string
  nationality: string
  class: string
  passengers: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  confirmationCode: string
  bookingDate: Date
  paymentStatus: 'pending' | 'completed' | 'refunded'
}

// Mock database - in production, use PostgreSQL
const users: User[] = []
const flights: Flight[] = []
const bookings: Booking[] = []

// User functions
export const createUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date(),
  }
  users.push(newUser)
  return newUser
}

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return users.find((u) => u.email === email)
}

export const findUserById = async (id: string): Promise<User | undefined> => {
  return users.find((u) => u.id === id)
}

// Flight functions
export const createFlight = (flight: Flight): Flight => {
  flights.push(flight)
  return flight
}

export const getFlightById = (id: string): Flight | undefined => {
  return flights.find((f) => f.id === id)
}

export const searchFlights = (params: {
  origin: string
  destination: string
  departureDate: string
}): Flight[] => {
  return flights.filter(
    (f) =>
      f.origin.toLowerCase().includes(params.origin.toLowerCase()) &&
      f.destination.toLowerCase().includes(params.destination.toLowerCase()) &&
      f.seatsAvailable > 0
  )
}

// Booking functions
export const createBooking = (booking: Omit<Booking, 'id' | 'confirmationCode' | 'bookingDate'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    confirmationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    bookingDate: new Date(),
  }
  bookings.push(newBooking)
  return newBooking
}

export const getBookingById = (id: string): Booking | undefined => {
  return bookings.find((b) => b.id === id)
}

export const getBookingsByUserId = (userId: string): Booking[] => {
  return bookings.filter((b) => b.userId === userId)
}

export const updateBookingStatus = (id: string, status: Booking['status']): Booking | undefined => {
  const booking = bookings.find((b) => b.id === id)
  if (booking) {
    booking.status = status
  }
  return booking
}

export default { users, flights, bookings }
