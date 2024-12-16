# RobotAir-Robot-Fleet-Monitoring-Dashboard
# Robot Fleet Monitoring Dashboard

A real-time monitoring dashboard for managing robot fleets. This project uses **React**, **Vite**, and **FastAPI**, with periodic polling to fetch robot data every 5 seconds for real-time updates.

## Features

- **Robot Data Dashboard**: Displays robot status, location, and stats.
- **Real-Time Polling**: Periodically fetches updated robot data every 5 seconds.
- **Modular Components**:
  - **Robot List**: Shows details about individual robots.
  - **Robot Map**: Displays robot locations visually.
  - **Robot Stats**: Shows robot-specific statistics and metrics.

---

## Tech Stack

- **Frontend**:
  - React.js (via Vite for faster builds)
  - TailwindCSS (for modern, responsive UI design)
  - Polling mechanism for real-time data

- **Backend**:
  - FastAPI (mocking API responses in this example)
  - JSON data for simulating robot status
  - Hosted on Render.com (or any cloud service)

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **Python 3.9+**: [Download Python](https://www.python.org/)
- **Git**: [Download Git](https://git-scm.com/)

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/robot-fleet-monitoring.git
cd robot-fleet-monitoring
```

### 2. Backend Setup
Navigate to the backend folder to set up the FastAPI server.

``` bash
Copy code
cd backend
Install Python Dependencies
bash
Copy code
pip install -r requirements.txt
Run the Backend Server
bash
Copy code
uvicorn app.main:app --reload
By default, the server will run on http://localhost:8000.

3. Frontend Setup
Navigate to the frontend folder and install the required Node.js dependencies:

bash
Copy code
cd frontend
npm install
Start the Frontend Server
bash
Copy code
npm run dev
By default, the Vite development server will run on http://localhost:5173.

Project Structure
plaintext
Copy code
robot-fleet-monitoring/
├── backend/                   # Backend code (FastAPI)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # API routes and mock data
│   │   └── mock_data.json     # Mock JSON data for robots
│   └── requirements.txt       # Python dependencies
├── frontend/                  # Frontend code (React + Vite)
│   ├── public/                # Public assets
│   ├── src/                   # React app source code
│   │   ├── components/        # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RobotList.jsx
│   │   │   ├── RobotMap.jsx
│   │   │   └── RobotStats.jsx
│   │   ├── utils/             # Utility functions (e.g., WebSocket logic)
│   │   │   └── websocket.js
│   │   ├── App.jsx            # Main app entry point
│   │   └── index.jsx          # ReactDOM rendering
│   └── package.json           # Frontend dependencies
└── README.md                  # Project documentation
API Endpoints
Backend API (FastAPI)
GET /api/robots: Fetches the list of robots (mock data).
WebSocket /api/robots/ws: (Future enhancement) WebSocket endpoint for real-time updates.
Real-Time Updates with Polling
How Polling Works
App.jsx:

Sets an interval using setInterval to fetch updated robot data from the backend every 5 seconds.
Passes the updated data to the Dashboard component.
Dashboard Component:

Accepts the robot data as props and renders it using its child components (RobotList, RobotMap, RobotStats).
Running the Project
Follow these steps to run the project locally:

Start the Backend Server:

Navigate to the backend directory and run uvicorn app.main:app --reload.
The backend will be running on http://localhost:8000.
Start the Frontend Server:

Navigate to the frontend directory and run npm run dev.
The frontend will be running on http://localhost:5173.
View the Dashboard:

Open your browser and go to http://localhost:5173 to view the robot fleet monitoring dashboard.
Deployment
Frontend Deployment
Build the frontend for production:
bash
Copy code
npm run build
Deploy the generated dist folder to platforms like Netlify, Vercel, or GitHub Pages.
Backend Deployment
Deploy the FastAPI server to platforms like Render, AWS, Heroku, or any other cloud service.
Update the frontend fetch URL to point to the deployed backend.
Future Enhancements
WebSocket Integration: Replace polling with WebSocket for efficient real-time updates.
Authentication: Add user authentication for secure access to the dashboard.
Robot Control: Enable remote control of robots through the dashboard.
Enhanced UI: Add animations and detailed visualizations for better user experience.
Contributing
We welcome contributions! Here's how you can contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.
