import { getDogs, searchBreeds } from "./api.js";
import { displayDogs, showMessage } from "./ui.js";

const dogContainer = document.getElementById("dogContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadBtn = document.getElementById("loadBtn");
const message = document.getElementById("message");

// Checkpoint 7: Load dogs button

async function loadDogs() {
  try {
    showMessage(message, "Loading dogs...");

    const dogs = await getDogs(6);

    displayDogs(dogs, dogContainer);

    showMessage(message, "");
  } catch (error) {
    showMessage(message, error.message);
  }
}
