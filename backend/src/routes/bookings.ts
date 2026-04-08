import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import {
  createBooking,
  getBookingById,
  getBookingsByUserId,
  updateBookingStatus,
  getFlightById,
} from '../models'

const router = Router()

// Create booking
router.post(
  '/',
  [
    body('flightId').notEmpty().withMessage('Flight ID is required'),
    body('passengerName').notEmpty().withMessage('Passenger name is required'),
    body('passengerEmail').isEmail().withMessage('Valid email is required'),
    body('passengerPhone').notEmpty().withMessage('Phone is required'),
    body('passport').notEmpty().withMessage('Passport number is required'),
    body('nationality').notEmpty().withMessage('Nationality is required'),
    body('class').notEmpty().withMessage('Class is required'),
    body('passengers').isInt({ min: 1 }).withMessage('At least 1 passenger required'),
    body('totalPrice').isFloat().withMessage('Total price is required'),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const {
        flightId,
        passengerName,
        passengerEmail,
        passengerPhone,
        passport,
        nationality,
        class: flightClass,
        passengers,
        totalPrice,
      } = req.body

      // Check if flight exists
      const flight = getFlightById(flightId)
      if (!flight) {
        return res.status(404).json({ error: 'Flight not found' })
      }

      // Check seat availability
      if (flight.seatsAvailable < passengers) {
        return res.status(400).json({ error: 'Not enough seats available' })
      }

      // Get user ID from token
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' })
      }

      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
      let userId: string
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
        userId = decoded.id
      } catch (err) {
        return res.status(401).json({ error: 'Invalid token' })
      }

      // Create booking
      const booking = createBooking({
        userId,
        flightId,
        passengerName,
        passengerEmail,
        passengerPhone,
        passport,
        nationality,
        class: flightClass,
        passengers,
        totalPrice,
        status: 'confirmed',
        paymentStatus: 'completed',
      })

      // Update flight seats
      flight.seatsAvailable -= passengers

      res.status(201).json({
        message: 'Booking created successfully',
        booking,
      })
    } catch (error) {
      console.error('Create booking error:', error)
      res.status(500).json({ error: 'Booking failed' })
    }
  }
)

// Get booking by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const booking = getBookingById(req.params.id)

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    res.json(booking)
  } catch (error) {
    console.error('Get booking error:', error)
    res.status(500).json({ error: 'Failed to get booking' })
  }
})

// Get user bookings
router.get('/user', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
    let userId: string
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
      userId = decoded.id
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const bookings = getBookingsByUserId(userId)
    res.json(bookings)
  } catch (error) {
    console.error('Get user bookings error:', error)
    res.status(500).json({ error: 'Failed to get bookings' })
  }
})

// Cancel booking
router.patch('/:id/cancel', async (req: express.Request, res: express.Response) => {
  try {
    const booking = updateBookingStatus(req.params.id, 'cancelled')

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    res.json({
      message: 'Booking cancelled successfully',
      booking,
    })
  } catch (error) {
    console.error('Cancel booking error:', error)
    res.status(500).json({ error: 'Failed to cancel booking' })
  }
})

// Refund booking
router.patch('/:id/refund', async (req: express.Request, res: express.Response) => {
  try {
    const booking = getBookingById(req.params.id)

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    if (booking.paymentStatus === 'refunded') {
      return res.status(400).json({ error: 'Booking already refunded' })
    }

    booking.paymentStatus = 'refunded'

    res.json({
      message: 'Refund processed successfully',
      booking,
    })
  } catch (error) {
    console.error('Refund error:', error)
    res.status(500).json({ error: 'Failed to process refund' })
  }
})

export default router
