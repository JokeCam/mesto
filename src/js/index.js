import '../pages/index.css';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { Api } from './components/Api.js';
import { PopupWithConfirm } from './components/PopupWithConfirm.js'
// class imports
  
import { profilePic, profileAbout, profileName, buttonEdit, formElementEditPopup, cardAddButton, 
  addPopupForm, nameInput, jobInput, popupEditPicForm, profileEditPicBtn, templateElem, editPopupElem,
  imagePopupContainer, popupAdd, popupAvatarElem, popupConfirmElem, popupConfirmBtnElem} from './utils/constants.js';
// constants imports

import { enableValidationConfig } from './utils/enableValidation.js';

import { renderLoading } from './utils/renderLoading.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '75314450-8bde-49f1-8e95-7ac1e831360d',
    'Content-Type': 'application/json'
  }
});

const userId = {myId: ''}

api.getUserInfo()
  .then((res) => {
    info.setUserInfo(res.name, res.about);
    info.setUserAvatar(res.avatar);
    userId.myId = res._id
  })
  .catch(err=>console.log(`Ошибка: ${err}`))

const info = new UserInfo(profileName, profileAbout, profilePic);
const imagePopup = new PopupWithImage(imagePopupContainer);
imagePopup.setEventListeners();
const editPopup = new PopupWithForm(editPopupElem, (name) => {
  renderLoading(true)
  api.updateUserInfo(name)
    .catch(err=>console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading();
      editPopup.close()
    })
  info.setUserInfo(name.name, name.about);
});
editPopup.setEventListeners();  // attaches event listeners to the popup

buttonEdit.addEventListener('click', function () { // event listener for the Edit profile button
  nameInput.value = info.recieveUserInfo().name;
  jobInput.value = info.recieveUserInfo().job;
  editPopup.open(); // opens the popup
});

const addCardPopup = new PopupWithForm(popupAdd, (data) => { // new class decalration
  renderLoading(true);
  api.addNewCard(data)
    .then((res) => {
      cardRender.addItem(createCard(res), true);  
    })
    .catch(err=>console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading();
      addCardPopup.close();
    })
});

const popupEditPicture = new PopupWithForm(popupAvatarElem, (link) => {
  renderLoading(true);
  api.updateUserAvatar(link.avatar)
    .catch(err=>console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading();
      popupEditPicture.close();
    })
  info.setUserAvatar(link.avatar);
})
popupEditPicture.setEventListeners();

profileEditPicBtn.addEventListener('click', () => {
  popupEditPicture.open();
});

const confirmPopup = new PopupWithConfirm(popupConfirmElem, popupConfirmBtnElem, (evt, data) => {
  evt.target.closest('.element').remove();
  api.deleteCard(data._id)
  .catch(err=>console.log(`Ошибка: ${err}`))
  confirmPopup.close()
})
confirmPopup.setEventListeners();

function createCard(data){  
  const newCard = new Card(data, (evt) => {
    imagePopup.open(evt)
  }, templateElem.content.cloneNode(true),
    (evt) => {
      confirmPopup.open();
      confirmPopup.deleteCardListener(evt, data);
    },
     (evt) => {if(evt.target.classList.contains('element__button_active')){
      api.removeLike(data._id).then((res) =>
      evt.target.closest('.element__like_container').querySelector('.element__likes').textContent = res.likes.length)
      .catch(err=>console.log(`Ошибка: ${err}`)),
      evt.target.classList.remove('element__button_active')}
      else api.addLike(data._id).then((res) =>
      evt.target.closest('.element__like_container').querySelector('.element__likes').textContent = res.likes.length)
      .catch(err=>console.log(`Ошибка: ${err}`)),
      evt.target.classList.add('element__button_active');
     },userId)
  return newCard.composeItem();
}

addCardPopup.setEventListeners(); // class PopupWithForm public method that attaches event listeners

cardAddButton.addEventListener('click', function () {
  addCardPopup.open(); // class PopupWithForm public method that opens the popup
});

api.getCards()
  .then((data) => {
    data.forEach((item) => {
      cardRender.addItem(createCard(item))
    })
  })
  .catch(err=>console.log(`Ошибка: ${err}`))

const cardRender = new Section ({ // new class decalration that allows for the cards to be placed onto the page
  renderer: createCard
  }, '.elements'); // card renderer  that uses createCard function

const popupEditValidator = new FormValidator(enableValidationConfig, formElementEditPopup);
popupEditValidator.enableValidation(); //initiates real time Edit form input validation
const popupAddCardValidator = new FormValidator(enableValidationConfig, addPopupForm);
popupAddCardValidator.enableValidation(); //initiates real time Add form input validation
const popupEditAvatar = new FormValidator(enableValidationConfig, popupEditPicForm);
popupEditAvatar.enableValidation();

