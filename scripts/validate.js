const settings = {
  popupFormClass: '.popup__form',
  inputTypeErrorClass: 'popup__input_error',
  inputErrorActiveClass: 'error_visible',
  popupInputClass: '.popup__input',
  popupSubmitButtonClass: '.popup__submit-button',
  popupSubmitButtonDisabledClass: 'popup__submit-button_disabled'
}

// сделать поле красным и показать ошибку

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputTypeErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorActiveClass);
};

// убрать ошибку

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputTypeErrorClass);
  errorElement.classList.remove(settings.inputErrorActiveClass);
  errorElement.textContent = '';
};

// проверка валидности

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// установить слушалки

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.popupInputClass));
  const buttonElement = formElement.querySelector(settings.popupSubmitButtonClass);

  toggleButtonState(inputList, buttonElement, settings);
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, settings);
    }, 1);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

  // переключать кнопку

  function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.popupSubmitButtonDisabledClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(settings.popupSubmitButtonDisabledClass);
      buttonElement.removeAttribute("disabled");
    }
  }

    //  искать невалидные инпуты

    function hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    }

  // включить валидацию 

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.popupFormClass)); 
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
 };

   enableValidation(settings);