import { Card } from './card.js'
import { FormValidator } from './formValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settings = {
  popupFormClass: '.popup__form',
  inputTypeErrorClass: 'popup__input_error',
  inputErrorActiveClass: 'error_visible',
  popupInputClass: '.popup__input',
  popupSubmitButtonClass: '.popup__submit-button',
  popupSubmitButtonDisabledClass: 'popup__submit-button_disabled'
}

const cardContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

// открытие попапа с картинкой
function handleCardClick() {
  popupImage.src = this.src;
  popupImage.alt = this.alt;
  popupCaption.textContent = this.alt;
openPopup(imagePopup);
}

function createCard(data) {
  const card = new Card(data, '#card-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

initialCards.forEach((item) => {
  cardContainer.append(createCard(item));
})

// добавление карточки
const addForm = document.querySelector('#add-form');
const placeInput = document.querySelector('#form-input-place');
const linkInput = document.querySelector('#form-input-link');

addForm.addEventListener('submit', function(event) {
  event.preventDefault();

  cardContainer.prepend(createCard({
    name: placeInput.value,
    link: linkInput.value
  }));

  addForm.reset();
  closePopup();
});

// Открытие попапа
const editPopup = document.querySelector('#edit_popup');
const addPopup = document.querySelector('#add_popup');
const imagePopup = document.querySelector('#image_popup');

const username = document.querySelector('.profile__username');
const subscription = document.querySelector('.profile__subscription');
const userNameInput = document.querySelector('#form-input-username');
const subscriptionInput = document.querySelector('#form-input-subscription');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  // добавляем слушалки
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('click', closeByOverlay);
}

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openEditPopup);

function openEditPopup() {
  userNameInput.value = username.textContent;
  subscriptionInput.value = subscription.textContent;
  openPopup(editPopup)
}

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddPopup);

function openAddPopup() {
  openPopup(addPopup);
}

// закрытие попапа
const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup()
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup()
  }
}

function closePopup() {
  const popupIsOpened = document.querySelector('.popup_opened');
  if (popupIsOpened) {
    popupIsOpened.classList.remove('popup_opened');
    // удаляем неактуальные слушалки
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('click', closeByOverlay);
  }
}

// редактирование имени/подписи
const editForm = document.querySelector('#edit-form');

function handleEditFormSubmit(event) {
  event.preventDefault();
  username.textContent = userNameInput.value;
  subscription.textContent = subscriptionInput.value;
  closePopup();
}

editForm.addEventListener('submit', handleEditFormSubmit);

// Валидация

const addingForm = document.querySelector('#add-form');
const editingForm = document.querySelector('#edit-form');

const addFormValidation = new FormValidator(settings, addingForm);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(settings, editingForm);
editFormValidation.enableValidation();






































