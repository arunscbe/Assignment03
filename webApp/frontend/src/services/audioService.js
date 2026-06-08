import api from "./api";

export const audioToText = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/api/audio/text", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const textToAudio = async (text) => {
  const response = await api.post("/api/text/audio", {
    prompt: text,
  });
  return response.audioUrl;
};

export default {
  audioToText,
  textToAudio,
};
