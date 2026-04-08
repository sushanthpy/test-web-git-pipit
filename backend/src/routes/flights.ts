import { Router, Request, Response } from 'express'
import { searchFlights, getFlightById, createFlight } from '../models'

const router = Router()

// Initialize mock data
const initializeMockData = () => {
  if (searchFlights({ origin: '', destination: '', departureDate: '' }).length === 0) {
    const mockFlights: any[] = [
      {
        id: '1',
        airline: 'SkyWings Airlines',
        flightNumber: 'SW1234',
        origin: 'New York',
        destination: 'London',
        departureTime: '18:30',
        arrivalTime: '06:45+1',
        duration: '7h 15m',
        price: 899,
        class: 'Economy',
        seatsAvailable: 42,
        amenities: ['WiFi', 'Meals', 'Entertainment', 'Power Outlet'],
        baggage: { carryOn: '1 piece (10kg)', checked: '1 piece (23kg)' },
        cancellationPolicy: 'Free cancellation within 24 hours',
      },
      {
        id: '2',
        airline: 'British Airways',
        flightNumber: 'BA456',
        origin: 'London',
        destination: 'Tokyo',
        departureTime: '11:00',
        arrivalTime: '14:30+1',
        duration: '13h 30m',
        price: 1200,
        class: 'Business',
        seatsAvailable: 15,
        amenities: ['WiFi', 'Meals', 'Entertainment', 'Power Outlet', 'Lounge Access'],
        baggage: { carryOn: '2 pieces (10kg each)', checked: '2 pieces (32kg each)' },
        cancellationPolicy: 'Free cancellation within 48 hours',
      },
      {
        id: '3',
        airline: 'Delta Airlines',
        flightNumber: 'DL789',
        origin: 'New York',
        destination: 'Paris',
        departureTime: '20:15',
        arrivalTime: '09:30+1',
        duration: '7h 15m',
        price: 750,
        class: 'Economy',
        seatsAvailable: 68,
        amenities: ['WiFi', 'Meals', 'Entertainment'],
        baggage: { carryOn: '1 piece (10kg)', checked: '1 piece (23kg)' },
        cancellationPolicy: 'Free cancellation within 24 hours',
      },
      {
        id: '4',
        airline: 'Emirates',
        flightNumber: 'EK101',
        origin: 'Dubai',
        destination: 'New York',
        departureTime: '08:45',
        arrivalTime: '14:30',
        duration: '13h 45m',
        price: 1100,
        class: 'Business',
        seatsAvailable: 22,
        amenities: ['WiFi', 'Meals', 'Entertainment', 'Power Outlet', 'Lounge Access', 'Shower'],
        baggage: { carryOn: '2 pieces (7kg each)', checked: '2 pieces (40kg)' },
        cancellationPolicy: 'Free cancellation within 72 hours',
      },
      {
        id: '5',
        airline: 'Singapore Airlines',
        flightNumber: 'SQ202',
        origin: 'Singapore',
        destination: 'London',
        departureTime: '01:25',
        arrivalTime: '06:50',
        duration: '13h 25m',
        price: 950,
        class: 'Economy',
        seatsAvailable: 55,
        amenities: ['WiFi', 'Meals', 'Entertainment', 'Power Outlet'],
        baggage: { carryOn: '1 piece (7kg)', checked: '1 piece (30kg)' },
        cancellationPolicy: 'Free cancellation within 24 hours',
      },
    ]

    mockFlights.forEach((flight) => createFlight(flight))
  }
}

initializeMockData()

// Search flights
router.get('/search', (req, res) => {
  try {
    const { origin, destination, departureDate } = req.query

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' })
    }

    const results = searchFlights({
      origin: origin as string,
      destination: destination as string,
      departureDate: departureDate as string,
    })

    res.json(results)
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Search failed' })
  }
})

// Get flight by ID
router.get('/:id', (req, res) => {
  try {
    const flight = getFlightById(req.params.id)

    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' })
    }

    res.json(flight)
  } catch (error) {
    console.error('Get flight error:', error)
    res.status(500).json({ error: 'Failed to get flight' })
  }
})

// Get all flights (for admin)
router.get('/', (req, res) => {
  try {
    res.json(searchFlights({ origin: '', destination: '', departureDate: '' }))
  } catch (error) {
    console.error('Get flights error:', error)
    res.status(500).json({ error: 'Failed to get flights' })
  }
})

export default router
