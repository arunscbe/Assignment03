from groq import Groq
import os
from dotenv import load_dotenv
load_dotenv()
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
async def AudioToText(file):
    audio_bytes = await file.read()
    transcription = client.audio.transcriptions.create(
        file=(file.filename, audio_bytes),
        model="whisper-large-v3-turbo"
    )
    print(transcription.text)
    return {
        "transcription": transcription.text
    }