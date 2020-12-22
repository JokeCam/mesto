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

function openPopup(popup) {
  popup.classList.add('popup_opened');
} //function opens popup

function closePopup(popup) {
  popup.classList.remove('popup_opened');
} //function closes popup

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
  elementImage.addEventListener('click', function (e) {
    openPopup(imagePopupContainer);
    imagePopup.src = item.link;
    imagePopup.alt = item.name;
    imagePopupName.textContent = item.name;
  });
  const likeButton = clonedElement.querySelector('.element__button');
  likeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('element__button_active'); //toggles active class for like button
  });
  const deleteButton = clonedElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', function (event) {
    event.target.closest('.element').remove(); //targets the button parent and removes it
  });
  return clonedElement;
}//function for composing premade cards

function addCard(container, cardElement) {
  container.prepend(composeItem(cardElement));  //cardElement добавляется  в container
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const customCard = {
    name: addPopupName.value,
    link: addPopupSrc.value
  };
  addCard(elementSection, customCard);
  addPopupName.value = '';
  addPopupSrc.value = '';
  closePopup(popupAdd);
};

function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}_error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}_error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showError(form, input, config);
  } else {
    hideError(form, input, config);
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass)
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function formValidityListener(form, config) {
  const popupInputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  popupInputs.forEach(input => {
    input.addEventListener('input', (evt) => {

      checkInputValidity(form, input, config)
      setButtonState(submitButton, form.checkValidity(), config)
    })
  })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    formValidityListener(form, config);

    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config)
  })
}

renderList();

pageListener.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup_opened'))
  evt.target.classList.remove('popup_opened');
})

pageListener.addEventListener('keydown', (event) => {
  if (event.key === 'Escape'){
    closePopup(editPopup);
    closePopup(popupAdd);
    closePopup(imagePopupContainer);
  }
})

addPopupForm.addEventListener('submit', handleAddCardSubmit);
//Add popup 'submit' listener

imagePopupClose.addEventListener('click', function () {
  closePopup(imagePopupContainer);
});

buttonEdit.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = firstName.textContent;
  jobInput.value = jobName.textContent;
  enableValidation(enableValidationConfig);
});

buttonCloseEditPopup.addEventListener('click', function () {
  closePopup(editPopup);
});

formElementEditPopup.addEventListener('submit', handleProfileFormSubmit);
//event listeners for edit, submit and close buttons

cardAddButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

cardCloseAddPopup.addEventListener('click', function () {
  closePopup(popupAdd);
}); //event listeners for card creation popup

enableValidation(enableValidationConfig);