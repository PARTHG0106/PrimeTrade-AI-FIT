# Task Manager

A full-stack task management application with authentication, built with React and Node.js.

## Quick Start

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit http://localhost:5173

## Features

- User authentication (register, login, logout)
- JWT-based authorization
- Create, edit, delete tasks
- Task status and priority management
- Search and filter tasks
- User profile management
- Responsive design

## Tech Stack

**Frontend:** React, Vite, TailwindCSS, React Router, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt  
**DevOps:** Docker, Docker Compose, nginx

## Project Structure

```
├── backend/
│   ├── models/          # User and Task models
│   ├── routes/          # API routes
│   ├── middleware/      # JWT authentication
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Login, Register, Dashboard, Profile
│   │   ├── context/     # Auth context
│   │   └── utils/       # API configuration
│   └── ...
└── docker-compose.yml
```

## Prerequisites

- Node.js v16+
- MongoDB v5+
- npm

## Docker Deployment

```bash
docker-compose up -d
```

Access at http://localhost

## API Endpoints

**Auth:** POST `/api/auth/register`, `/api/auth/login`  
**Profile:** GET/PUT `/api/users/profile`  
**Tasks:** GET/POST `/api/tasks`, GET/PUT/DELETE `/api/tasks/:id`

See [API_DOCS.md](backend/API_DOCS.md) for details. Import `backend/postman_collection.json` for testing.

## Security

- Password hashing with bcrypt
- JWT authentication
- Protected routes with middleware
- Client and server-side validation
- Environment-based CORS configuration
