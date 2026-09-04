from fastapi import FastAPI,Request
from starlette.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import json
import os
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Pixel Battle")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

clients_accepts = []
file_path = os.path.join(os.path.dirname(__file__),"repository","data_pixels.json")

@app.websocket("/ws")  
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients_accepts.append(websocket)
    with open(file_path, 'r+', encoding ='utf-8') as file:
        data_json = json.load(file)
        for dat in data_json:
            await websocket.send_json(dat)
    
    try:
        while True: 
            object = await websocket.receive_json()
            for client in clients_accepts:
                if client != websocket:
                    await client.send_json(object)
            
            with open(file_path, 'r+', encoding='utf-8') as file:
                try:
                    data = json.load(file)
                except json.JSONDecodeError:
                    data = []
                
                found = False
                for i, obj in enumerate(data):
                    if obj.get('id') == info_id(object):
                        data[i] = object
                        found = True
                        break
                
                if not found:
                    data.append(object) 

                with open(file_path, 'w', encoding ='utf-8') as file:
                    json.dump(data, file, indent = 5, ensure_ascii = False)

    except WebSocketDisconnect:
        if websocket in clients_accepts:
            clients_accepts.remove(websocket)
            print("Клиент disconnected") 
        

def info_id(object):
    return object.get('id')
        

@app.get("/")
async def main():
    return RedirectResponse(url="/main_page")

@app.get("/main_page")
async def pixel_draw(request: Request):
    return templates.TemplateResponse(request,"pixel_draw.html")

