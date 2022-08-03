const config = {
  formElement: '.popup__form',
  inputElement: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: '.popup__submit_disabled',
  inputErrorClass: '.popup__field_type_error',
  errorElement: '.popup__error'
}; 

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent='';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
  showError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideError(formElement, inputElement);
} 
};

function setEventListeners (formElement, settings){
  const inputList = Array.from(formElement.querySelectorAll(settings.inputElement));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
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