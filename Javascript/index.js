import { getDogs, searchBreeds } from "./api.js";
import { displayDogs, showMessage } from "./ui.js";

const dogContainer = document.getElementById("dogContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadBtn = document.getElementById("loadBtn");
const message = document.getElementById("message");

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

async function handleSearch() {
  try {
    const searchText = searchInput.value.trim();

    if (searchText === "") {
      showMessage(message, "Please enter a dog breed.");
      return;
    }

    showMessage(message, "Searching...");

    const dogs = await searchBreeds(searchText);

    if (dogs.length === 0) {
      dogContainer.innerHTML = "";
      showMessage(message, "No breeds found.");
      return;
    }

    displayDogs(dogs, dogContainer);

    showMessage(message, "");
  } catch (error) {
    showMessage(message, error.message);
  }
}

searchBtn.addEventListener("click", handleSearch);
loadBtn.addEventListener("click", loadDogs);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});


