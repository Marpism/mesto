export class Popup {
  constructor(PopupSelector) {
    this._popup = document.querySelector(PopupSelector); 
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }, true);
    document.removeEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    }, true);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close()
      }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }, true);
    document.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    }, true);
  }
}



