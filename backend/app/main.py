from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio
import os

# Initialize the FastAPI application
app = FastAPI()

# Enable CORS (adjust "allow_origins" for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock data (ensure mock_data.json exists in the same directory as main.py)
ROBOT_DATA = []
mock_data_path = os.path.join(os.path.dirname(__file__), "mock_data.json")
if os.path.exists(mock_data_path):
    with open(mock_data_path, "r") as f:
        ROBOT_DATA = json.load(f)
else:
    print(f"Warning: {mock_data_path} not found. Using empty data.")

@app.get("/api/robots")
async def get_robots():
    """
    API endpoint to return the robot data.
    """
    return ROBOT_DATA

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time robot data updates.
    """
    await websocket.accept()
    try:
        while True:
            # Simulate periodic updates (you can replace this with actual logic)
            for robot in ROBOT_DATA:
                if robot["battery"] > 0:
                    robot["battery"] -= 5  # Decrease battery as an example
                    robot["status"] = "low battery" if robot["battery"] < 20 else "active"
            await websocket.send_json(ROBOT_DATA)  # Send updated data
            await asyncio.sleep(5)  # Update every 5 seconds
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
