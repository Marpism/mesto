import '../pages/index.css';
import { Card } from '../components/card.js'
import { Section } from '../components/Section.js'
import { FormValidator } from '../components/formValidator.js'
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

const createCard = (data, userData) => {
  const card = new Card(
    { data: data, 
    handleCardClick: () => 
      imagePopup.open(data), // открытие попапа с картинкой
    }
  , '#card-template', api, userData, confirmPopup);
    const cardElement = card.createCard();
    cardElement.querySelector('.card__bin-icon').addEventListener('click', () => {
      confirmPopup.open();
      confirmPopup.setEventListeners(card);
    });
    return cardElement;
}


//После получения данных с сервера

api.getAllData()
.then(( [cards, userData] ) => {
  // console.log(cards)
  cards.reverse();
  const cardList = new Section({ data: cards,
    renderer: (item) => {
      const cardElement = createCard(item, userData);
      cardList.setItem(cardElement);
    }}, cardContainerSelector);
  cardList.renderItems(cards);
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
})
.catch((err) => console.log(err))


// Попапы

const imagePopup = new PopupWithImage('#image_popup');
imagePopup.setEventListeners();

const addPopup = new PopupWithForm(
  {
  submitHandler: (values) => {
    addPopup.showLoading(true);
    api.postNewCard(values)
    .catch((err) => console.log(err))
    .finally(() => {
      addPopup.showLoading(false);
      addPopup.close();
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
    .catch((err) => console.log(err))
    .finally(() => {
      editPopup.showLoading(false);
      userInfo.setUserInfo(values);
      editPopup.close();
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
      .catch((err) => console.log(err))
      .finally(() => {
        avatarPopup.showLoading(false);
        userInfo.setAvatar(values);
        avatarPopup.close();
      })
    }
  }, 
  '#avatar_popup');
  avatarPopup.setEventListeners();

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  editPopup.open();
  const data = userInfo.getUserInfo();
  usernameInput.value = data.name;
  subscriptionInput.value = data.about;
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => addPopup.open());

const avatarButton = document.querySelector('.profile__avatar-button');
avatarButton.addEventListener('click', () => {
  avatarPopup.open();
})

const confirmPopup = new popupWithConfirm(
  {submitHandler: (card) => {
      confirmPopup.showLoading(true);
      api.deleteCard(card._id)
      .then(card.deleteCard())
      .catch((err) => console.log(err))
      .finally(() => {
        confirmPopup.showLoading(false);
        confirmPopup.close();
      })
    }
  },'#confirm_popup');

  

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





































