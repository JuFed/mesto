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

//заготовка карточек
const template = document.querySelector('.template').content.querySelector('.element');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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




function createCard(card) {
  const cardElement = template.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = card.name;
  const elementImage = cardElement.querySelector('.element__image');
  elementImage.src = card.link;
  elementImage.alt = card.name;

  const buttonLike = cardElement.querySelector('.element__like');
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('element__like_active'));

  const buttonDelete = cardElement.querySelector('.element__delete');
  buttonDelete.addEventListener('click', () => cardElement.remove());

  function openFullSize() {
    openPopup(popupElementImage);
    popupElementImageCaption.textContent = card.name;
    popupElementImageFull.src = card.link;
    popupElementImageFull.alt = card.name;
  }

  const imageFullSize = cardElement.querySelector('.element__image');
  imageFullSize.addEventListener('click', () => openFullSize(card.link, card.name));

  return cardElement;
}
popupCloseImage.addEventListener('click', () => closePopup(popupElementImage));

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



//сабмит формы 

formElementCard.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardName = cardNameInput.value;
  const newCardImage = cardLinkInput.value;
  addNewCard({
    name: newCardName,
    link: newCardImage
  });
  closePopup(popupElementCard);
  formElementCard.reset();
})


function renderCard(card) {
  cardsContainer.prepend(card);
}
//создание новой карточки
function addNewCard(card) {
  const cardsCreate = createCard(card);
  renderCard(cardsCreate);
}


createInitialCards();
