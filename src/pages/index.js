import '../pages/index.css';
import { Card } from '../components/card.js'
import { Section } from '../components/Section.js'
import { FormValidator } from '../components/formValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js';
import { initialCards,
         settings,
         cardContainerSelector,
         placeInput,
         linkInput } from '../utils/constants.js'


const userInfo = new UserInfo({
  username: '.profile__username',
  subscription: '.profile__subscription'
});


const imagePopup = new PopupWithImage('#image_popup');
imagePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    { data: data, 
    handleCardClick: () => 
      imagePopup.open(data) // открытие попапа с картинкой
    }
  , '#card-template');
    const cardElement = card.createCard();
    return cardElement;
}

const cardList = new Section({ data: initialCards, 
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.setItem(cardElement);
  }
}, cardContainerSelector);

cardList.renderItems();


const addPopup = new PopupWithForm(
  {
  submitHandler: (evt) => {
  evt.preventDefault();
  const inputValues = {};
  inputValues.name = placeInput.value;
  inputValues.link = linkInput.value;
  const cardElement = createCard(inputValues);
  cardList.setItem(cardElement);
  addPopup.close();
  }
}, 
'#add_popup');
addPopup.setEventListeners();


const editPopup = new PopupWithForm( 
  {
  submitHandler: (evt) => {
    evt.preventDefault();
    const values = editPopup.getInputValues(); 
    userInfo.setUserInfo(values);
    editPopup.close();
  }
}, 
'#edit_popup');
editPopup.setEventListeners();


const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => editPopup.open());

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => addPopup.open());


// Валидация

const addingForm = document.querySelector('#add-form');
const editingForm = document.querySelector('#edit-form');

const addFormValidation = new FormValidator(settings, addingForm);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(settings, editingForm);
editFormValidation.enableValidation();






































