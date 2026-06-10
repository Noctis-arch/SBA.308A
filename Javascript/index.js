import { getBreeds, getBreedImages, likeDogImage } from "./api.js";
import {
  fillBreedSelect,
  displayBreedInfo,
  displayImages,
  showMessage
} from "./ui.js";

const breedSelect = document.getElementById("breedSelect");
const likeBtn = document.getElementById("likeBtn");
const message = document.getElementById("message");
const breedInfo = document.getElementById("breedInfo");
const gallery = document.getElementById("gallery");

let allBreeds = [];
let currentImages = [];

async function loadBreeds() {
  try {
    showMessage(message, "Loading breeds...");

    allBreeds = await getBreeds();

    fillBreedSelect(allBreeds, breedSelect);

    await loadSelectedBreed();

    showMessage(message, "");
  } catch (error) {
    showMessage(message, error.message);
  }
}

async function loadSelectedBreed() {
  try {
    const selectedBreedId = breedSelect.value;

    const selectedBreed = allBreeds.find((breed) => {
      return breed.id === selectedBreedId;
    });

    if (!selectedBreed) {
      return;
    }

    showMessage(message, "Loading breed photos...");

    displayBreedInfo(selectedBreed, breedInfo);

    currentImages = await getBreedImages(selectedBreedId, 6);

    displayImages(currentImages, gallery);

    likeBtn.disabled = currentImages.length === 0;

    showMessage(message, "");
  } catch (error) {
    showMessage(message, error.message);
  }
}

async function handleLike() {
  try {
    if (currentImages.length === 0) {
      showMessage(message, "There is no image to like yet.");
      return;
    }

    await likeDogImage(currentImages[0].id);

    showMessage(message, "Dog image liked!");
  } catch (error) {
    showMessage(message, error.message);
  }
}

breedSelect.addEventListener("change", loadSelectedBreed);
likeBtn.addEventListener("click", handleLike);

loadBreeds();