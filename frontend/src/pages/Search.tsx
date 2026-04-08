import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, Plane } from 'lucide-react'

function Search() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/search', { state: formData })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Flights</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Origin */}
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="City or airport"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="City or airport"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Departure Date */}
            <div>
              <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                Departure
              </label>
              <input
                type="date"
                id="departureDate"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Return Date */}
            <div>
              <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                Return (Optional)
              </label>
              <input
                type="date"
                id="returnDate"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Passengers */}
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
                Passengers
              </label>
              <select
                id="passengers"
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Class */}
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              id="class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SearchIcon className="h-5 w-5 mr-2" />
            Search Flights
          </button>
        </form>
      </div>

      {/* Quick Search Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Search Tips</h3>
        <ul className="space-y-2 text-blue-800">
          <li>• Book at least 2-3 weeks in advance for better prices</li>
          <li>• Tuesday and Wednesday flights are often cheaper</li>
          <li>• Use incognito mode to avoid price increases based on search history</li>
          <li>• Consider nearby airports for more options</li>
        </ul>
      </div>
    </div>
  )
}

export default Search
