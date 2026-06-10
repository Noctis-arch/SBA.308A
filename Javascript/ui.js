export function fillBreedSelect(breeds, selectElement) {
  selectElement.innerHTML = "";

  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;

    selectElement.appendChild(option);
  });
}

export function displayBreedInfo(breed, infoElement) {
  infoElement.innerHTML = `
    <h2>${breed.name}</h2>
    <p><strong>Temperament:</strong> ${breed.temperament || "Not listed"}</p>
    <p><strong>Life Span:</strong> ${breed.life_span || "Not listed"}</p>
    <p><strong>Weight:</strong> ${breed.weight?.imperial || "N/A"} lbs</p>
    <p><strong>Height:</strong> ${breed.height?.imperial || "N/A"} inches</p>
    <p><strong>Bred For:</strong> ${breed.bred_for || "Not listed"}</p>
  `;
}

export function displayImages(images, galleryElement) {
  galleryElement.innerHTML = "";

  if (images.length === 0) {
    galleryElement.innerHTML = "<p>No images found for this breed.</p>";
    return;
  }

  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("photo-card");

    card.innerHTML = `
      <img src="${image.url}" alt="Dog breed image">
    `;

    galleryElement.appendChild(card);
  });
}

export function showMessage(messageElement, text) {
  messageElement.textContent = text;
}