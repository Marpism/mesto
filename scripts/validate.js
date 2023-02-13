// сделать поле красным и показать ошибку

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('error_visible');
};

// убрать ошибку

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('error_visible');
  errorElement.textContent = '';
}

// проверка валидности

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// установить слушалки

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// включить валидацию 

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form')); 
  formList.forEach((formElement) => {
   formElement.addEventListener('submit', (evt) => {
     evt.preventDefault();
   });
   const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));
   fieldsetList.forEach((fieldset) => {
     setEventListeners(fieldset);
   });
 }); 
 };

   enableValidation();

  //  искать невалидные инпуты

   function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  }

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
