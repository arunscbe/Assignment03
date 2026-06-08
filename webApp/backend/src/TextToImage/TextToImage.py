from huggingface_hub import InferenceClient
from dotenv import load_dotenv
from io import BytesIO
import base64
import os

load_dotenv()

client = InferenceClient(
    api_key=os.getenv("HF_Token")
)

def TextToImage(prompt: str):
    image = client.text_to_image(
        prompt,
        model="black-forest-labs/FLUX.1-schnell"
    )

    buffer = BytesIO()
    image.save(buffer, format="PNG")

    image_bytes = buffer.getvalue()
    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    print("base64 conversion complete")

    return {
        "success": True,
        "imageUrl": f"data:image/png;base64,{base64_image}"
    }