import { Popup } from './Popup.js'

export class popupWithConfirm extends Popup {
  constructor({ submitHandler }, PopupSelector) {
    super(PopupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('#confirm-form');
    this._submitButton = this._popup.querySelector('.popup__submit-button');
  }

  setEventListeners() {
    super.setEventListeners();
  }

  deleteConfirm(card) {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(card);
    })
  }

  showLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Да'
    }
  }

  close() {
    super.close();
  }
}