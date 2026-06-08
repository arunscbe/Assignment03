import api from "./api";

// export const imageToText = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return api.post("/api/image/text", formData);
// };
export const imageToText = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch("http://localhost:8000/api/image/text", {
    method: "POST",
    body: formData,
  });

  console.log("status:", response.status);
  console.log("ok:", response.ok);

  const data = await response.json();

  console.log("data:", data);

  return data;
};
export const textToImage = async (prompt) => {
  return api.post("/api/text/image", { prompt });
};

export default {
  imageToText,
  textToImage,
};
