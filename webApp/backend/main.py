from fastapi import FastAPI , UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.TextToText.TextToText import TextToText
from src.TextToImage.TextToImage import TextToImage
from src.ImageToText.ImageToText import ImageToText
from src.AudioToText.AudioToText import AudioToText
from src.TextToAudio.TextToAudio import TextToAudio
from fastapi.staticfiles import StaticFiles
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount(
    "/audio",
    StaticFiles(directory="audio"),
    name="audio"
)

class ChatRequest(BaseModel):
    prompt: str

@app.post('/api/text/image')
def text_image(request : ChatRequest):
    return TextToImage(request.prompt)

@app.post('/api/text/chat')
def text_chat(request: ChatRequest):
    return TextToText(request.prompt)

@app.post("/api/image/text")
async def image_text(file: UploadFile = File(...)):
    image_bytes = await file.read()
    return ImageToText(image_bytes)

@app.post("/api/audio/text")
async def audio_text(file: UploadFile = File(...)):
    return await AudioToText(file) 

@app.post("/api/text/audio")
def text_audio(request : ChatRequest):
    return TextToAudio(request.prompt)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
