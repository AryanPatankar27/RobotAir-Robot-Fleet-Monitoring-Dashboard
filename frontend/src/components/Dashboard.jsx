import React, { useState, useEffect } from "react";
import RobotList from "./RobotList";
import RobotMap from "./RobotMap";
import RobotStats from "./RobotStats";
import { WebSocketService } from "../utils/websocket"; // Import WebSocketService

const Dashboard = () => {
  const [robots, setRobots] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  const handleNewRobotData = (newData) => {
    // Update robots state with new data
    setRobots((prevRobots) => {
      // Only update if the data has changed
      if (JSON.stringify(newData) !== JSON.stringify(prevRobots)) {
        return newData.robots; // Extract robots data from the WebSocket message
      }
      return prevRobots;
    });
  };

  useEffect(() => {
    // Connect to WebSocket server
    const wsService = new WebSocketService("wss://robotair-robot-fleet-monitoring-k6x0.onrender.com/api/robots/ws");
    wsService.connect(handleNewRobotData); // Handle new robot data via WebSocket

    // Fetch initial robots data via HTTP
    const fetchInitialData = async () => {
      try {
        const response = await fetch("https://robotair-robot-fleet-monitoring-k6x0.onrender.com/api/robots");
        const data = await response.json();
        setRobots(data.robots); // Set initial robots data
      } catch (error) {
        console.error("Error fetching robots:", error);
        setError("Error fetching robots data");
      }
    };

    fetchInitialData(); // Fetch initial data

    return () => {
      wsService.disconnect(); // Cleanup WebSocket connection on unmount
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Fleet Monitoring Dashboard</h1>
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Robot List */}
        <div className="bg-white rounded-lg shadow-md">
          <RobotList robots={robots} />
        </div>

        {/* Robot Map */}
        <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto">
          <RobotMap robots={robots} />
        </div>

        {/* Robot Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 lg:col-span-2">
          <RobotStats robots={robots} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
