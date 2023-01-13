
// Открытие/закрытие попапа
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
  popup.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', popupOpen);

let closeButton = document.querySelector('.popup__close-button');
closeButton.addEventListener('click', popupClose);


// редактирование имени/подписи
let form = document.querySelector('form');

function popupSubmit(event) {
  event.preventDefault();
  username.textContent = userNameInput.value;
  subscription.textContent = subscriptionInput.value;
  popupClose()
}

form.addEventListener('submit', popupSubmit);


// лайки
// let likeButtons = document.querySelectorAll('.card__like-icon');

// for (let i = 0; i < likeButtons.length; i++) {
//   likeButtons[i].addEventListener('click', function() {
//     if (this.src.slice(-14) === 'heart-icon.svg') {
//       this.src = './images/heart-icon_active.svg';
//     } else { 
//       this.src = './images/heart-icon.svg';
//     }
//   });
// }
