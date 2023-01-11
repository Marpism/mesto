
// Открытие/закрытие попапа
let popup = document.querySelector('.popup');

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', popupOpen);

let closeButton = document.querySelector('.close-icon');
closeButton.addEventListener('click', popupClose);

// редактирование имени/подписи
let username = document.querySelector('.profile__username');
let subscription = document.querySelector('.profile__subscription');
let submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', function() {
  let userNameInput = document.querySelector('#form-input-username').value;
  let subscriptionInput = document.querySelector('#form-input-subscription').value;
  username.textContent = userNameInput;
  subscription.textContent = subscriptionInput;
  popupClose()
});

// лайки
let likeButtons = document.querySelectorAll('.card__like-icon');

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function() {
    if (this.src.slice(-14) === 'heart-icon.svg') {
      this.src = './images/heart-icon_active.svg';
    } else { 
      this.src = './images/heart-icon.svg';
    }
  });
}
