import { Link } from 'react-router-dom'
import { Plane, Search, Calendar, CreditCard, Shield } from 'lucide-react'

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Book Your Next Flight
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Search, compare, and book flights from hundreds of airlines at the best prices.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Start Searching
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Search Flights
            </h3>
            <p className="text-gray-500">
              Compare prices from hundreds of airlines and find the best deals for your travel.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Secure Payment
            </h3>
            <p className="text-gray-500">
              Book with confidence using our secure payment gateway with multiple options.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Easy Management
            </h3>
            <p className="text-gray-500">
              Manage your bookings, cancel, or reschedule with ease from your dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['New York', 'London', 'Tokyo', 'Paris'].map((city) => (
              <Link
                key={city}
                to={`/search?destination=${encodeURIComponent(city)}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{city}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">Flights from</p>
                  <p className="text-xl font-bold text-gray-900">$299</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary-600 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book Your Flight?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their travel plans.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
