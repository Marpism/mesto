class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    this._element.querySelector('.card__heading').textContent = this._name;
    cardImage.alt = this._name;

    this._setLikeListeners()

    this._setImageListeners()

    this._setDeleteListeners()

    return this._element;
  }

  _setLikeListeners() {
    const likeButton = this._element.querySelector('.card__like-icon');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-icon_active');
  })
  }

  _setImageListeners() {
    const popupImage = document.querySelector('.popup__image');
    const cardImage = this._element.querySelector('.card__image');
    const popupCaption = document.querySelector('.popup__image-caption');
    cardImage.addEventListener('click', () => {
      popupImage.src = cardImage.src;
      popupCaption.textContent = cardImage.alt;
      popupImage.alt = cardImage.alt;
      super.openPopup(imagePopup);
    })
  }

  _setDeleteListeners() {
    this._element.querySelector('.card__bin-icon').addEventListener('click', () => {
      this._element.remove();
    })
  }
}

export { Card }