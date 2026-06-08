from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
import base64
import os
load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY_02")
)

def ImageToText(image_bytes):
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")
    message = HumanMessage(
    content=[
            {
                "type": "text",
                "text": "give me the details about in the image, should not exceeds 100 words"
            },
            {
                "type": "image_url",
                "image_url": f"data:image/jpeg;base64,{image_base64}"
            }
        ]
    )
    response = llm.invoke([message])
    return {'message' : response.content}