import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plane, Calendar, CreditCard, ArrowRight, Trash2, Edit } from 'lucide-react'
import { bookingService } from '../services/api'

interface Booking {
  id: string
  flightId: string
  passengerName: string
  passengerEmail: string
  status: 'pending' | 'confirmed' | 'cancelled'
  totalPrice: number
  bookingDate: string
  confirmationCode: string
}

function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getByUserId()
        setBookings(data)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    )
  }
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <Link
          to="/search"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plane className="h-4 w-4 mr-2" />
          Book New Flight
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h2>
          <p className="text-gray-500 mb-6">
            Start your travel journey by booking your first flight
          </p>
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Search Flights
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-sm">
                        {booking.airline.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Confirmation Code</p>
                      <p className="font-mono font-bold text-gray-900">{booking.confirmationCode}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between py-6 border-y">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{booking.origin.split(' ')[0]}</p>
                    <p className="text-sm text-gray-500">{booking.origin.split('(')[1]?.replace(')', '')}</p>
                    <p className="text-sm text-gray-600 mt-1">{booking.departureTime}</p>
                  </div>

                  <div className="flex-1 px-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                      <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      {booking.class} • {booking.passengerCount || booking.passengers} passenger(s)
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{booking.destination.split(' ')[0]}</p>
                    <p className="text-sm text-gray-500">{booking.destination.split('(')[1]?.replace(')', '')}</p>
                    <p className="text-sm text-gray-600 mt-1">{booking.returnTime}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Passenger</p>
                    <p className="font-medium text-gray-900">{booking.passengerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{booking.passengerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking Date</p>
                    <p className="font-medium text-gray-900">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="font-bold text-primary-600">${booking.totalPrice}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <Link
                    to={`/bookings/${booking.id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
