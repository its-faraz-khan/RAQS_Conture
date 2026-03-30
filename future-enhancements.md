# Future Enhancements

This document turns the current project review into a small-module roadmap so improvements can be completed step by step instead of as one large refactor.

Review basis:
- Storefront and admin production builds pass.
- Lint currently fails in both frontend apps.
- No automated tests were found.
- Several features are partly built in code but not finished end to end.

## Suggested Working Order

Work on these in this order if you want the biggest impact first:

1. Finish password reset and account recovery.
2. Make checkout totals and stock updates safe on the backend.
3. Replace hardcoded local configuration with environment-based config.
4. Complete real payment integration.
5. Turn wishlist into a full customer feature with real restock alerts.
6. Improve order tracking and order details.
7. Add admin tooling for subscribers and reporting.
8. Clean lint issues and introduce tests.

## Current Incomplete Functionality

These are the biggest gaps that look incomplete right now:

- Forgot password UI exists as a navigation target, but the route and working backend endpoints are not fully wired.
- OTP-based password reset handlers exist, but the OTP model is missing and the routes are not exposed.
- Checkout uses a frontend-calculated order amount instead of recalculating it on the backend.
- Stock validation and stock deduction are not transactional, so concurrent orders can oversell products.
- Payment flow is structured as if more methods were planned, but only COD is actually supported.
- Wishlist add flow exists, but wishlist management and restock notification delivery are not finished.
- "Track Order" currently just refreshes the orders list.
- Admin can fetch newsletter subscribers through the API, but there is no admin UI for them.
- Storefront API URLs and backend MongoDB connection are still hardcoded for localhost.
- Linting and testing are not yet part of the development safety net.

## Module 1: Password Reset And Account Recovery

Priority: `P0`

Why this matters:
- Users can click "Forgot your password?" but cannot complete the flow.
- This creates a broken path in a core auth area.

### Module 1.1: Create OTP persistence

Goal:
- Add an OTP model with expiry support.

Tasks:
- Create `backend/models/otpModel.js`.
- Store email, otp, created time, and expiry time.
- Add automatic expiry behavior using TTL if you want MongoDB to clean old OTPs.

Acceptance:
- OTP records can be created, read, and removed.
- Expired OTPs are rejected.

### Module 1.2: Expose password reset routes

Goal:
- Wire backend reset handlers into the user routes.

Tasks:
- Add routes for sending reset OTP.
- Add routes for verifying OTP.
- Add routes for resetting password.
- Validate input shape and return clear API messages.

Likely files:
- `backend/routes/userRoute.js`
- `backend/controllers/userController.js`

Acceptance:
- All three endpoints are reachable from the API.
- Invalid email, invalid OTP, and weak password cases are handled cleanly.

### Module 1.3: Build forgot-password frontend flow

Goal:
- Give users working screens for reset recovery.

Tasks:
- Add a `/forgot-password` route in the storefront.
- Create a page to request OTP by email.
- Create a page or stepper to verify OTP and set a new password.
- Handle loading states, success states, and resend behavior.

Likely files:
- `frontend/src/App.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/ForgotPassword.jsx`

Acceptance:
- User can request OTP, verify it, and successfully set a new password from the storefront.

### Module 1.4: Harden recovery flow

Goal:
- Make recovery safe enough for real usage.

Tasks:
- Add resend cooldown.
- Prevent reset if OTP was never verified.
- Avoid logging OTPs in production.
- Consider rate limiting per email or IP.

Acceptance:
- Recovery works reliably and does not leak sensitive information.

## Module 2: Secure Checkout And Inventory

Priority: `P0`

Why this matters:
- Order totals should never be trusted from the frontend.
- Stock updates should be consistent even under repeated or concurrent orders.

### Module 2.1: Recalculate totals on the backend

Goal:
- Compute the full order amount server-side.

Tasks:
- Ignore or validate the amount sent by the client.
- Re-fetch product prices from the database.
- Apply valid discounts on the backend only.
- Add delivery fee logic on the backend.

Likely files:
- `backend/controllers/orderController.js`
- `backend/controllers/productController.js`
- `frontend/src/pages/PlaceOrder.jsx`

Acceptance:
- Backend returns the final trusted amount.
- Price tampering from the browser cannot change what gets stored.

### Module 2.2: Make stock deduction safe

Goal:
- Prevent overselling when two users order the same item close together.

Tasks:
- Use atomic stock updates or a transaction.
- Reject order creation if stock changed after validation.
- Consider moving stock validation and order creation into a single transaction.

Acceptance:
- Two overlapping checkouts cannot push stock below zero.

### Module 2.3: Improve order data quality

Goal:
- Store cleaner, more complete order information.

Tasks:
- Save a normalized order snapshot for each item.
- Decide whether `country` should be required, optional, or removed from admin display.
- Validate phone, email, and address on the backend too.

Acceptance:
- Orders remain readable even if product data changes later.
- Admin order display is consistent with storefront input.

## Module 3: Environment And Deployment Readiness

Priority: `P0`

Why this matters:
- The app will break outside local development unless config is cleaned up.

### Module 3.1: Move storefront API URLs to env

Goal:
- Remove hardcoded `localhost` usage from the storefront.

Tasks:
- Replace the hardcoded backend URL in `frontend/src/context/ShopContext.jsx`.
- Replace the hardcoded newsletter URL in `frontend/src/components/NewsLetterBox.jsx`.
- Add and document `frontend/.env` usage.

Acceptance:
- Storefront can point to local, staging, or production API through env config only.

### Module 3.2: Use `MONGODB_URI` in the backend

Goal:
- Make DB connection deployment-friendly.

Tasks:
- Replace hardcoded MongoDB connection in `backend/config/mongodb.js`.
- Validate missing env values early on startup.

Acceptance:
- Backend can connect using environment configuration without code edits.

### Module 3.3: Add startup safety checks

Goal:
- Fail fast if critical env vars are missing.

Tasks:
- Validate `JWT_SECRET`, email credentials, Cloudinary values, and DB URI.
- Print actionable startup errors.

Acceptance:
- Local setup issues are obvious and easier to debug.

## Module 4: Real Payment Integration

Priority: `P1`

Why this matters:
- Payment method structure already exists, but only COD actually works.
- Stripe is already installed in the backend, and Razorpay/Stripe assets are present in the frontend.

### Module 4.1: Choose one payment provider first

Recommended:
- Start with Stripe or Razorpay, not both together.

Tasks:
- Pick one provider.
- Define whether COD stays enabled as a second method.

Acceptance:
- Payment scope is clear before implementation starts.

### Module 4.2: Backend payment intent/order flow

Goal:
- Support a real online checkout path.

Tasks:
- Create payment order/session endpoint.
- Verify payment result through webhook or server verification.
- Mark `paymentMethod` and `payment` correctly in order records.

Acceptance:
- Paid orders are distinguishable from COD orders.

### Module 4.3: Frontend payment UI

Goal:
- Let users choose and complete a supported payment option.

Tasks:
- Show payment method choices in `PlaceOrder`.
- Launch provider checkout only after backend returns trusted order/payment data.
- Add success and failure handling.

Acceptance:
- A full paid order can be created from the storefront.

## Module 5: Wishlist And Restock Notifications

Priority: `P1`

Why this matters:
- The project already hints at a stronger wishlist experience, but only the add flow is visible.

### Module 5.1: Add a real wishlist page

Goal:
- Let customers view and manage their saved items.

Tasks:
- Add storefront route for wishlist.
- Fetch wishlist items from the backend.
- Allow remove action.
- Show stock state and quick links back to product pages.

Likely files:
- `frontend/src/App.jsx`
- `frontend/src/pages/Wishlist.jsx`
- `frontend/src/components/NavBar.jsx`

Acceptance:
- Users can see everything they saved and remove items they no longer want.

### Module 5.2: Connect restock notifications to stock changes

Goal:
- Actually notify customers when an out-of-stock item returns.

Tasks:
- After stock is updated from zero to available, find matching wishlist entries with `notifyOnRestock`.
- Send email notifications.
- Optionally mark records as notified to avoid repeated sends.

Likely files:
- `backend/controllers/productController.js`
- `backend/controllers/wishlistController.js`
- `backend/models/wishlistModel.js`

Acceptance:
- Restock emails are triggered when eligible items are replenished.

### Module 5.3: Improve wishlist product quality

Goal:
- Make saved items more useful.

Tasks:
- Populate product details for wishlist results.
- Handle deleted products cleanly.
- Show duplicate-prevention message in a nicer way on the frontend.

Acceptance:
- Wishlist data is usable without extra manual lookups.

## Module 6: Order Tracking And Customer Order Details

Priority: `P1`

Why this matters:
- Customers can see statuses, but "Track Order" is only a refresh button.

### Module 6.1: Create order detail pages

Goal:
- Give each order its own detail view.

Tasks:
- Store or expose order IDs clearly in the storefront.
- Add a customer order detail route.
- Show address, amount, payment, items, and status history.

Acceptance:
- Clicking an order leads to a real detail screen.

### Module 6.2: Replace placeholder tracking action

Goal:
- Make tracking feel real.

Tasks:
- Rename the button if it only opens details.
- Or add actual shipment tracking fields such as courier and tracking number.

Acceptance:
- Users are not misled by a non-functional tracking action.

### Module 6.3: Add order status timeline UI

Goal:
- Make order progress clearer than plain text.

Tasks:
- Show stages like placed, packed, shipped, out for delivery, delivered.
- Highlight current stage visually.

Acceptance:
- Order progress is readable at a glance.

## Module 7: Admin Improvements

Priority: `P2`

Why this matters:
- The admin app handles products and orders, but there are still useful gaps.

### Module 7.1: Subscriber management page

Goal:
- Surface newsletter subscribers in the admin UI.

Tasks:
- Add a page for subscriber listing.
- Fetch `/api/subscription/list`.
- Add copy/export actions if useful.

Acceptance:
- Admin can view all subscribers from the dashboard.

### Module 7.2: Better order operations

Goal:
- Make admin order handling more practical.

Tasks:
- Add search and filters by status or date.
- Add pagination if order volume grows.
- Consider adding notes, courier, and tracking fields.

Acceptance:
- Admin can manage larger order volume comfortably.

### Module 7.3: Product editing

Goal:
- Go beyond add, remove, stock, and discount updates.

Tasks:
- Add full product edit screen for name, description, category, price, sizes, and images.

Acceptance:
- Admin can correct product data without deleting and recreating items.

## Module 8: Quality, Testing, And Cleanup

Priority: `P2`

Why this matters:
- You already have a working app, but quality tooling is what makes it safer to grow.

### Module 8.1: Clean existing lint issues

Goal:
- Get both frontend apps to a clean lint state.

Tasks:
- Remove unused `React` imports.
- Add prop validation or migrate to TypeScript later.
- Fix hook dependency warnings.
- Remove dead or unused components like `PrivateRoute` if not needed.

Acceptance:
- `npm run lint` passes in `frontend` and `admin`.

### Module 8.2: Add test coverage for critical flows

Goal:
- Protect the most important behavior first.

Recommended first tests:
- user register/login
- password reset
- add to cart / update cart
- place order
- admin login
- product add / stock update / discount update

Acceptance:
- Core buying and admin flows have at least smoke-level coverage.

### Module 8.3: Improve error handling and logging

Goal:
- Make debugging easier in production.

Tasks:
- Replace loose `console.log` usage with structured logging where it matters.
- Standardize API error responses.
- Avoid exposing sensitive internals in auth and email flows.

Acceptance:
- Errors are easier to trace and safer to expose.

## Nice-To-Have Enhancements After Core Work

These are useful, but not urgent compared to the modules above:

- customer account profile page
- saved addresses
- coupon or promo codes
- order cancellation before shipment
- product reviews and ratings
- image optimization and lazy loading
- dashboards for sales, stock, and low-inventory alerts
- root workspace scripts for running all apps together

## Best Next Work

If you want the cleanest small-module path, start here:

### Sprint 1

- Module 1.1: OTP model
- Module 1.2: reset routes
- Module 1.3: forgot password frontend

Outcome:
- Auth flows stop feeling broken.

### Sprint 2

- Module 2.1: backend order total calculation
- Module 2.2: safe stock deduction
- Module 3.1: move storefront URLs to env
- Module 3.2: use `MONGODB_URI`

Outcome:
- Checkout becomes safer and deployment becomes much easier.

### Sprint 3

- Module 4.1: choose payment provider
- Module 4.2: backend payment flow
- Module 4.3: frontend payment UI

Outcome:
- Project moves beyond COD-only checkout.

### Sprint 4

- Module 5.1: wishlist page
- Module 5.2: real restock emails
- Module 6.1: order details page
- Module 6.2: replace fake tracking button

Outcome:
- Customer experience becomes more complete and polished.

### Sprint 5

- Module 7.1: subscriber admin page
- Module 7.2: admin order filters
- Module 8.1: lint cleanup
- Module 8.2: first test suite

Outcome:
- Project becomes easier to manage and safer to maintain.

## Simple Rule For What To Build First

Use this rule when choosing the next task:

- Fix broken user paths before adding new features.
- Move security and data integrity work ahead of UI polish.
- Finish half-built features before starting brand new ones.
- Add tests right after stabilizing a core flow.
