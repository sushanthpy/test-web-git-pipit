import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Plane, Calendar, CreditCard, TrendingUp } from 'lucide-react'
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

function Dashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalBookings: 0, upcomingTrips: 0, spent: 0 })

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getByUserId()
        setBookings(data)
        setStats({
          totalBookings: data.length,
          upcomingTrips: data.filter((b) => b.status === 'confirmed').length,
          spent: data.reduce((sum, b) => sum + b.totalPrice, 0),
        })
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBookings}</p>
            </div>
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Trips</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.upcomingTrips}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Plane className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.spent}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-primary-100">
          Ready to book your next adventure? Search for flights and find the best deals.
        </p>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="divide-y">
          {bookings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No bookings yet. Start searching for flights!
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Booking #{booking.confirmationCode}</p>
                    <p className="text-sm text-gray-500">{booking.bookingDate}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <p className="text-lg font-bold text-gray-900 mt-2">${booking.totalPrice}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
