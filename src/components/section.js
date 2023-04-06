export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._array = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    // this.clear();
    this._array.forEach((item) => {
      this._renderer(item);
    });
  } 
}