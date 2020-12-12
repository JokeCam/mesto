const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button');
const buttonClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');

const popupAdd = document.querySelector('#popup-add');
const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseAddPopup = document.querySelector('#popup__close');
const cardCreateButton = popupAdd.querySelector('.popup__button');

const elementSection = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template').content; //card template

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
} //function closes popup

function formSubmitHandler (evt) {
    evt.preventDefault();

    firstName.textContent = nameInput.value;
    jobName.textContent = jobInput.value;

    closePopup()
} //function sends input values back to page and closes popup

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
//event listeners for edit, submit and close buttons(popup)

function renderList() {
  const elementList = initialCards.map(composeItem);

  elementSection.append(...elementList)
}//function renders premade cards

function composeItem(item) {
  const clonedElement = elementTemplate.cloneNode(true); //template tag cloning
  const elementTitle = clonedElement.querySelector('.element__title').textContent = item.name; //recieving values from input
  const elementImage = clonedElement.querySelector('.element__image').src = item.link; //recieving values from input
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

renderList() 

function openPopupAdd () {
  popupAdd.classList.add('popup_opened');
}//function opens card creation popup

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}//function closes card creation popup

cardAddButton.addEventListener('click', openPopupAdd);
cardCloseAddPopup.addEventListener('click', closePopupAdd);
//event listeners for card creation popup

let cardNameInput = document.querySelector('#card_name');
let cardSrcInput = document.querySelector('#img_src');

function createItem() {
  const clonedElement = elementTemplate.cloneNode(true); //template tag cloning
  const elementTitle = clonedElement.querySelector('.element__title').textContent = cardNameInput.value; //recieving values from input
  const elementImage = clonedElement.querySelector('.element__image').src = cardSrcInput.value; //recieving values from input
  const likeButton = clonedElement.querySelector('.element__button');
  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('element__button_active'); //toggles active class for like button
  });
  const deleteButton = clonedElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', function(event){
    event.target.closest('.element').remove(); //targets the button parent and removes it
  });
  elementSection.prepend(clonedElement);
  closePopupAdd();
}//function for creating custom cards

cardCreateButton.addEventListener('click', createItem);

