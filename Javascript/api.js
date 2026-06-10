import { API_KEY } from "./key.js";

const BASE_URL = "https://api.thedogapi.com/v1";

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json"
};

export async function getBreeds() {
  const response = await fetch(`${BASE_URL}/breeds`, {
    headers
  });

  if (!response.ok) {
    throw new Error("Could not load dog breeds.");
  }

  const breeds = await response.json();
  return breeds;
}

export async function getBreedImages(breedId, limit = 6) {
  const response = await fetch(
    `${BASE_URL}/images/search?breed_ids=${breedId}&limit=${limit}`,
    {
      headers
    }
  );

  if (!response.ok) {
    throw new Error("Could not load dog images.");
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
    throw new Error("Could not like this dog image.");
  }

  const data = await response.json();
  return data;
}