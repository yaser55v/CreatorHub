# CreatorHub Backend

This is the backend server for the CreatorHub social media platform.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a .env file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/creator-hub
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   FRONTEND_URL=http://localhost:5173
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/verify/:token - Verify email address

### Users

- GET /api/users/me - Get current user profile
- PUT /api/users/me - Update user profile

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
  "message": "Error message here",
  "stack": "Error stack trace (development only)"
}
```

## Security

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers

## Development

- Uses ESM modules
- Nodemon for development
- Winston for logging
- Express for routing
- Mongoose for MongoDB interaction