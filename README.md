# E-commerce Backend

Production-ready e-commerce backend built with Node.js, Express, MongoDB, and Mongoose using MVC architecture.

## Features

- Authentication and authorization with JWT
- Role-based access control (`admin`, `user`)
- Refresh token support
- Product management with pagination, filtering, sorting, and search
- Cart management: add, update, remove, clear
- Order management with status tracking and payment mock implementation
- Reviews and ratings on products
- Admin dashboard APIs for user and order management
- Security middleware: helmet, rate limiting, data sanitization, CORS
- Swagger API documentation
- File uploads for product images

## Project Structure

- `config/` - database configuration
- `controllers/` - request handlers
- `models/` - Mongoose schemas
- `routes/` - API routes
- `middlewares/` - authentication, validation, error handling
- `services/` - business logic layer
- `validators/` - request validators
- `utils/` - reusable utilities
- `app.js` - Express app configuration
- `server.js` - server bootstrap

## Setup

1. Clone or copy the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file from `.env.example`

```bash
cp .env.example .env
```

4. Start MongoDB locally or set `MONGODB_URI`
5. Run in development mode

```bash
npm run dev
```

6. Open API docs

- `http://localhost:5000/api-docs`

## API Endpoints

Base path: `/api/v1`

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /auth/logout`
- `GET /products`
- `POST /products` (admin)
- `GET /products/:id`
- `PUT /products/:id` (admin)
- `DELETE /products/:id` (admin)
- `POST /products/:productId/reviews`
- `PUT /products/:productId/reviews/:reviewId`
- `DELETE /products/:productId/reviews/:reviewId`
- `GET /cart`
- `POST /cart/:productId`
- `DELETE /cart/:productId`
- `DELETE /cart`
- `POST /orders`
- `GET /orders/mine`
- `GET /orders/:id`
- `PUT /orders/:id/status` (admin)
- `GET /orders` (admin)
- `GET /users/me`
- `PUT /users/me`
- `GET /users` (admin)
- `GET /admin/analytics` (admin)

## Testing

Run tests with:

```bash
npm test
```
