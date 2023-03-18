export class UserInfo {
 constructor({ username, subscription }) {
  this._username = document.querySelector(username);
  this._subscription = document.querySelector(subscription);
 }
 
 getUsernInfo() {
  this._userInfo = {
    name: this._username.textContent,
    subscription: this._subscription.textContent
  }
  return this._userInfo;
 }

 setUserInfo(data) {
  this._username.textContent = data.username;
  this._subscription.textContent = data.subscription;
 }
}