# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
- **POST** `/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### User Profile

#### Get Profile
- **GET** `/users/profile`
- **Auth:** Required
- **Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Software developer",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

#### Update Profile
- **PUT** `/users/profile`
- **Auth:** Required
- **Body:**
```json
{
  "name": "John Smith",
  "bio": "Full-stack developer",
  "avatar": "https://example.com/new-avatar.jpg"
}
```
- **Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Smith",
    "email": "john@example.com",
    "bio": "Full-stack developer",
    "avatar": "https://example.com/new-avatar.jpg"
  }
}
```

### Tasks

#### Get All Tasks
- **GET** `/tasks`
- **Auth:** Required
- **Query Parameters:**
  - `status` (optional): pending, in-progress, completed
  - `priority` (optional): low, medium, high
  - `search` (optional): search in title and description
  - `sortBy` (optional): field to sort by (default: createdAt)
  - `order` (optional): asc or desc (default: desc)
- **Response:**
```json
{
  "tasks": [
    {
      "_id": "task_id",
      "title": "Complete project",
      "description": "Finish the task manager app",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Get Single Task
- **GET** `/tasks/:id`
- **Auth:** Required
- **Response:**
```json
{
  "task": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Task
- **POST** `/tasks`
- **Auth:** Required
- **Body:**
```json
{
  "title": "New task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-12-31"
}
```
- **Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id",
    "title": "New task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Task
- **PUT** `/tasks/:id`
- **Auth:** Required
- **Body:**
```json
{
  "title": "Updated task",
  "status": "completed"
}
```
- **Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task_id",
    "title": "Updated task",
    "description": "Task description",
    "status": "completed",
    "priority": "medium",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### Delete Task
- **DELETE** `/tasks/:id`
- **Auth:** Required
- **Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Validation error message",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error"
}
```
