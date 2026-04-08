import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import SearchResults from './pages/SearchResults'
import FlightDetails from './pages/FlightDetails'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MyBookings from './pages/MyBookings'
import Admin from './pages/Admin'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="search/results" element={<SearchResults />} />
          <Route path="flight/:flightId" element={<FlightDetails />} />
          <Route path="booking" element={<Booking />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
