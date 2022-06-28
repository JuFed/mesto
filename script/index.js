const popupElement = document.querySelector('.popup');
const popupClose = popupElement.querySelector('.popup__close');
const popupOpen = document.querySelector('.profile__edit');

const openPopup = function() {
    popupElement.classList.add('popup_opened');
};

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
};
popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

let formElement = popupElement.querySelector('.popup__form');
let nameInput = popupElement.querySelector('.popup__field_type_name');
let jobInput = popupElement.querySelector('.popup__field_type_job');
let Name = document.querySelector('.profile__headline');
let Job = document.querySelector('.profile__caption');

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.value;
    jobInput.value;
    Name.textContent = nameInput.value;
    Job.textContent = jobInput.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);