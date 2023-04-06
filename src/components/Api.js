export class Api {
  constructor(options) {
    this._url = options.url
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

  getCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  getUserData() {
  return fetch(this._url + '/users/me', {
    method: 'GET',
    headers: this._headers
    })
    .then(this._getResponseData);
  }

  patchUserData(values) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about
        })
    })
    .then(this._getResponseData);
  }

  patchAvatar(values) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH', 
      headers: this._headers,
      body: JSON.stringify({
        avatar: values.avatar
      })
    })
    .then(this._getResponseData);
  }

  postNewCard(values) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        link: values.link
      })
    })
    .then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  putLike(id) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: 'PUT', 
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  removeLike(id) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: 'DELETE', 
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  getAllData() {
    return Promise.all( [this.getCards(), this.getUserData()] );
  }
}