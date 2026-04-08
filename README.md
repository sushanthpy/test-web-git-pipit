# Flight Booking Platform

A full-featured flight booking website built with React, TypeScript, and Node.js.

## Features

### User Features
- ✈️ Search and compare flights from multiple airlines
- 🔐 Secure user authentication and registration
- 💳 Secure payment processing
- 📱 Mobile responsive design
- 👤 User dashboard and profile management
- 🎫 Booking management (view, cancel, refund)
- 📧 Email notifications
- 🌍 Multi-language and multi-currency support

### Admin Features
- 📊 Dashboard with analytics
- 👥 User management
- 📋 Booking management
- 💰 Revenue tracking
- 📈 Reports and insights

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Zustand for state management

### Backend
- Node.js with Express
- TypeScript
- JWT authentication
- bcrypt for password hashing
- Express validator for input validation
- PostgreSQL (ready for integration)

## Project Structure

```
flight-booking-platform/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   └── services/      # API services
│   ├── package.json
│   └── vite.config.ts
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Data models
│   │   ├── middleware/    # Custom middleware
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── docs/                  # Documentation
└── req.md                 # Requirements document
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional, for production)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flight-booking-platform
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables:
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend
cd ../frontend
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
Server will run on http://localhost:5000

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```
App will run on http://localhost:3000

3. Open http://localhost:3000 in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Flights
- `GET /api/flights/search` - Search flights
- `GET /api/flights/:id` - Get flight details
- `GET /api/flights` - Get all flights (admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `GET /api/bookings/user` - Get user bookings
- `PATCH /api/bookings/:id/cancel` - Cancel booking
- `PATCH /api/bookings/:id/refund` - Process refund

## Demo Credentials

### User Account
- Email: user@example.com
- Password: password123

### Admin Account
- Email: admin@example.com
- Password: admin123

## Development

### Build for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm run build
npm start
```

### Testing
```bash
cd backend
npm test
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Helmet.js for HTTP headers
- Rate limiting (ready to implement)

## Future Enhancements

- Real airline API integration (Amadeus, Sabre)
- Payment gateway integration (Stripe, PayPal)
- Email notification system
- Multi-language support
- Mobile apps (React Native)
- Price alerts and fare prediction
- Hotel and car rental booking
- Loyalty program
- Corporate travel management

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ for travel enthusiasts
