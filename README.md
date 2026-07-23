# Ultimate Backend - 2

A full-stack authentication demo with a React + Vite frontend and an Express + MongoDB backend.

## Project Overview

This project demonstrates a user registration, login, and protected home page flow using:
- **React** for the client UI
- **React Router** for client-side page routing
- **Axios** for HTTP requests
- **Express** for the backend API
- **MongoDB + Mongoose** for user storage
- **JWT cookies** for authentication
- **Cloudinary** integration for profile image uploads

## Repository Structure

- `client/` - React frontend
  - `src/` - React components and pages
    - `pages/` - `Home`, `LogIn`, `Register`
    - `context/` - `UserContext` for auth state
- `server/` - Express backend
  - `controllers/` - auth logic
  - `routes/` - API routes
  - `middlewares/` - auth and file upload middleware
  - `models/` - Mongoose user schema
  - `config/` - database and Cloudinary setup

## Features

- User registration with profile image upload
- User login with JWT cookie-based auth
- Protected `/home` page that requires authentication
- Server-side auth middleware to validate JWT cookie
- Cross-origin support between `localhost:5173` and `localhost:3000`

## Setup Instructions

### Backend

1. Open `server/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with values for:
   - `MONGODB_URL`
   - `PORT`
   - `JWT_SECRET`
   - `NODE_ENVIRONMENT`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend

1. Open `client/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Running the App

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

The frontend uses a Vite proxy so all API requests to `/api/*` are forwarded to the backend.

## API Endpoints

- `POST /api/signup` - register a new user
  - Request uses `multipart/form-data`
  - Fields: `firstName`, `lastName`, `userName`, `email`, `password`, `profileImage`
  - Response: new user object and auth cookie

- `POST /api/login` - authenticate a user
  - Request body: `{ email, password }`
  - Response: user object and auth cookie

- `GET /api/getuserdata` - get current user data
  - Requires valid JWT cookie
  - Response: authenticated user details

- `POST /api/logout` - clear auth cookie

## Client Notes

### Auth state flow

- `UserContext` holds `userData` and `serverUrl`
- On mount, it calls `getUserData()` to verify existing auth cookie
- The `Home` page is only accessible when `userData` is set

### Example request pattern

```js
const { data } = await axios.get('/api/getuserdata', {
  withCredentials: true,
})
```

This ensures the browser sends the auth cookie to the backend.

## Backend Notes

### Auth middleware

The `checkAuth` middleware reads the JWT token from `req.cookies.token`, verifies it with `JWT_SECRET`, and attaches `req.userId`.

### Login/signup cookie options

In development, cookies are set with:
- `httpOnly: true`
- `sameSite: 'none'`
- `secure: false` (only `true` in production)

This is required when the React app and backend run on different local ports.

## Troubleshooting

### `GET /api/getuserdata 400`

This usually means the request is missing a valid auth cookie or the backend returned a `400` error because the user is not authenticated.

### `Network Error` or `ERR_CONNECTION_REFUSED`

- Ensure the backend is running on `http://localhost:3000`
- Ensure the frontend is running on `http://localhost:5173`
- If using a browser extension, disable any proxy or blocklist that could interfere with localhost requests

### Cookie issues

- Verify `withCredentials: true` is enabled on Axios requests
- Make sure backend CORS is configured with `credentials: true`
- Make sure cookies are set with `sameSite: 'none'` in dev when frontend and backend are on different ports

## Example Usage

1. Register a new user on `/register`
2. After successful signup, the app navigates to `/home`
3. Login via `/login` if already registered
4. The protected page displays `Welcome, {firstName}` after auth

## Notes

- This repository is primarily an auth demo and can be extended with additional pages, role-based permissions, or refresh token flows.
- The backend uses MongoDB Atlas in `.env` but can be switched to a local MongoDB URI.
- Cloudinary image upload is optional; if no image is selected, registration still works.

---

If you want, I can also add a short section describing how to deploy this app to production. 
