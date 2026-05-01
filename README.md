# Team Task Manager
A full-stack project management application built with the MERN stack (MongoDB, Express, React, Node.js).


[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

A comprehensive full-stack project management application built with the MERN stack (MongoDB(Database), Express.js, React, Node.js). Streamline team collaboration with role-based access control, real-time task tracking, and an intuitive dashboard.

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based user authentication
- Role-based access control (Admin/Member)
- Proper validations & relationships
- Password hashing with bcrypt

### 👥 User Roles
- **Admin**: Create projects, assign team members, manage tasks, view analytics
- **Member**: View assigned projects, update task statuses, track progress

### 📊 Dashboard & Analytics
- Real-time task status overview
- Team performance metrics
- Project progress visualization
- Responsive design for all devices

### 🎨 Modern UI/UX
- Built with React and Vite for fast development
- Styled with Tailwind CSS
- Professional badges and avatars
- Visual differentiation for admin features
- Mobile-responsive design

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Declarative routing for React
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Development Tools
- **Nodemon** - Auto-restart for backend development
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
team-task-manager/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── projectController.js  # Project management
│   │   └── taskController.js     # Task management
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication middleware
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Project.js            # Project schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── projectRoutes.js      # Project endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── utils/
│   │   └── asyncHandler.js       # Async error handling
│   ├── package.json
│   ├── server.js                 # Main server file
│   └── .env                      # Environment variables
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation component
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Signup.jsx        # Registration page
│   │   │   ├── ProjectManagement.jsx # Project management
│   │   │   └── ProjectDetails.jsx # Project details
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # App entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── postcss.config.js         # PostCSS configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/team-task-manager.git
   cd team-task-manager
   ```

2. **Set up the Backend**

   ```bash
   cd backend

   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env
   ```

   Edit `backend/.env` with your configuration:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```

   ```bash
   # Start the backend server
   npm run dev
   ```

3. **Set up the Frontend**

   ```bash
   cd ../frontend

   # Install dependencies
   npm install

   # Start the development server
   npm run dev
   ```

4. **Access the Application**

   - Frontend: http://localhost:5173 (default Vite port)
   - Backend API: http://localhost:5000

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/users` - Get all users (Admin only)

### Project Endpoints
- `POST /api/projects` - Create new project (Admin)
- `GET /api/projects` - Get user's projects
- `GET /api/projects/:id` - Get project details

### Task Endpoints
- `POST /api/tasks` - Create new task (Admin)
- `GET /api/tasks/my-tasks` - Get assigned tasks
- `GET /api/tasks/stats` - Get dashboard statistics
- `PUT /api/tasks/:id/status` - Update task status

## 🔧 Available Scripts

### Backend
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored securely
- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with expiration
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Server-side validation for all inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with the full stack
- Icons by [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Happy Task Managing! 🚀**
