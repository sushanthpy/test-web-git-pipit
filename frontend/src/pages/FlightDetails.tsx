import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Users, Tag, CheckCircle } from 'lucide-react'
import { flightService } from '../services/api'

interface Flight {
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

function FlightDetails() {
  const { flightId } = useParams()
  const navigate = useNavigate()
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [flight, setFlight] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFlight = async () => {
      if (!flightId) return
      try {
        const data = await flightService.getById(flightId)
        setFlight(data)
      } catch (err) {
        setError('Failed to load flight details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchFlight()
  }, [flightId])

  const handleBook = () => {
    if (flight) {
      navigate('/booking', { state: { flight } })
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading flight details...</p>
        </div>
      </div>
    )
  }

  if (error || !flight) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-600">{error || 'Flight not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to search results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Flight Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Flight Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm">SW</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{flight.airline}</h2>
                  <p className="text-gray-500">Flight {flight.flightNumber}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Available
              </span>
            </div>

            {/* Route */}
            <div className="flex items-center justify-between py-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{flight.origin.split(' ')[0]}</p>
                <p className="text-gray-500">{flight.origin.split('(')[1]?.replace(')', '')}</p>
              </div>

              <div className="flex-1 px-8">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">{flight.departureTime}</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-600 rounded-full"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-600 rounded-full"></div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                      <Clock className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                  <span className="text-gray-500">{flight.arrivalTime}</span>
                </div>
                <p className="text-center text-gray-500 mt-2">{flight.duration}</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{flight.destination.split(' ')[0]}</p>
                <p className="text-gray-500">{flight.destination.split('(')[1]?.replace(')', '')}</p>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Direct Flight</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">{flight.class}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">{flight.seatsAvailable} seats</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {flight.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Baggage */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Baggage Allowance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">Carry-on</p>
                <p className="text-gray-600">{flight.baggage.carryOn}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">Checked</p>
                <p className="text-gray-600">{flight.baggage.checked}</p>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
            <p className="text-gray-600">{flight.cancellationPolicy}</p>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Fare</span>
                <span className="font-medium text-gray-900">${flight.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & Fees</span>
                <span className="font-medium text-gray-900">$156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium text-gray-900">$25</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-xl text-primary-600">${flight.price + 156 + 25}</span>
              </div>
            </div>

            <button
              onClick={handleBook}
              className="w-full py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Continue to Booking
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Free cancellation within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightDetails
