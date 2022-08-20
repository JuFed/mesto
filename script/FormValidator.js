  export default class FormValidator {
    constructor(config, form) {
    this._config = config;
    this._form = form;
    }
    _showError(inputElement){
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorElementActive);
    }
    _hideError(inputElement){
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorElementActive);
        errorElement.textContent='';
    }
    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
          } else {
            this._hideError(inputElement);
          } 
    }
    _setEventListeners(){
       this._inputList = Array.from(this._form.querySelectorAll(this._config.inputElement));
       this._button = this._form.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        }); 
    }
    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          }); 
    }
    _toggleButtonState(){
        if (this._hasInvalidInput(this._inputList)) {
            this._button.setAttribute('disabled', true);
            this._button.classList.add(this._config.inactiveButtonClass);
          } else {
            this._button.removeAttribute('disabled');
            this._button.classList.remove(this._config.inactiveButtonClass);
          } 
    }
    enableValidation(){
        this._setEventListeners();
    }
}

