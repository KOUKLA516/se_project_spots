// Initial Cards Data
const initialCards = [
  { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" },
];

// DOMContentLoaded to ensure the DOM is fully loaded before the script runs
document.addEventListener("DOMContentLoaded", () => {
  // Card Template and List
  const cardTemplate = document.querySelector("#card-template");
  const cardsList = document.querySelector(".cards__list");

  // Profile Elements
  const profileEditButton = document.querySelector(".profile__edit-btn");
  const cardModalBtn = document.querySelector(".profile__add-btn");
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  // Modal Elements
  const editModal = document.querySelector("#edit-modal");
  const editFormElement = editModal.querySelector(".modal__form");
  const editModalNameInput = editModal.querySelector("#profile-name-input");
  const editModalDescriptionInput = editModal.querySelector("#profile-description-input");
  const editSubmitBtn = editModal.querySelector(".modal__submit-btn");
  const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

  // Card Modal Elements
  const cardModal = document.querySelector("#add-card-modal");
  const cardForm = cardModal.querySelector(".add-card-form");
  const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
  const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
  const cardNameInput = cardModal.querySelector("#add-card-name-input");
  const cardLinkInput = cardModal.querySelector("#add-card-link-input");

  // Preview Modal Elements
  const previewModal = document.querySelector("#preview-modal");
  const previewModalImageEl = previewModal.querySelector(".modal__image");
  const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
  const previewModalCloseBtn = previewModal.querySelector(".modal__close-button");

  // Utility functions for modals
  function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleKeydown);
    modal.addEventListener("mousedown", handleOverlayClick);
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleKeydown);
    modal.removeEventListener("mousedown", handleOverlayClick);
  }

  function handleKeydown(evt) {
    if (evt.key === "Escape") {
      const openModals = document.querySelectorAll(".modal_opened");
      openModals.forEach((modal) => closeModal(modal));
    }
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(evt.target);
    }
  }

  // Generate a card
  function getCardElement(data) {
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

    const cardNameEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardLikeBtn = cardElement.querySelector(".card__like-btn");

    cardNameEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

    cardLikeBtn.addEventListener("click", () => {
      cardLikeBtn.classList.toggle("card__like-btn_liked");
    });

    cardImageEl.addEventListener("click", () => {
      openModal(previewModal);
      previewModalImageEl.src = data.link;
      previewModalImageEl.alt = data.name;
      previewModalCaptionEl.textContent = data.name;
    });

    const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
    cardDeleteBtn.addEventListener("click", () => {
      cardElement.remove();
    });

    return cardElement;
  }

  // Form Submit: Profile Edit
  function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileDescription.textContent = editModalDescriptionInput.value;
    closeModal(editModal);
  }

  // Form Submit: Add Card
  function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
    const cardEl = getCardElement(inputValues);
    cardsList.prepend(cardEl);
    cardForm.reset();
    closeModal(cardModal);
  }

  // Event Listeners
  profileEditButton.addEventListener("click", () => {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
    openModal(editModal);
  });

  editModalCloseBtn.addEventListener("click", () => {
    closeModal(editModal);
  });

  cardModalBtn.addEventListener("click", () => {
    openModal(cardModal);
  });

  cardModalCloseBtn.addEventListener("click", () => {
    closeModal(cardModal);
  });

  editFormElement.addEventListener("submit", handleEditFormSubmit);
  cardForm.addEventListener("submit", handleAddCardSubmit);

  previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });

  // Render Initial Cards
  initialCards.forEach((item) => {
    const cardEl = getCardElement(item);
    cardsList.append(cardEl);
  });
});
