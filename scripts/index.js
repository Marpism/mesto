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
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__heading').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;

  // лайки
  const likeButton = cardElement.querySelector('.card__like-icon');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-icon_active');
  })

  // удаление карточки
  cardElement.querySelector('.card__bin-icon').addEventListener('click', () => {
    cardElement.remove();
  })

  // открытие попапа с картинкой
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', function() {
    popupImage.src = cardImage.src;
    popupCaption.textContent = cardImage.alt;
    popupImage.alt = cardImage.alt;
    openPopup(imagePopup)
  })

  return cardElement;
}


function renderInitialCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(initialCards[i].name, initialCards[i].link);
    
    cardContainer.append(cardElement);
  }}

renderInitialCards();

// добавление карточки
const placeInput = document.querySelector('#form-input-place');
const linkInput = document.querySelector('#form-input-link');
const addForm = document.querySelector('#add-form');

addForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const cardElement = createCard(placeInput.value, linkInput.value);
  cardContainer.prepend(cardElement);
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
  openPopup(addPopup)
  addForm.reset();
}

// закрытие попапа
const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closePopup()
  }
})

document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup()
  }
})

function closePopup() {
  const popupIsOpened = document.querySelector('.popup_opened');
  if (popupIsOpened) {
    popupIsOpened.classList.remove('popup_opened');
  }
};

// редактирование имени/подписи
const editForm = document.querySelector('#edit-form');

function handleEditFormSubmit(event) {
  event.preventDefault();
  username.textContent = userNameInput.value;
  subscription.textContent = subscriptionInput.value;
  closePopup();
}

editForm.addEventListener('submit', handleEditFormSubmit);

