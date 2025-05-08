🛒 Mini E-Commerce Platform
A simple mini e-commerce platform with product submission and listing.
Frontend (React) + Backend (Node.js/Express) + PostgreSQL (Neon database).

🚀 Setup Instructions
1. Clone the repository
```bash
git clone https://github.com/your-username/workfission_assgn.git
cd workfission_assgn
```
2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside backend/ folder:
```bash
DATABASE_URL=your-neon-database-connection-string
```

Start the backend server:

```bash
npx nodemon server.js
```
✅ Your backend will run on http://localhost:5000

3. Frontend Setup
```bash
cd frontend
npm install
```

Edit API_URL at frontend\src\services\api.js with http://localhost:5000

Start the React app:

```bash
npm run dev
```
✅ Your frontend will run on http://localhost:5173


🎯 What's Working
✨ Product Submission Form (with name, description, price, image URL)

✨ Product Listing Page (grid view with search functionality)

✨ Real-time Search using Fuse.js (fuzzy search)

✨ Loading Spinner while fetching products

✨ "No Products Found" message if search yields no results

✨ Dark Mode / Light Mode Toggle

✨ Responsive UI (mobile + desktop)

✨ Live Notifications using react-hot-toast

🛠️ Tech Stack
Frontend: React.js, TailwindCSS

Backend: Node.js, Express.js

Database: PostgreSQL (hosted on Neon)

Deployment: Render
