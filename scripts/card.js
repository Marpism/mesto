class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    // // НОВЫЕ
    // this._popupImage = document.querySelector('.popup__image');
    // this._popupCaption = document.querySelector('.popup__image-caption');
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
    this._setEventListeners()

    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.card__like-icon');
    const cardImage = this._element.querySelector('.card__image');
    const deleteButton = this._element.querySelector('.card__bin-icon');

    likeButton.addEventListener('click', this._toggleLike);
    cardImage.addEventListener('click', this._handleCardClick, true);

    deleteButton.addEventListener('click', this._deleteCard);
  }

  _toggleLike() {
    this.classList.toggle('card__like-icon_active');
  }

  _deleteCard() {
    this.closest('.card').remove()
  }

  // _handleImageClick() {
  //   const popupImage = document.querySelector('.popup__image');
  //   popupImage.src = this.src;
  //   popupImage.alt = this.alt;
  //   document.querySelector('.popup__image-caption').textContent = this.alt;
  //   this._handleCardClick(this.name, this.link);
  // }

  // _setImageListeners() {
  //   // const cardImage = this._element.querySelector('.card__image');
  //   cardImage.addEventListener('click', () => {
      // this._popupImage.src = cardImage.src;
      // this._popupCaption.textContent = cardImage.alt;
      // this._popupImage.alt = cardImage.alt;
      // this._openImagePopup();
  //   })
  // }

  // _openImagePopup() {
  //   const imagePopup = document.querySelector('#image_popup'); 
  //   imagePopup.classList.add('popup_opened');
  // }


}

export { Card }

