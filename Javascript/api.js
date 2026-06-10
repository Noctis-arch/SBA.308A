import { API_KEY } from "./key.js";

const BASE_URL = "https://api.thedogapi.com/v1";

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json"
};

export async function getDogImages(page = 0, limit = 12) {
  const response = await fetch(
    `${BASE_URL}/images/search?limit=${limit}&page=${page}&order=ASC`,
    {
      headers
    }
  );

  if (!response.ok) {
    throw new Error("Could not load dog photos.");
  }

  const images = await response.json();
  return images;
}

export async function likeDogImage(imageId) {
  const response = await fetch(`${BASE_URL}/votes`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      image_id: imageId,
      value: 1
    })
  });

  if (!response.ok) {
    throw new Error("Could not like this photo.");
  }

  const data = await response.json();
  return data;
}