class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(data.popupSubmitButtonClass);
    this._inputList = Array.from(formElement.querySelectorAll(data.popupInputClass));
    this._popupFormClass = data.popupFormClass;
    this._inputTypeErrorClass = data.inputTypeErrorClass;
    this._inputErrorActiveClass = data.inputErrorActiveClass;
    this._popupInputClass = data.popupInputClass;
    this._popupSubmitButtonClass = data.popupSubmitButtonClass;
    this._popupSubmitButtonDisabledClass = data.popupSubmitButtonDisabledClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputTypeErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorActiveClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputTypeErrorClass);
    errorElement.classList.remove(this._inputErrorActiveClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    this._disableSubmitButton();
    })
  }

  _disableSubmitButton() {
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 1);
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._popupSubmitButtonDisabledClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._popupSubmitButtonDisabledClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export { FormValidator }