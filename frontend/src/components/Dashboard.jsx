import React, { useState, useEffect } from "react";
import RobotList from "./RobotList";
import RobotMap from "./RobotMap";
import RobotStats from "./RobotStats";
import { WebSocketService } from "../utils/websocket"; // Import WebSocketService

const Dashboard = ({ robots }) => {
  const [error, setError] = useState(null); // State for error handling
  const [updatedRobots, setUpdatedRobots] = useState(robots); // Store updated robots

  const handleNewRobotData = (newData) => {
    // Update robots state if the data has changed
    setUpdatedRobots((prevRobots) => {
      if (JSON.stringify(newData) !== JSON.stringify(prevRobots)) {
        return newData;
      }
      return prevRobots; // Don't update if data is the same
    });
  };

  useEffect(() => {
    const wsService = new WebSocketService("wss://robotair-robot-fleet-monitoring-k6x0.onrender.com/ws");
    wsService.connect(handleNewRobotData); // Handle new robot data

    return () => {
      wsService.disconnect(); // Cleanup WebSocket on unmount
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
          <RobotList robots={updatedRobots} />
        </div>

        {/* Robot Map */}
        <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto">
          <RobotMap robots={updatedRobots} />
        </div>

        {/* Robot Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 lg:col-span-2">
          <RobotStats robots={updatedRobots} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
