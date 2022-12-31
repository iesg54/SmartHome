import asyncio
import websockets
import json

CONNECTIONS = {}

async def handler(websocket):
    async for message in websocket:
        event = json.loads(message)
        print(f"Received: {event}")

        if event["type"] == "alert":
            websocket = CONNECTIONS.get("react")
            if websocket:
                await websocket.send(json.dumps(event))
        elif event["type"] == "react":
            CONNECTIONS["react"] = websocket

async def main():
    async with websockets.serve(handler, "server", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())