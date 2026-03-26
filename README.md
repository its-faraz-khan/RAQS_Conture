# ClassyShop

ClassyShop is a full-stack MERN e-commerce project with three separate apps:

- `frontend` for the customer storefront
- `admin` for product and order management
- `backend` for the API, authentication, uploads, and database access

The project is built with React, Vite, Tailwind CSS, Express, MongoDB, and Mongoose.

## Highlights

- Customer-facing storefront with product browsing, product detail pages, cart, checkout, and order history
- Admin dashboard for adding products, managing inventory, updating discounts, and reviewing orders
- User authentication and admin authentication
- Wishlist and cart APIs
- Newsletter subscription flow
- Cloudinary-based image upload support in the backend

## Project Apps

| App | Purpose | Default local URL |
| --- | --- | --- |
| `frontend` | Customer storefront | `http://localhost:5173` |
| `admin` | Admin panel | `http://localhost:5174` |
| `backend` | Express API server | `http://localhost:4000` |

## Tech Stack

- Frontend: React, React Router, Axios, React Toastify, Tailwind CSS, Vite
- Admin: React, React Router, Axios, React Toastify, Tailwind CSS, Vite
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer, Cloudinary, Nodemailer

## Repository Structure

```text
ClassyShop/
|-- admin/
|-- backend/
|-- frontend/
|-- README.md
```

## Getting Started

### Prerequisites

Make sure you have these installed before running the project:

- Node.js 18+
- npm
- MongoDB running locally

### 1. Clone the repository

```bash
git clone https://github.com/its-faraz-khan/ClassyShop.git
cd ClassyShop
```

### 2. Create environment files

This repository ignores local `.env` files. Use the example files as a starting point:

```bash
copy backend\.env.example backend\.env
copy admin\.env.example admin\.env
copy frontend\.env.example frontend\.env
```

Then replace the placeholder values with your own credentials and local URLs.

### 3. Install dependencies

Install packages separately for each app:

```bash
cd backend
npm install
cd ..

cd frontend
npm install
cd ..

cd admin
npm install
cd ..
```

### 4. Start the apps

Open three terminals and run:

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Admin:

```bash
cd admin
npm run dev
```

## Environment Variables

### `backend/.env`

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used for signing JWT tokens |
| `ADMIN_EMAIL` | Admin login email and sender email for mail flows |
| `ADMIN_PASSWORD` | Admin login password |
| `EMAIL_PASSWORD` | App password used by Nodemailer |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET_KEY` | Cloudinary API secret |

### `admin/.env`

| Variable | Purpose |
| --- | --- |
| `VITE_BACKEND_URL` | Base URL for the backend API used by the admin panel |

### `frontend/.env`

| Variable | Purpose |
| --- | --- |
| `VITE_BACKEND_URL` | Intended backend API base URL for the storefront |

## Scripts

### `backend`

- `npm run dev` starts the backend with Nodemon
- `npm start` starts the backend with Node

### `frontend`

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run preview` previews the build locally
- `npm run lint` runs ESLint

### `admin`

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run preview` previews the build locally
- `npm run lint` runs ESLint

## API Areas

The backend exposes these route groups:

- `/api/user` for user registration, login, and admin login
- `/api/product` for product CRUD-style operations, stock updates, and discount updates
- `/api/cart` for cart add, update, and fetch operations
- `/api/order` for placing orders, listing user orders, listing all orders, and updating order status
- `/api/wishlist` for wishlist add, fetch, and remove operations
- `/api/subscription` for newsletter subscriptions and subscriber listing

## Important Notes

- `.env` files are ignored by git. Do not commit real credentials, API keys, email passwords, or admin credentials.
- The backend currently connects to local MongoDB in `backend/config/mongodb.js`. If you want to use `MONGODB_URI` from `.env`, update that file before deployment.
- The admin panel already reads `VITE_BACKEND_URL` from `admin/.env`.
- The storefront still contains hardcoded local backend references in `frontend/src/context/ShopContext.jsx` and `frontend/src/components/NewsLetterBox.jsx`. Update those values or refactor them to use `VITE_BACKEND_URL` before production deployment.
- `backend/vercel.json` is included for backend deployment on Vercel.

## Suggested Local Workflow

1. Start MongoDB locally.
2. Start the backend on port `4000`.
3. Start the storefront on port `5173`.
4. Start the admin panel on port `5174`.
5. Log in to the admin panel, add products, then test the storefront flow.

## Future Improvements

- Move all frontend API URLs to environment variables
- Use `MONGODB_URI` directly in the backend database config
- Add a root workspace script for running all apps together
- Add automated tests for core user and admin flows
