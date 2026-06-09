export function displayDogs(dogs, container) {
  container.innerHTML = "";

  dogs.forEach((dog) => {
    const breed = dog.breeds[0];

    const card = document.createElement("div");
    card.classList.add("dog-card");

    card.innerHTML = `
      <img src="${dog.url}" alt="${breed?.name || "Dog"}">
      <h3>${breed?.name || "Unknown Breed"}</h3>
      <p><strong>Temperament:</strong> ${breed?.temperament || "Not listed"}</p>
      <p><strong>Life Span:</strong> ${breed?.life_span || "Not listed"}</p>
      <p><strong>Weight:</strong> ${breed?.weight?.imperial || "N/A"} lbs</p>
    `;

    container.appendChild(card);
  });
}

export function showMessage(messageElement, text) {
  messageElement.textContent = text;
}