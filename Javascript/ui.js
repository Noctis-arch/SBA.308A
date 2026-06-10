export function displayImages(images, galleryElement, likeCallback) {
  galleryElement.innerHTML = "";

  if (images.length === 0) {
    galleryElement.innerHTML = "<p>No dog photos found.</p>";
    return;
  }

  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("photo-card");

    card.innerHTML = `
      <img src="${image.url}" alt="Dog photo">
      <p><strong>Image ID:</strong> ${image.id}</p>
      <button class="like-btn">Like Photo</button>
    `;

    const likeBtn = card.querySelector(".like-btn");

    likeBtn.addEventListener("click", () => {
      likeCallback(image.id, likeBtn);
    });

    galleryElement.appendChild(card);
  });
}

export function updatePageText(pageTextElement, pageNumber) {
  pageTextElement.textContent = `Page ${pageNumber + 1}`;
}

export function showMessage(messageElement, text) {
  messageElement.textContent = text;
}