# Live Coding Session: NestJS Backend & Next.js Frontend with Tailwind CSS

## Overview
This repository is designed for a live coding session covering both backend (NestJS) and frontend (Next.js) development. The session will focus on implementing a feature to reassign a payment from one customer to another. The backend will be built using NestJS, and the frontend will be developed using Next.js with Tailwind CSS and TypeScript.

## Backend: NestJS
### Features Included in the Boilerplate:
1. **Authentication**: Login and Signup endpoints using JWT strategy.
2. **Customer Management**: CRUD operations for managing customers.
3. **Payment Management**:
   - List of payments.
   - Adding a new payment.
  
### Feature to Implement: Reassign Payment
- Create an endpoint to reassign a payment from one customer to another.
- Validate the request:
  - Payment ID must exist.
  - Source and Target Customer IDs must exist.
- Update the payment record with the new customer.
- Return the updated payment details in the response.
- Write a test case for the "Reassign Payment" feature covering:
  - Successful reassignment.
  - Handling non-existent payment IDs.
  - Error handling for invalid customer IDs.

### API Endpoints
1. **Authentication**
   - `POST /auth/signup` – Sign up a new user.
   - `POST /auth/login` – Log in an existing user.

2. **Customers**
   - `GET /customers` – List all customers.
   - `POST /customers` – Add a new customer.
   - `PUT /customers/:id` – Update a customer.
   - `DELETE /customers/:id` – Delete a customer.

3. **Payments**
   - `GET /payments` – List all payments.
   - `POST /payments` – Add a new payment.
   - `PUT /payments/reassign` – Reassign a payment from one customer to another. *(This endpoint will be implemented during the live coding session)*

### Running the Backend
1. Clone the repository and navigate to the `backend` folder:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm run start
   ```

4. The application will be available at `http://localhost:3000`.

### Testing
Run the test suite using:
```bash
npm run test
```

## Frontend: Next.js + Tailwind CSS + TypeScript
### Features Included in the Boilerplate:
1. **Customer List**: View all customers.
2. **Payment List**: View all payments.
3. **Add Payment Form**: Form to add a new payment.

### Feature to Implement: Payment Reassignment UI
- **Objective**: Implement the UI to allow reassigning a payment from one customer to another.
- **Steps**:
  1. Create a button or dropdown in the Payment List UI labeled **"Reassign Payment"**.
  2. On click, open a modal to select a new customer.
  3. Confirm and call the backend endpoint (`PUT /payments/reassign`).
  4. On success, update the payment list.

### Running the Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:3001`.

## Folder Structure
```
root
├── backend
│   ├── src
│   │   ├── auth
│   │   ├── customers
│   │   ├── payments
│   │   └── ...
│   └── test
├── frontend
│   ├── components
│   ├── pages
│   ├── public
│   └── styles
└── README.md
```

## Setup Instructions for the Live Session
1. **Environment Setup**:
   - Ensure Node.js is installed.
   - Make sure to have MongoDB or PostgreSQL (depending on your configuration) running.

2. **Session Flow**:
   - Start with the backend boilerplate.
   - Have the candidate implement the `reassignPayment` endpoint in the NestJS Payments service.
   - Test the feature using the provided test cases.

3. **Frontend Implementation**:
   - Show the existing pages and components.
   - Guide the candidate through adding a button for reassigning a payment and the corresponding modal.

4. **Time Management**:
   - Allocate approximately 20 minutes for the backend and 25 minutes for the frontend.

## Final Notes

The following are the criterias for judgment
1. Database atomocity
2. Concurrency

Other things to take note of:

- Focus on clean code and good practices.
- Feel free to ask questions and get clarification on requirements.
- Take your time to understand the existing code structure before jumping into implementation.

Enjoy the session! 🎉

## License
This project is licensed under the MIT License.

---

Let me know if you'd like any changes or additional details for the README!