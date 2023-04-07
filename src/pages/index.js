import '../pages/index.css';
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { popupWithConfirm } from '../components/popupWithConfirm';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { settings,
         cardContainerSelector,
         usernameInput, 
         subscriptionInput
        } from '../utils/constants.js'


// API

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '62a6a409-566c-4db1-acd2-6b8f5ba8a526',
    'Content-Type': 'application/json'
  }
});


// Профиль пользователя

const userInfo = new UserInfo({
  name: '.profile__username',
  about: '.profile__subscription',
  avatar: '.profile__photo'
});


// Карточки

const createCard = (data, userId) => {
  const card = new Card(
    { data: data, 
    handleCardClick: () => 
      imagePopup.open(data), // открытие попапа с картинкой
    }
  , '#card-template', api, userId, confirmPopup);
    const cardElement = card.createCard();
    return cardElement;
}

const cardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item, userId);
    cardList.setItem(cardElement);
  }}, cardContainerSelector);


//После получения данных с сервера

let userId;

api.getAllData()
.then(( [cards, userData] ) => {
  // console.log(cards)
  userId = userData._id;
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);

  cardList.renderItems(cards);
})
.catch((err) => console.log(err));


// Попапы

const imagePopup = new PopupWithImage('#image_popup');
imagePopup.setEventListeners();

const addPopup = new PopupWithForm(
  {
  submitHandler: (values) => {
    addPopup.showLoading(true);
    api.postNewCard(values)
    .then((newValues) => {
      const newCard = createCard(newValues, userId);
      cardList.setItem(newCard);
      addPopup.close();
      })
    .catch((err) => console.log(err))
    .finally(() => {
      addPopup.showLoading(false);
      })
    }
  }, 
'#add_popup');
addPopup.setEventListeners();

const editPopup = new PopupWithForm( 
  {
  submitHandler: (values) => {
    editPopup.showLoading(true);
    api.patchUserData(values)
    .then(() => {
      userInfo.setUserInfo(values);
      editPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editPopup.showLoading(false);
    })
    }
  }, 
'#edit_popup');
editPopup.setEventListeners();

const avatarPopup = new PopupWithForm( 
  {
    submitHandler: (values) => {
      avatarPopup.showLoading(true);
      api.patchAvatar(values)
      .then(() => {
        userInfo.setAvatar(values);
        avatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        avatarPopup.showLoading(false);
      })
    }
  }, 
  '#avatar_popup');
  avatarPopup.setEventListeners();

const editButton = document.querySelector('.profile__edit-button');
const editButtonHandler = () => {
    editFormValidation.deleteErrors();
    editPopup.open();
    const data = userInfo.getUserInfo();
    usernameInput.value = data.name;
    subscriptionInput.value = data.about;
}
editButton.addEventListener('click', editButtonHandler);

const addButton = document.querySelector('.profile__add-button');
const addButtonHandler = () => {
  addFormValidation.deleteErrors();
  addPopup.open();
}
addButton.addEventListener('click', addButtonHandler);

const avatarButton = document.querySelector('.profile__avatar-button');

const avatarButtonHandler = () => {
  avatarFormValidation.deleteErrors();
  avatarPopup.open();
}
avatarButton.addEventListener('click', avatarButtonHandler);

const confirmPopup = new popupWithConfirm(
  {submitHandler: (card) => {
      confirmPopup.showLoading(true);
      api.deleteCard(card._id)
      .then(() => {
        card.deleteCard();
        confirmPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        confirmPopup.showLoading(false);
      })
    }
  },'#confirm_popup');
confirmPopup.setEventListeners();
  

// Валидация

const addingForm = document.querySelector('#add-form');
const editingForm = document.querySelector('#edit-form');
const avatarForm = document.querySelector('#avatar-form');

const addFormValidation = new FormValidator(settings, addingForm);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(settings, editingForm);
editFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(settings, avatarForm);
avatarFormValidation.enableValidation();





































