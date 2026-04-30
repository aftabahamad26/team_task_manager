# Team Task Manager

A full-stack project management application built with Node.js, Express, MongoDB, and React.

## Features
- **Authentication**: JWT-based login and signup with role-based access (Admin, Member).
- **Project Management**: Admins can create projects and assign members.
- **Task Management**: Admins can create tasks within projects; Members can update their task status.
- **Dashboard**: Overview of total, completed, and pending tasks.

## Tech Stack
- **Backend**: Node.js, Express, Mongoose (MongoDB), JWT, Bcrypt.js.
- **Frontend**: React (Vite), Tailwind CSS, Axios, Lucide React, React Router.

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repo-url>
cd team-task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file
  ```
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  NODE_ENV=development
  ```
- Start the backend:
  ```bash
  npm run dev
  ```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Start the frontend:
  
  npm run dev


## API Endpoints

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

## Deployment (Railway/Render)
- **Backend**: Set the root directory to `backend`, add environment variables, and use `npm start`.
- **Frontend**: Set the root directory to `frontend`, set the build command to `npm run build`, and the output directory to `dist`.
