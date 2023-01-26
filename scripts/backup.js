
// Открытие/закрытие попапов
const editPopup = document.querySelector('#edit_popup');
const addPopup = document.querySelector('#add_popup');
const username = document.querySelector('.profile__username');
const subscription = document.querySelector('.profile__subscription');
const userNameInput = document.querySelector('#form-input-username');
const subscriptionInput = document.querySelector('#form-input-subscription');

function openEditPopup() {
  userNameInput.value = username.textContent;
  subscriptionInput.value = subscription.textContent;
  editPopup.classList.add('popup_opened');
  setTimeout(() => {
    editPopup.style.opacity = '1';
  }, 10);
}

function openAddPopup() {
  addPopup.classList.add('popup_opened');
  setTimeout(() => {
    addPopup.style.opacity = '1';
  }, 10);
}

function openImagePopup() {
  imagePopup.classList.add('popup_opened');
  setTimeout(() => {
    imagePopup.style.opacity = '1';
  }, 10);
}

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openEditPopup);

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddPopup);

function closeIt() {
  document.querySelector('.popup_opened')
	  document.querySelector('.popup_opened').classList.remove('popup_opened');
  };

// редактирование имени/подписи
const editForm = document.querySelector('#edit-form');

function popupSubmit(event) {
  event.preventDefault();
  username.textContent = userNameInput.value;
  subscription.textContent = subscriptionInput.value;
  closeIt();
}

editForm.addEventListener('submit', popupSubmit);

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
// const imagePopup = document.querySelector('#image_popup');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

function update() {
  cardContainer.innerHTML = '';
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__heading').textContent = initialCards[i].name;
    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__image').alt = initialCards[i].name;
    // назначаем индексы корзинам через data 
    cardElement.querySelector('.card__bin-icon').dataset.index = i;
    cardContainer.append(cardElement);
  }

  // Попап с картинкой
  const cardImage = document.querySelectorAll('.card__image');
  for (let i = 0; i < cardImage.length; i++) {
    cardImage[i].addEventListener('click', function() {
      popupImage.src = cardImage[i].src;
      popupCaption.textContent = cardImage[i].alt;
      openImagePopup()
    })
  }

  // лайки
  const likeButtons = document.querySelectorAll('.card__like-icon');

  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function() {
      likeButtons[i].classList.toggle('card__like-icon_active');
    })
  }

  // удаление карточки
  const binButtons = document.querySelectorAll('.card__bin-icon');
  for (let i = 0; i < binButtons.length; i++) {
    binButtons[i].addEventListener('click', function() {
      initialCards.splice(binButtons[i].dataset.index, 1);
      update()
    })
  }  
}
update()

// Добавление карточки 
const placeInput = document.querySelector('#form-input-place');
const linkInput = document.querySelector('#form-input-link');
const addForm = document.querySelector('#add-form');

function addCard(event) {
  event.preventDefault();
  initialCards.unshift(
    {
      name: placeInput.value,
      link: linkInput.value
    }
  )
  update()
  closeIt()
}

addForm.addEventListener('submit', addCard);