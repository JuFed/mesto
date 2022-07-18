//попап в профиле
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupElementProfile.querySelector('.popup__close');
const popupOpenProfile = document.querySelector('.profile__edit');

const openPopupProfile = function () {
  popupElementProfile.classList.add('popup_opened');
};

const closePopupProfile = function () {
  popupElementProfile.classList.remove('popup_opened');
};
popupOpenProfile.addEventListener('click', openPopupProfile);
popupCloseProfile.addEventListener('click', closePopupProfile);

//попап создание карточки
const popupElementCard = document.querySelector('.popup_type_card');
const popupCloseCard = popupElementCard.querySelector('.popup__close');
const popupOpenCard = document.querySelector('.profile__rectangle');


const openPopupCard = function () {
  popupElementCard.classList.add('popup_opened');
};

const closePopupCard = function () {
  popupElementCard.classList.remove('popup_opened');
};
popupOpenCard.addEventListener('click', openPopupCard);
popupCloseCard.addEventListener('click', closePopupCard);


//сохранение данных в форме профиль
let formElement = popupElementProfile.querySelector('.popup__form');
let nameInput = popupElementProfile.querySelector('.popup__field_type_name');
let jobInput = popupElementProfile.querySelector('.popup__field_type_job');
let userName = document.querySelector('.profile__headline');
let userJob = document.querySelector('.profile__caption');

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.value;
  jobInput.value;
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopupProfile();
}
formElement.addEventListener('submit', formSubmitHandler);



//карточки

const elementsList = document.querySelector('.elements__grid');
const template = document.querySelector('.template').content.querySelector('.element');

const popupElementImage = document.querySelector('.popup_type_image');
const popupCloseImage = popupElementImage.querySelector('.popup__close');

const openPopupImage = function () {
  popupElementImage.classList.add('popup_opened');
};
const closePopupImage = function () {
  popupElementImage.classList.remove('popup_opened');
};



function createCard(card) {

  const cardElement = template.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;

  const buttonLike = cardElement.querySelector('.element__like');
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('element__like_active'));

  const buttonDelete = cardElement.querySelector('.element__delete');
  buttonDelete.addEventListener('click', () => cardElement.remove());

  function openFullSize() {
    openPopupImage();
    popupElementImage.querySelector('.popup__text-image').textContent = card.name;
    popupElementImage.querySelector('.popup__open-image').src = card.link;
    popupElementImage.querySelector('.popup__open-image').alt = card.name;
    popupCloseImage.addEventListener('click', closePopupImage);
  }
  const imageFullSize = cardElement.querySelector('.element__image');
  imageFullSize.addEventListener('click', () => openFullSize(card.link, card.name));



  return cardElement;
}



function createInitialCards() {
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

  initialCards.forEach(addNewCard);
}

const cardForm = document.querySelector('.popup__form_type_card');
const cardNameInput = cardForm.querySelector('.popup__field_type_cardname');
const cardLinkInput = cardForm.querySelector('.popup__field_type_cardpicture');

//сабмит формы 

cardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardName = cardNameInput.value;
  const newCardImage = cardLinkInput.value;
  addNewCard({
    name: newCardName,
    link: newCardImage
  });
  closePopupCard();
  cardForm.reset();
})


function renderCard(card) {
  elementsList.prepend(card);
}
//создание новой карточки
function addNewCard(card) {
  const cardsCreate = createCard(card);
  renderCard(cardsCreate);
}


createInitialCards();
