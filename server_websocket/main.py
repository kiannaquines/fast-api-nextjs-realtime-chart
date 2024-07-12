import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio
from datetime import datetime
from utils.ConnectionManager import manager
import random
import pytz

ph_timezone = pytz.timezone("Asia/Manila")
app = FastAPI()

app.add_middleware(
     CORSMiddleware,
     allow_origins=["*"],
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"],
)

@app.websocket("/dashboard-chart")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        start_time = datetime.now(tz=ph_timezone)
        while True:
            data = {
                "time": start_time.strftime("%I:%M %S %p").lower(),
                "count": random.randint(0, 50)
            }
            await manager.send_personal_message(json.dumps(data), websocket)
            await asyncio.sleep(5) 
    except WebSocketDisconnect:
            manager.disconnect(websocket)
            print(f"Connection aborted!")
             

@app.get("/health")
async def health_check():
    return {"status": "Server is running!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
