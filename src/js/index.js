// import '../pages/index.css';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
// class imports

import { editPopup, buttonEdit, formElementEditPopup, popupAdd, cardAddButton, 
  addPopupForm, addPopupName, addPopupSrc, nameInput, jobInput, pageListener} from './utils/constants.js';
// constants imports

pageListener.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup_opened'))
  evt.target.classList.remove('popup_opened');
}) //listener for popup overlay leftclick close function

buttonEdit.addEventListener('click', function () { // event listener for the Edit profile button
  const editPopup = new PopupWithForm('.popup_edit', (evt) => { 
    evt.preventDefault();
    const info = new UserInfo(nameInput.value, jobInput.value);
    info.setUserInfo(); // class UserInfo public method that updates User information on the page
    editPopup.close(); // closes the popup and removes event listeners
  });
  editPopup.open(); // opens the popup
  editPopup.setEventListeners(); // attaches event listeners to the popup
  const info = new UserInfo(nameInput.value, jobInput.value);
  nameInput.value = info.getUserInfo().name; // recieves user information from the page
  jobInput.value = info.getUserInfo().about; // recieves user information from the page 
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
        const card = new Card(item.name, item.link);
        const clonedElement = card.composeItem(); // class Card public method that composes a Card and attaches event listeners
        customCardRender.addItem(clonedElement); // class Section public method that puts a Card onto the page
      }
    }, '.elements');
    customCardRender.cardRenderer(); // class Section public methid that renders Cards using custom renderer function
  });  
  addCardPopup.open(); // class PopupWithForm public method that opens the popup
  addCardPopup.setEventListeners(); // class PopupWithForm public method that attaches event listeners
  checkPopupValidity();  //checks if active popup form is valid and toggles class for submit button
}); // "Spaghetti Junction"

const initialCardRender = new Section ({ 
  items: initialCards, 
  renderer: (item) => { // custom renderer function that creates new cards based on initialCards object(in this case)
    const card = new Card(item.name, item.link);
    const clonedElement = card.composeItem();
    initialCardRender.addItem(clonedElement);
  }
}, '.elements'); // premade card renderer that uses Section and Card class public methods

initialCardRender.cardRenderer(); // renders premade cards onto the page

const popupEditValidator = new FormValidator(enableValidationConfig, formElementEditPopup);
popupEditValidator.enableValidation(); //initiates real time Edit form input validation
const popupAddCardValidator = new FormValidator(enableValidationConfig, addPopupForm);
popupAddCardValidator.enableValidation(); //initiates real time Add form input validation
