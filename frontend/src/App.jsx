import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import './index.css';

function App() {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    // Fetch the data from the backend API
    fetch('http://localhost:8000/api/robots') // Replace with the correct backend URL
      .then((response) => response.json())
      .then((data) => setRobots(data))
      .catch((error) => console.error('Error fetching robots:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Pass the robots data to the Dashboard component */}
      <Dashboard robots={robots} />
    </div>
  );
}

export default App;
