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

function checkProfileEditButtonValidity() {
  if (formElementEditPopup.checkValidity()){
    popupEditButton.classList.remove('popup__button_disabled');
  } else {
    popupEditButton.classList.add('popup__button_disabled');
  }
}; //checks if profile edit popup form is valid and toggles class for submit button

function checkAddCardButtonValidity() {
  if (addPopupForm.checkValidity()){
    cardCreateButton.classList.remove('popup__button_disabled');
  } else {
    cardCreateButton.classList.add('popup__button_disabled');
  }
}; //checks if add card popup form is valid and toggles class for submit button