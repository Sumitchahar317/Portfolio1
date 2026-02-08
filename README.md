# ME-API Portfolio Project

This is a MERN stack application (MongoDB, Express, React/Vanilla JS, Node.js) for your personal portfolio.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: HTML5, Vanilla CSS (Dark Mode, Glassmorphism), JavaScript
- **Features**: 
  - Profile Management (CRUD)
  - Project Filtering by Skill
  - Responsive Design
  - Liveness Check (/health)

## Project Structure
- `backend/`: Server logic, models, controllers, routes.
- `frontend/`: Static frontend files (served by backend).
- `seed.js`: Script to populate database with initial data.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configuration**
   Ensure MongoDB is running locally on default port (27017).
   The `.env` file is configured to use port 5001 to avoid conflicts with macOS AirPlay (Control Center).

3. **Seed Database**
   Since you have already edited `backend/seed.js` with your real data, run:
   ```bash
   node backend/seed.js
   ```

4. **Run Application**
   ```bash
   node backend/server.js
   ```
   Or use `nodemon` for development:
   ```bash
   npx nodemon backend/server.js
   ```

5. **Access the App**
   Open your browser and visit:
   [http://localhost:5001](http://localhost:5001)

## API Endpoints
- `GET /api/profile`: Get profile details
- `GET /api/projects?skill=React`: Filter projects
- `POST /api/profile`: Create profile (if clean DB)
- `PUT /api/profile`: Update profile
- `GET /health`: Server health check
