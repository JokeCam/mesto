function checkPopupValidity() {
  const activePopup = document.querySelector('.popup_opened');
  const activePopupForm = activePopup.querySelector('.popup__form');
  const activePopupFormButton = activePopupForm.querySelector('.popup__button');

  if (activePopupForm.checkValidity()){
    activePopupFormButton.classList.remove('popup__button_disabled');
  } else {
    activePopupFormButton.classList.add('popup__button_disabled');
  }
}; //checks if active popup form is valid and toggles class for submit button