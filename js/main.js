const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button');
const buttonClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');

let nameInput = formElement.querySelector('#first-name');
let jobInput = formElement.querySelector('#job-name');

let firstName = document.querySelector('.profile__title');
let jobName = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = firstName.textContent;
  jobInput.value = jobName.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    firstName.textContent = nameInput.value;
    jobName.textContent = jobInput.value;

    closePopup()
}

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
