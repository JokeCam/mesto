const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button');
const buttonClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');

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
