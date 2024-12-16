import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import './index.css';

function App() {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    const fetchRobotsData = () => {
      // Fetch the data from the backend API
      fetch('https://robotair-robot-fleet-monitoring-k6x0.onrender.com/api/robots') 
        .then((response) => response.json())
        .then((data) => setRobots(data))
        .catch((error) => console.error('Error fetching robots:', error));
    };

    fetchRobotsData(); // Initial fetch when the component mounts

    // Set up polling every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchRobotsData, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Pass the robots data to the Dashboard component */}
      <Dashboard robots={robots} />
    </div>
  );
}

export default App;
