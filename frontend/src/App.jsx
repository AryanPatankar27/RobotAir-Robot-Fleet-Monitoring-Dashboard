import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard'; 
import './index.css';

function App() {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    const fetchRobotsData = () => {
      
      fetch('https://robotair-robot-fleet-monitoring-k6x0.onrender.com/api/robots') 
        .then((response) => response.json())
        .then((data) => setRobots(data))
        .catch((error) => console.error('Error fetching robots:', error));
    };

    fetchRobotsData(); 

    
    const intervalId = setInterval(fetchRobotsData, 5000);

    
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Pass the robots data to the Dashboard component */}
      <Dashboard robots={robots} />
    </div>
  );
}

export default App;
