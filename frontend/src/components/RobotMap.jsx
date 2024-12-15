import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet library

// Fix for default marker icon to avoid issues with missing default icon image
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const RobotMap = ({ robots }) => {
  const defaultCenter = [40.7128, -74.0060]; // Default center (e.g., NYC)
  const locations = robots.map((robot) => robot["Location Coordinates"]);
  const mapCenter =
    locations.length > 0
      ? [locations[0][0], locations[0][1]] // Use the first robot's location as the map center
      : defaultCenter;

  return (
    <div className="h-[500px] w-full">
      <h2 className="text-xl font-semibold mb-4">Robot Locations</h2>
      <div className="h-full w-full rounded-lg overflow-hidden">
        <MapContainer
          center={mapCenter} // Dynamically set center
          zoom={13} // Zoom level of the map
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {robots.length > 0 ? (
            robots.map((robot) =>
              robot["Location Coordinates"] &&
              robot["Location Coordinates"].length === 2 ? (
                <Marker
                  key={robot["Robot ID"]}
                  position={robot["Location Coordinates"]}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-bold">
                        Robot {robot["Robot ID"].slice(0, 8)}
                      </h3>
                      <p>Battery: {robot["Battery Percentage"]}%</p>
                      <p>Status: {robot["Online/Offline"] ? "Online" : "Offline"}</p>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )
          ) : (
            <p>No robots data available</p>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default RobotMap;
