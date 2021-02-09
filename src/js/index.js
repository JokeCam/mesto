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

buttonEdit.addEventListener('click', function () { // event listener for the Edit profile button
  const editPopup = new PopupWithForm('.popup_edit', (evt) => { 
    evt.preventDefault();
    info.updateUserInfo(nameInput.value, jobInput.value);
    info.setUserInfo();
    editPopup.close(); // closes the popup and removes event listeners
  });
  nameInput.value = info.recieveUserInfo().name;
  jobInput.value = info.recieveUserInfo().job;
  editPopup.open(); // opens the popup
  editPopup.setEventListeners(); // attaches event listeners to the popup
  checkPopupValidity();  //checks if active popup form is valid and toggles class for submit button
});

cardAddButton.addEventListener('click', function () {
  const addCardPopup = new PopupWithForm('.popup_add-card', (evt) => { // new class decalration
    const customCard = [ // custom card made into an object
      {
        name: addPopupName.value,
        link: addPopupSrc.value
      }
    ];
    evt.preventDefault(); 
    const customCardRender = new Section ({ // new class decalration that allows for the cards to be placed onto the page
      items: customCard, 
      renderer: (item) => { // custom renderer function that creates new cards based on customCard(in this case)
        const card = new Card(item, (evt) => {
          imagePopup.open(evt);
          imagePopup.setEventListeners();
        });
        const clonedElement = card.composeItem(); // class Card public method that composes a Card and attaches event listeners
        customCardRender.addItem(clonedElement); // class Section public method that puts a Card onto the page
      }
    }, '.elements');
    customCardRender.cardRenderer(); // class Section public methid that renders Cards using custom renderer function
    addCardPopup.close();
  });  
  addCardPopup.open(); // class PopupWithForm public method that opens the popup
  addCardPopup.setEventListeners(); // class PopupWithForm public method that attaches event listeners
  checkPopupValidity();  //checks if active popup form is valid and toggles class for submit button
}); // "Spaghetti Junction"

const initialCardRender = new Section ({ 
  items: initialCards, 
  renderer: (item) => { // custom renderer function that creates new cards based on initialCards object(in this case)
    const card = new Card(item, (evt) => {
      imagePopup.open(evt);
      imagePopup.setEventListeners();
    });
    const clonedElement = card.composeItem();
    initialCardRender.addItem(clonedElement);
  }
}, '.elements'); // premade card renderer that uses Section and Card class public methods

initialCardRender.cardRenderer(); // renders premade cards onto the page

const popupEditValidator = new FormValidator(enableValidationConfig, formElementEditPopup);
popupEditValidator.enableValidation(); //initiates real time Edit form input validation
const popupAddCardValidator = new FormValidator(enableValidationConfig, addPopupForm);
popupAddCardValidator.enableValidation(); //initiates real time Add form input validation
