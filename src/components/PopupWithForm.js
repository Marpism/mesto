import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor({ submitHandler }, PopupSelector) {
    super(PopupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__submit-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues())
    })
  }

  showLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранить'
    }
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(inputElement => {
      this._inputValues[inputElement.name] = inputElement.value;
    })
    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }
}