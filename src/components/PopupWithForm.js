import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor({ submitHandler }, PopupSelector) {
    super(PopupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submitHandler(evt)
    })
  }

  getInputValues() {
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