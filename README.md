# Team Task Manager

A full-stack project management application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **User Authentication**: Secure JWT-based login and signup.
- **Role-Based Access Control**: 
  - **Admin**: Create projects, assign members, and manage tasks.
  - **Member**: View projects and update assigned task status.
- **Enhanced UI**: 
  - Visual differentiation for Admin users.
  - Professional badges and avatars in the member assignment section.
- **Dashboard Analytics**: Real-time overview of task statuses and team performance.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Axios, Lucide React, React Router.
- **Backend**: Node.js, Express, Mongoose (MongoDB), JWT, Bcrypt.js.
- **Database**: MongoDB Atlas.

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd team-task-manager
```

### 2. Environment Configuration
The project uses environment variables for security. You must create a `.env` file in the `backend/` directory.

1. Locate `backend/.env.example`.
2. Create a new file named `backend/.env`.
3. Copy the contents of `.env.example` to `.env` and fill in your actual credentials.

```bash
# Example backend/.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Backend Setup
```bash
cd backend
npm install
npm run dev # Starts the server on port 5000
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev # Starts the Vite development server
```

## 🔒 Security
- `.env` files are ignored by git to prevent accidental exposure of secrets.
- Always use `.env.example` as a template for other contributors.

## 📡 API Endpoints

### Auth
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/users`: Get all users (Protected)

### Projects
- `POST /api/projects`: Create a project (Admin only)
- `GET /api/projects`: Get user's projects (Protected)
- `GET /api/projects/:id`: Get project details (Protected)

### Tasks
- `POST /api/tasks`: Create a task (Admin only)
- `GET /api/tasks/my-tasks`: Get user's assigned tasks (Protected)
- `GET /api/tasks/stats`: Get dashboard stats (Protected)
- `PUT /api/tasks/:id/status`: Update task status (Protected)
