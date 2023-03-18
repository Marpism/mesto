class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    cardImage.alt = this._name;
    this._element.querySelector('.card__heading').textContent = this._name;
    this._setEventListeners()

    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.card__like-icon');
    const cardImage = this._element.querySelector('.card__image');
    const deleteButton = this._element.querySelector('.card__bin-icon');

    likeButton.addEventListener('click', this._toggleLike);

    cardImage.addEventListener('click', () => {this._handleCardClick({ 
      name: this._name,
      src: this._link })});
      
    deleteButton.addEventListener('click', this._deleteCard);
  }

  _toggleLike() {
    this.classList.toggle('card__like-icon_active');
  }

  _deleteCard() {
    this.closest('.card').remove()
  }
}

export { Card }

