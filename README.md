Requirements

Node.js (v16 or above)

MongoDB (local or cloud - e.g. MongoDB Atlas)

npm (or yarn)

Installation Steps

Navigate to backend folder:

cd backend

Install dependencies:

npm install

or

yarn install

Environment Variables:

Create a .env file in backend/ with the following variables:

PORT=4000
DB_URL=mongodb://localhost:27017/wanderlustTours
JWT_SECRET=secrtjwtslskdgg
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@wanderlust.com
ADMIN_PASSWORD=adminPassword123
MONGO_DB_URL=mongodb+srv://wanderlust:k43IWjSwk2uHy5eB@wanderlusttours.ezai1qf.mongodb.net/wanderlustTours

Replace your_mongodb_connection_string with your MongoDB URI.
Replace your_secret_key with any strong random string.

Run the backend server:

npm run dev

It uses nodemon for automatic server reloads.
Backend API will be available at http://localhost:4000/api

🔍 Important Notes

Uploads:

Uploaded package images are saved inside backend/public/uploads.

Ensure that the /public/uploads folder exists.

Authentication:

JWT tokens are used.

Users must login/signup to access protected routes (e.g. Bookings).

Admin Role:

Admins can access /admin panel.

Normal users can only view packages and manage their bookings.

🌟 Available Scripts

Frontend:

npm start - run React app in development mode

Backend:

npm run dev - run Node.js backend with nodemon