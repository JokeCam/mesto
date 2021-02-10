import '../pages/index.css';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithImage } from './components/PopupWithImage.js';
// class imports
  
import { profileAbout, profileName, buttonEdit, formElementEditPopup, cardAddButton, 
  addPopupForm, addPopupName, addPopupSrc, nameInput, jobInput, pageListener} from './utils/constants.js';
// constants imports

import { enableValidationConfig } from './utils/enableValidation.js';
import { initialCards } from './utils/initialCards.js';
import { checkPopupValidity } from './utils/validate.js';

pageListener.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup_opened'))
  evt.target.classList.remove('popup_opened');
}) //listener for popup overlay leftclick close function

const info = new UserInfo(profileName, profileAbout);
const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();
const editPopup = new PopupWithForm('.popup_edit', (name) => {
  info.setUserInfo(name.name, name.about);
  editPopup.close(); // closes the popup and removes event listeners
});
editPopup.setEventListeners();  // attaches event listeners to the popup

buttonEdit.addEventListener('click', function () { // event listener for the Edit profile button
  nameInput.value = info.recieveUserInfo().name;
  jobInput.value = info.recieveUserInfo().job;
  editPopup.open(); // opens the popup
  checkPopupValidity();  //checks if active popup form is valid and toggles class for submit button
});

const addCardPopup = new PopupWithForm('.popup_add-card', (data) => { // new class decalration
  createCard(data);
  addCardPopup.close();
});

function createCard(data){
  const newCard = new Card(data, (evt) => {
    imagePopup.open(evt)
  })
  cardRender.addItem(newCard.composeItem());
} 

addCardPopup.setEventListeners(); // class PopupWithForm public method that attaches event listeners

cardAddButton.addEventListener('click', function () {
  addCardPopup.open(); // class PopupWithForm public method that opens the popup
  checkPopupValidity();  //checks if active popup form is valid and toggles class for submit button
}); // "Spaghetti Junction"

const cardRender = new Section ({ // new class decalration that allows for the cards to be placed onto the page
  items: initialCards,
  renderer: createCard
  }, '.elements'); // card renderer  that uses createCard function

cardRender.cardRenderer(); // renders cards onto the page

const popupEditValidator = new FormValidator(enableValidationConfig, formElementEditPopup);
popupEditValidator.enableValidation(); //initiates real time Edit form input validation
const popupAddCardValidator = new FormValidator(enableValidationConfig, addPopupForm);
popupAddCardValidator.enableValidation(); //initiates real time Add form input validation
