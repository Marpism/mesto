export class Card {
  constructor({ data, handleCardClick }, templateSelector, api, userData, confirmPopup) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._id = data._id;
    this._userId = data.owner._id;
    this._ownerId = userData._id;
    this._confirmPopup = confirmPopup;
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
    const likeCounter = this._element.querySelector('.card__counter');
    likeCounter.textContent = this._likes.length;
    this._element.querySelector('.card__heading').textContent = this._name;

    if(!(this._userId === this._ownerId)) {
      this._element.querySelector('.card__bin-icon').style.display = 'none';
    }
    this._setEventListeners()
    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.card__like-icon');
    const cardImage = this._element.querySelector('.card__image');
    const deleteButton = this._element.querySelector('.card__bin-icon');

    likeButton.addEventListener('click', () => this._toggleLike(), true);
    cardImage.addEventListener('click', () => {this._handleCardClick({ 
      name: this._name,
      src: this._link })});
  }

  _toggleLike() {
    const likeButton = this._element.querySelector('.card__like-icon');
    const likeCounter = this._element.querySelector('.card__counter');

    if(likeButton.classList.contains('card__like-icon_active')) {
      this._api.removeLike(this._id)
      .then((data) => {
        likeButton.classList.remove('card__like-icon_active')
        likeCounter.textContent = data.likes.length})
    } else {
      this._api.putLike(this._id)
      .then((data) => {
        likeButton.classList.add('card__like-icon_active')
        likeCounter.textContent = data.likes.length})
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}


