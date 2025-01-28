document.addEventListener("DOMContentLoaded", () => {
  // Initial Cards Data
  const initialCards = [
    { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
    { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
    { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
    { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
    { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
    { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" },
  ];

  // DOM Elements
  const cardTemplate = document.querySelector("#card-template");
  const cardsList = document.querySelector(".cards__list");

  const profileEditButton = document.querySelector(".profile__edit-btn");
  const cardModalBtn = document.querySelector(".profile__add-btn");
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  const editModal = document.querySelector("#edit-modal");
  const editFormElement = editModal.querySelector(".modal__form");
  const editModalNameInput = editModal.querySelector("#profile-name-input");
  const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

  const cardModal = document.querySelector("#add-card-modal");
  const cardForm = cardModal.querySelector(".add-card-form");
  const cardNameInput = cardModal.querySelector("#add-card-name-input");
  const cardLinkInput = cardModal.querySelector("#add-card-link-input");

  const previewModal = document.querySelector("#preview-modal");
  const previewModalImageEl = previewModal.querySelector(".modal__image");
  const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

  // Utility functions for modals
  const openModal = (modal) => {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleKeydown);
    modal.addEventListener("mousedown", handleOverlayClick);
  };

  const closeModal = (modal) => {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleKeydown);
    modal.removeEventListener("mousedown", handleOverlayClick);
  };

  const handleKeydown = (evt) => {
    if (evt.key === "Escape") {
      const openModals = document.querySelectorAll(".modal_opened");
      openModals.forEach((modal) => closeModal(modal));
    }
  };

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(evt.target);
    }
  };

  // Generate a card
  const getCardElement = (data) => {
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
  };

  // Initialize cards on page load
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.append(cardElement);
  });

  // Form Submit: Profile Edit
  const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileDescription.textContent = editModalDescriptionInput.value;
    closeModal(editModal);
  };

  // Form Submit: Add Card
  const handleAddCardSubmit = (evt) => {
    evt.preventDefault();
    const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };

    if (!/^https?:\/\/.+/.test(cardLinkInput.value)) {
      alert("Please enter a valid URL.");
      return;
    }

    const cardEl = getCardElement(inputValues);
    cardsList.prepend(cardEl);
    cardForm.reset();
    closeModal(cardModal);
  };

  // Event listeners for profile and card modals
  if (profileEditButton) {
    profileEditButton.addEventListener("click", () => {
      openModal(editModal);
      editModalNameInput.value = profileName.textContent;
      editModalDescriptionInput.value = profileDescription.textContent;
    });
  }

  if (cardModalBtn) {
    cardModalBtn.addEventListener("click", () => {
      openModal(cardModal);
    });
  }

  if (editFormElement) {
    editFormElement.addEventListener("submit", handleEditFormSubmit);
  }

  if (cardForm) {
    cardForm.addEventListener("submit", handleAddCardSubmit);
  }
});
