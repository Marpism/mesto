
// Открытие/закрытие попапов
let popup = document.querySelector('.popup');
let username = document.querySelector('.profile__username');
let subscription = document.querySelector('.profile__subscription');
let userNameInput = document.querySelector('#form-input-username');
let subscriptionInput = document.querySelector('#form-input-subscription');

function popupOpen() {
  userNameInput.value = username.textContent;
  subscriptionInput.value = subscription.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', popupOpen);

// редактирование имени/подписи
let form = document.querySelector('form');

function popupSubmit(event) {
  event.preventDefault();
  username.textContent = userNameInput.value;
  subscription.textContent = subscriptionInput.value;
  popupClose()
}

form.addEventListener('submit', popupSubmit);

// рендеринг карточек
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

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__heading').textContent = initialCards[i].name;
  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardContainer.append(cardElement);
}

// лайки
const likeButtons = document.querySelectorAll('.card__like-icon');

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function() {
    this.classList.toggle('card__like-icon_active');
  })
}