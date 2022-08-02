const form = document.querySelector('.popup__form');
const formInput = form.querySelector('.popup__field');
const formError = form.querySelector(`.${formInput.id}__error`); 


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

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity(form, formInput);
});

function setEventListeners (formElement){
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  }); 
  }
  setEventListeners (form);

  function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.popup__form')); 
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
      setEventListeners(formElement);
  }); 
  }

  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__submit_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__submit_disabled');
  } 
  };
  enableValidation();