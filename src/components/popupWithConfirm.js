import { Popup } from './Popup.js'

export class popupWithConfirm extends Popup {
  constructor({ submitHandler }, PopupSelector) {
    super(PopupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('#confirm-form');
    this._submitButton = this._popup.querySelector('.popup__submit-button');
  }

  setEventListeners(card) {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(card);
    })
  }

  showLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранить'
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}