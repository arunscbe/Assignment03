from groq import Groq
import os
from dotenv import load_dotenv
import base64
import uuid
load_dotenv()
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
def TextToAudio(prompt : str):
    response = client.audio.speech.create(
        model = "canopylabs/orpheus-v1-english",
        voice = "troy",
        input = prompt,
        response_format = "wav"
    )
    filename = f"{uuid.uuid4()}.wav"
    filepath = f"audio/{filename}"
    response.write_to_file(filepath)
    return {
        "audioUrl": f"/audio/{filename}"
    }
