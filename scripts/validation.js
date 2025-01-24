const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (errorMsgEl) {
    errorMsgEl.textContent = errorMsg; // Set the error message
    errorMsgEl.classList.add("modal__error_visible"); // Make the error visible
    inputEl.classList.add("modal__input_type_error"); // Add red border
  }
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (errorMsgEl) {
    errorMsgEl.textContent = ""; // Clear the error message
    errorMsgEl.classList.remove("modal__error_visible"); // Hide the error
    inputEl.classList.remove("modal__input_type_error"); // Remove red border
  }
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__button");

  // button
const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    // add a modifier class to the buttonElement to make it grey
    // don't forget the css
    else {
      buttonElement.disabled = false;
      // remove the disabled class
    }
  }
};

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formEl, inputElement);
      if (typeof toggleButtonState === "function") {
        toggleButtonState(inputList, buttonElement);
      }
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();