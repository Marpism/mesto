export class UserInfo {
 constructor({ name, about, avatar }) {
  this._name = document.querySelector(name);
  this._about = document.querySelector(about);
  this._avatar = document.querySelector(avatar);
 }
 
 getUserInfo() {
  this._userInfo = {
    name: this._name.textContent,
    about: this._about.textContent,
  }
  return this._userInfo;
 }

 setUserInfo(data) {
  this._name.textContent = data.name;
  this._about.textContent = data.about;
 }

 setAvatar(data) {
  this._avatar.style = `background-image: url('${data.avatar}')`
 }
}