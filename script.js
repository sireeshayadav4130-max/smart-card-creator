const titleInput = document.getElementById("title-input");
const categorySelect = document.getElementById("category-select");
const previewCard = document.getElementById("preview-card");
const previewTitle = document.getElementById("preview-title");
const previewCategory = document.getElementById("preview-category");
const addButton = document.getElementById("add-btn");
const cardList = document.getElementById("card-list");
const cardCount = document.getElementById("card-count");
const emptyState = document.getElementById("empty-state");

// Update the preview title while the user types.
titleInput.addEventListener("input", (event) => {
  previewTitle.textContent = event.target.value.trim() || "Your Title Here";
});

// Update the preview category and its background colour.
categorySelect.addEventListener("change", (event) => {
  const category = event.target.value;
  previewCategory.textContent = `Category: ${category}`;
  previewCard.className = `preview-box ${category}`;
});

// Create and save a card.
addButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const category = categorySelect.value;

  if (!title) {
    titleInput.focus();
    previewTitle.textContent = "Please enter a title";
    return;
  }

  const card = document.createElement("div");
  card.classList.add("card", category);
  card.setAttribute("data-type", category);

  const details = document.createElement("div");
  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;

  const cardCategory = document.createElement("p");
  cardCategory.classList.add("card-category");
  cardCategory.textContent = `Category: ${category}`;

  details.appendChild(cardTitle);
  details.appendChild(cardCategory);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";

  // Remove this card when its Delete button is clicked.
  deleteButton.addEventListener("click", () => {
    card.remove();
    updateCardCount();
  });

  card.appendChild(details);
  card.appendChild(deleteButton);
  cardList.appendChild(card);

  titleInput.value = "";
  previewTitle.textContent = "Your Title Here";
  titleInput.focus();
  updateCardCount();
});

function updateCardCount() {
  const total = cardList.querySelectorAll(".card").length;
  cardCount.textContent = `${total} ${total === 1 ? "card" : "cards"}`;
  emptyState.hidden = total > 0;
}
