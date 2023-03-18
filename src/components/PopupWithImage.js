import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(data) {
    super.open();
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupCaption.textContent = data.name;
  }
}