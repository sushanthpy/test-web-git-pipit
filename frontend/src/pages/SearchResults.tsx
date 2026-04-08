import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Plane, Calendar, Clock, ArrowRight } from 'lucide-react'
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

function SearchResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = location.state as any
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const searchFlights = async () => {
      if (!searchParams?.origin || !searchParams?.destination) {
        navigate('/search')
        return
      }

      try {
        const results = await flightService.search(
          searchParams.origin,
          searchParams.destination,
          searchParams.departureDate
        )
        setFlights(results)
      } catch (err) {
        setError('Failed to search flights')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    searchFlights()
  }, [searchParams, navigate])

  const handleSelectFlight = (flight: Flight) => {
    navigate(`/flight/${flight.id}`, { state: { flight } })
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for flights...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate('/search')}
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Back to search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/search')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
          Back to search
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Flights from {searchParams?.origin} to {searchParams?.destination}
        </h1>
        <p className="text-gray-600">
          {searchParams?.departureDate && `Departing: ${searchParams.departureDate}`}
        </p>
      </div>

      {flights.length === 0 ? (
        <div className="text-center py-12">
          <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="space-y-6">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <Plane className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{flight.airline}</p>
                      <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{flight.departureTime}</p>
                      <p className="text-sm text-gray-500">{flight.origin}</p>
                    </div>

                    <div className="flex-1 px-8 text-center">
                      <p className="text-sm text-gray-500 mb-2">{flight.duration}</p>
                      <div className="flex items-center justify-center">
                        <div className="h-px bg-gray-300 flex-1"></div>
                        <Clock className="h-4 w-4 text-gray-400 mx-2" />
                        <div className="h-px bg-gray-300 flex-1"></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{flight.arrivalTime}</p>
                      <p className="text-sm text-gray-500">{flight.destination}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {flight.class}
                      </span>
                      <span className="text-sm text-gray-500">
                        {flight.seatsAvailable} seats left
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">${flight.price}</p>
                      <button
                        onClick={() => handleSelectFlight(flight)}
                        className="mt-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults
