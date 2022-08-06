const config = {
  formElement: '.popup__form',
  inputElement: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorElement: 'popup__error',
  errorElementActive: 'popup__error_active'
}; 

const showError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorElementActive);
};

const hideError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorElementActive);
  errorElement.textContent='';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
  showError(formElement, inputElement, inputElement.validationMessage, settings);
} else {
  hideError(formElement, inputElement, settings);
} 
};

function setEventListeners (formElement, settings){
  const inputList = Array.from(formElement.querySelectorAll(settings.inputElement));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  }); 
  }

  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  function toggleButtonState(inputList, buttonElement, settings){
    if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settings.inactiveButtonClass);
  } 
  };

  function enableValidation(settings){
    const formList = Array.from(document.querySelectorAll(settings.formElement)); 
    formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
  }); 
  }

  enableValidation(config); 