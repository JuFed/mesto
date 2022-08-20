import Cards from './Card.js';
import { FormValidator, config } from './FormValidator.js';

//попап в профиле
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupElementProfile.querySelector('.popup__close');
const popupOpenProfile = document.querySelector('.profile__edit');

//попап создание карточки
const popupElementCard = document.querySelector('.popup_type_card');
const popupCloseCard = popupElementCard.querySelector('.popup__close');
const popupOpenCard = document.querySelector('.profile__rectangle');

//сохранение данных в форме профиль
const formElementProfile = popupElementProfile.querySelector('.popup__form');
const nameInput = popupElementProfile.querySelector('.popup__field_type_name');
const jobInput = popupElementProfile.querySelector('.popup__field_type_job');
const userName = document.querySelector('.profile__headline');
const userJob = document.querySelector('.profile__caption');

//форма карточка 

const formElementCard = document.querySelector('.popup__form_type_card');
const cardNameInput = formElementCard.querySelector('.popup__field_type_cardname');
const cardLinkInput = formElementCard.querySelector('.popup__field_type_cardpicture');

//создание карточек
const popupElementImage = document.querySelector('.popup_type_image');
const popupCloseImage = popupElementImage.querySelector('.popup__close');
const popupElementImageFull = popupElementImage.querySelector('.popup__open-image');
const popupElementImageCaption = popupElementImage.querySelector('.popup__text-image');
const cardsContainer = document.querySelector('.elements__grid');

//кнопка 
const popupSubmitButton = document.getElementById('cardSubmitButton');

//закрытие на overlay 

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) =>{
popup.addEventListener('click', function(evt){
  if(evt.target === popup){
    closePopup(evt.target);
  }
})
});

//закрытие на esc

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}  
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function openPropfilePopup() { 
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupElementProfile);
}
function handleProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupElementProfile);
}
formElementProfile.addEventListener('submit', handleProfileForm);
popupOpenProfile.addEventListener('click', openPropfilePopup);
popupCloseProfile.addEventListener('click', () => closePopup(popupElementProfile));


popupOpenCard.addEventListener('click', () => openPopup(popupElementCard));
popupCloseCard.addEventListener('click', () => closePopup(popupElementCard));

//карточки
const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];
//создание экземпляра класса из card

initialCards.forEach((item) => {
  const card = new Cards(item, '.template', handleCardClick);
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});
//функция открытие полного размера картинки
export default function handleCardClick(name, link){
  popupElementImageCaption.textContent = name;
  popupElementImageFull.src = link;
  popupElementImageFull.alt = name;
  openPopup(popupElementImage);
}
//закрытие полного размера картинки
popupCloseImage.addEventListener('click', () => closePopup(popupElementImage));


//создание новой карточки
function addNewCard(data) {
  const listItem = new Cards(data, ".template", handleCardClick);
  const newCard = listItem.generateCard();  
  return newCard 
}

//сабмит формы 
formElementCard.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardName = cardNameInput.value;
  const newCardImage = cardLinkInput.value;
  cardsContainer.prepend(addNewCard({
    name: newCardName,
    link: newCardImage
  }));
  closePopup(popupElementCard);
  formElementCard.reset();
  popupSubmitButton.setAttribute('disabled', true);
  popupSubmitButton.classList.add('popup__submit_disabled');
})

//экземпляр класса FormValidator

const formCardCheckValid1 = new FormValidator(config, formElementProfile);
const formCardCheckValid2 = new FormValidator(config, formElementCard);
formCardCheckValid1.enableValidation();
formCardCheckValid2.enableValidation();


















