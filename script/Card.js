export default class Cards {
  constructor(data, templateSelector, handleCardClick) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
}
_getTemplate(){
  const template = document
  .querySelector(this._templateSelector)
  .content
  .querySelector('.element')
  .cloneNode(true);
  return template;
}
  generateCard() {
  this._element = this._getTemplate();
  this._setEventListeners();
  this._element.querySelector('.element__image').src = this._link;
  this._element.querySelector('.element__text').textContent = this._text;
  this._element.querySelector('.element__image').alt = this._text;
  return this._element;
}
_setEventListeners() {
  this._element.querySelector('.element__like').addEventListener('click', () => {
    this._handleButtonClick();
  });
  this._element.querySelector('.element__delete').addEventListener('click', () => {
    this._handleCardDelete();
  });
  this._element.querySelector('.element__image').addEventListener('click', () => {
    this._handleCardClick(this._text,this._link);
  });
}
_handleButtonClick(){
  this._element.querySelector('.element__like').classList.toggle('element__like_active');
}
_handleCardDelete(){
  this._element = null
  this._element.remove();
}
}; 
