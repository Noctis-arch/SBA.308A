import { getDogImages, likeDogImage } from "./api.js";
import { displayImages, updatePageText, showMessage } from "./ui.js";

const gallery = document.getElementById("gallery");
const message = document.getElementById("message");
const pageText = document.getElementById("pageText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPage = 0;

async function loadPage() {
  try {
    showMessage(message, "Loading dog photos...");

    prevBtn.disabled = true;
    nextBtn.disabled = true;

    const images = await getDogImages(currentPage, 12);

    displayImages(images, gallery, handleLikePhoto);
    updatePageText(pageText, currentPage);

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = false;

    showMessage(message, "");
  } catch (error) {
    showMessage(message, error.message);
  }
}

async function handleLikePhoto(imageId, button) {
  try {
    await likeDogImage(imageId);

    button.textContent = "Liked";
    button.disabled = true;

    showMessage(message, "Dog photo liked!");
  } catch (error) {
    showMessage(message, error.message);
  }
}

function goToNextPage() {
  currentPage += 1;
  loadPage();
}

function goToPreviousPage() {
  if (currentPage > 0) {
    currentPage -= 1;
    loadPage();
  }
}

nextBtn.addEventListener("click", goToNextPage);
prevBtn.addEventListener("click", goToPreviousPage);

loadPage();