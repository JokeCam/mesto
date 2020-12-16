const editPopup = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__button');
const buttonCloseEditPopup = editPopup.querySelector('.popup__close');
const formElementEditPopup = editPopup.querySelector('.popup__form');

const popupAdd = document.querySelector('.popup_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseAddPopup = popupAdd.querySelector('.popup__close');
const cardCreateButton = popupAdd.querySelector('.popup__button');

const elementSection = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template').content; //card template

const imagePopupContainer = document.querySelector('.popup_image');
const imagePopup = imagePopupContainer.querySelector('.popup__image');
const imagePopupName = imagePopupContainer.querySelector('.popup__image-title');
const imagePopupClose = imagePopupContainer.querySelector('.popup__close');

const nameInput = formElementEditPopup.querySelector('#first-name');
const jobInput = formElementEditPopup.querySelector('#job-name');

const firstName = document.querySelector('.profile__title');
const jobName = document.querySelector('.profile__subtitle');

const cardNameInput = document.querySelector('#card_name');
const cardSrcInput = document.querySelector('#img_src');

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
]; //premade cards

function openPopup(e) {
  e.classList.add('popup_opened');
} //function opens popup

function closePopup(e) {
  e.classList.remove('popup_opened');
} //function closes popup

function handleProfileFormSubmit (evt) {
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
  elementImage.addEventListener('click', function(e){
    openPopup(imagePopupContainer);
    imagePopup.src = item.link;
    imagePopup.alt = item.name;
    imagePopupName.textContent = item.name;
  });
  const likeButton = clonedElement.querySelector('.element__button');
  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('element__button_active'); //toggles active class for like button
  });
  const deleteButton = clonedElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', function(event){
    event.target.closest('.element').remove(); //targets the button parent and removes it
  });
  return clonedElement;
}//function for composing premade cards

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}//function opens card creation popup

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}//function closes card creation popup

function createItem() {
  const clonedElement = elementTemplate.cloneNode(true); //template tag cloning
  const elementTitle = clonedElement.querySelector('.element__title').textContent = cardNameInput.value; //recieving values from input
  const elementImage = clonedElement.querySelector('.element__image').src = cardSrcInput.value; //recieving values from input
  const likeButton = clonedElement.querySelector('.element__button');
  const elementImageContainer = clonedElement.querySelector('.element__image');
  const clonedArticleElement = clonedElement.querySelector('.element');
  elementImageContainer.addEventListener('click', function(e){
    imagePopupContainer.classList.add('popup_opened');
    imagePopup.src = e.target.src;
    imagePopupName.textContent = e.target.nextElementSibling.textContent;
  });
  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('element__button_active'); //toggles active class for like button
  });
  const deleteButton = clonedElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', function(event){
    event.target.closest('.element').remove(); //targets the button parent and removes it
  });
  elementSection.prepend(clonedElement);
  closePopup(popupAdd);
}//function for creating custom cards

renderList();

cardCreateButton.addEventListener('click', createItem);

imagePopupClose.addEventListener('click', function() {
  closePopup(imagePopupContainer);
});

buttonEdit.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = firstName.textContent;
  jobInput.value = jobName.textContent;
});
buttonCloseEditPopup.addEventListener('click', function() {
  closePopup(editPopup);
});
formElementEditPopup.addEventListener('submit', handleProfileFormSubmit);
//event listeners for edit, submit and close buttons(popup)

cardAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
});
cardCloseAddPopup.addEventListener('click', function() {
  closePopup(popupAdd);
});
//event listeners for card creation popup