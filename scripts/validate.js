const settings = {
  inputTypeErrorClass: 'popup__input_error',
  inputErrorClassActive: 'error_visible'
}

// сделать поле красным и показать ошибку

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputTypeErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorClassActive);
};

// убрать ошибку

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputTypeErrorClass);
  errorElement.classList.remove(settings.inputErrorClassActive);
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
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  toggleButtonState(inputList, buttonElement);
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement);
    }, 1);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

  // переключать кнопку

  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__submit-button_disabled');
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove('popup__submit-button_disabled');
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
  const formList = Array.from(document.querySelectorAll('.popup__form')); 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
     evt.preventDefault();
   });
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
       evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  }); 
 }); 
 };

   enableValidation(settings);