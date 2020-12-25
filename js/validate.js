function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}_error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
} //shows validation error

function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}_error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
} //hides validation error

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showError(form, input, config);
  } else {
    hideError(form, input, config);
  }
} //checks if active input is valid and shows error if needed

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass)
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
} //sets button state depending on validity

function attachFormValidityListener(form, config) {
  const popupInputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  popupInputs.forEach(input => {
    input.addEventListener('input', (evt) => {

      checkInputValidity(form, input, config)
      setButtonState(submitButton, form.checkValidity(), config)
    })
  })
} //attaches validity listeners to inputs and buttons

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    attachFormValidityListener(form, config);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config)
  })
} //starts to attach validation to all forms on page

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