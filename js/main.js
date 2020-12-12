const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button');
const buttonClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');

const popupAdd = document.querySelector('#popup-add');
const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseAddPopup = document.querySelector('#popup__close');
const cardCreateButton = popupAdd.querySelector('.popup__button');

const elementSection = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template').content;

const initialCards = [
  {
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

let nameInput = formElement.querySelector('#first-name');
let jobInput = formElement.querySelector('#job-name');

let firstName = document.querySelector('.profile__title');
let jobName = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = firstName.textContent;
  jobInput.value = jobName.textContent;
} //function opens popup and delivers current page value to inputs

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    firstName.textContent = nameInput.value;
    jobName.textContent = jobInput.value;

    closePopup()
} //function sends input values back to page and closes popup

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

function renderList() {
  const elementList = initialCards.map(composeItem);

  elementSection.append(...elementList)
}

function composeItem(item) {
  const clonedElement = elementTemplate.cloneNode(true);
  const elementTitle = clonedElement.querySelector('.element__title').textContent = item.name;
  const elementImage = clonedElement.querySelector('.element__image').src = item.link;
  return clonedElement;
}
renderList()

function openPopupAdd () {
  popupAdd.classList.add('popup_opened');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

cardAddButton.addEventListener('click', openPopupAdd);
cardCloseAddPopup.addEventListener('click', closePopupAdd);

let cardNameInput = document.querySelector('#card_name');
let cardSrcInput = document.querySelector('#img_src');

function createItem() {
  const clonedElement = elementTemplate.cloneNode(true);
  const elementTitle = clonedElement.querySelector('.element__title').textContent = cardNameInput.value;
  const elementImage = clonedElement.querySelector('.element__image').src = cardSrcInput.value;
  elementSection.prepend(clonedElement);
  console.log(clonedElement);
}

cardCreateButton.addEventListener('click', createItem);

