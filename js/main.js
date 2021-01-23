import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js'

const editPopup = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__button');
const buttonCloseEditPopup = editPopup.querySelector('.popup__close');
const formElementEditPopup = editPopup.querySelector('.popup__form');

const popupAdd = document.querySelector('.popup_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const addPopupForm = popupAdd.querySelector('.popup__form');
const addPopupName = popupAdd.querySelector('#card__name_input');
const addPopupSrc = popupAdd.querySelector('#img__src_input');
const cardCloseAddPopup = popupAdd.querySelector('.popup__close');

const elementSection = document.querySelector('.elements');

const imagePopupContainer = document.querySelector('.popup_image');
const imagePopupClose = imagePopupContainer.querySelector('.popup__close');

const nameInput = formElementEditPopup.querySelector('input[name="name_input"]');
const jobInput = formElementEditPopup.querySelector('input[name="job_input"]');

const firstName = document.querySelector('.profile__title');
const jobName = document.querySelector('.profile__subtitle');

const pageListener = document.querySelector('.content');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
} //function opens popup

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
} //function closes popup

function handleEsc(event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    activePopup.classList.remove('popup_opened');
  }
}; //handles escape button for closing active popup

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  firstName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;

  closePopup(editPopup)
} //function sends input values back to page and closes popup

initialCards.forEach((item) =>{
  const cardElement = new Card(item.name, item.link)
  cardElement.addCard(elementSection);
})//function renders premade cards

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const customCard = new Card(addPopupName.value, addPopupSrc.value);
  customCard.addCard(elementSection);
  addPopupForm.reset();
  closePopup(popupAdd);
}; //add card popup sumbit button handler

pageListener.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup_opened'))
  evt.target.classList.remove('popup_opened');
}) //listener for popup overlay leftclick close function

addPopupForm.addEventListener('submit', handleAddCardSubmit);
//Add popup 'submit' listener

imagePopupClose.addEventListener('click', function () {
  closePopup(imagePopupContainer);
});//listener for close image popup button

buttonEdit.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = firstName.textContent;
  jobInput.value = jobName.textContent;
  checkPopupValidity();
});

buttonCloseEditPopup.addEventListener('click', function () {
  closePopup(editPopup);
});

formElementEditPopup.addEventListener('submit', handleProfileFormSubmit);
//event listeners for edit, submit and close buttons

cardAddButton.addEventListener('click', function () {
  openPopup(popupAdd)
  checkPopupValidity();
});

cardCloseAddPopup.addEventListener('click', function () {
  closePopup(popupAdd);
}); //event listeners for card creation popup

const validator = new FormValidator();
validator.enableValidation(enableValidationConfig); //initiates real time input validation