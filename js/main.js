const editPopup = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__button');
const buttonCloseEditPopup = editPopup.querySelector('.popup__close');
const formElementEditPopup = editPopup.querySelector('.popup__form');
const popupEditButton = editPopup.querySelector('.popup__button');

const popupAdd = document.querySelector('.popup_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const addPopupForm = popupAdd.querySelector('.popup__form');
const addPopupName = popupAdd.querySelector('#card__name_input');
const addPopupSrc = popupAdd.querySelector('#img__src_input');
const cardCloseAddPopup = popupAdd.querySelector('.popup__close');
const cardCreateButton = popupAdd.querySelector('.popup__button');

const elementSection = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template').content; //card template

const imagePopupContainer = document.querySelector('.popup_image');
const imagePopup = imagePopupContainer.querySelector('.popup__image');
const imagePopupName = imagePopupContainer.querySelector('.popup__image-title');
const imagePopupClose = imagePopupContainer.querySelector('.popup__close');

const nameInput = formElementEditPopup.querySelector('input[name="name_input"]');
const jobInput = formElementEditPopup.querySelector('input[name="job_input"]');

const firstName = document.querySelector('.profile__title');
const jobName = document.querySelector('.profile__subtitle');

const cardNameInput = document.querySelector('#card_name');
const cardSrcInput = document.querySelector('#img_src');

const pageListener = document.querySelector('.content');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
} //function opens popup

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

function renderList() {
  const elementList = initialCards.map(composeItem);

  elementSection.append(...elementList)
}//function renders premade cards

function composeItem(item) {
  const clonedElement = elementTemplate.cloneNode(true); //template tag cloning
  const elementTitle = clonedElement.querySelector('.element__title'); //recieving values from input
  elementTitle.textContent = item.name;
  const elementImage = clonedElement.querySelector('.element__image'); //recieving values from input
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementImage.addEventListener('click', handlePreviewPicture);
  const likeButton = clonedElement.querySelector('.element__button');
  likeButton.addEventListener('click', handleLikeIcon);
  const deleteButton = clonedElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', handleDeleteCard);
  return clonedElement;
}//function for composing premade cards

const handlePreviewPicture = (event) => {
  openPopup(imagePopupContainer);
  imagePopup.src = event.target.src;
  imagePopup.alt = event.target.alt;
  imagePopupName.textContent = event.target.alt;
}; //opens image popup and copies image text, alt and src propeties

const handleLikeIcon = (event) => {
  event.target.classList.toggle('element__button_active');
}; //toggles active class for like button

const handleDeleteCard = (event) => {
  event.target.closest('.element').remove();
}; //targets the button parent and removes it

function addCard(container, cardElement) {
  container.prepend(composeItem(cardElement));  //cardElement goes in elements container
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const customCard = {
    name: addPopupName.value,
    link: addPopupSrc.value
  };
  addCard(elementSection, customCard);
  addPopupForm.reset();
  closePopup(popupAdd);
}; //add card popup sumbit button handler

renderList(); //renders list from premade cards

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

enableValidation(enableValidationConfig); //initiates real time input validation