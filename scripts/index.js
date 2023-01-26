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

function renderInitialCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__heading').textContent = initialCards[i].name;
    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__image').alt = initialCards[i].name;
    cardContainer.append(cardElement);
  }}
  renderInitialCards()

// добавление карточки
const placeInput = document.querySelector('#form-input-place');
const linkInput = document.querySelector('#form-input-link');
const addForm = document.querySelector('#add-form');

function createCard(event) {
  event.preventDefault();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__heading').textContent = placeInput.value;
  cardElement.querySelector('.card__image').src = linkInput.value;
  cardElement.querySelector('.card__image').alt = placeInput.value;
  cardContainer.prepend(cardElement);
  closePopup()
}

addForm.addEventListener('submit', createCard);

// удаление карточки
const trashButtons = document.querySelectorAll('.card__bin-icon');

trashButtons.forEach((button) => {
  const card = button.closest('.card');
  button.addEventListener('click', () => {
    card.remove();
  });
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

const cardImage = document.querySelectorAll('.card__image');
  for (let i = 0; i < cardImage.length; i++) {
    cardImage[i].addEventListener('click', function() {
      popupImage.src = cardImage[i].src;
      popupCaption.textContent = cardImage[i].alt;
      popupImage.alt = cardImage[i].alt;
      openPopup(imagePopup)
    })
  }

// закрытие попапа
const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

  function closePopup() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
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




























// Лайки 
const likeButtons = document.querySelectorAll('.card__like-icon');

  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function() {
      likeButtons[i].classList.toggle('card__like-icon_active');
    })
  }