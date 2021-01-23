export class FormValidator {
    constructor(config, form){
        this._config = config,
        this._form = form
    }

    enableValidation = (config) => {
        const forms = document.querySelectorAll(config.formSelector);
        forms.forEach(form => {
        this._attachFormValidityListener(form, config);
          form.addEventListener('submit', (evt) => {
            evt.preventDefault();
          })
          const submitButton = form.querySelector(config.submitButtonSelector);
          this._setButtonState(submitButton, form.checkValidity(), config)
        })
      } //starts to attach validation to all forms on page

    _attachFormValidityListener(form, config) {
        const popupInputs = form.querySelectorAll(config.inputSelector);
        const submitButton = form.querySelector(config.submitButtonSelector);
        popupInputs.forEach(input => {
          input.addEventListener('input', (evt) => {
      
            this._checkInputValidity(form, input, config)
            this._setButtonState(submitButton, form.checkValidity(), config)
          })
        })
      } //attaches validity listeners to inputs and buttons

    _setButtonState(button, isActive, config) {
        if (isActive) {
          button.classList.remove(config.inactiveButtonClass)
          button.disabled = false;
        } else {
          button.classList.add(config.inactiveButtonClass);
          button.disabled = true;
        }
      } //sets button state depending on validity

    _checkInputValidity(form, input, config) {
        if (!input.validity.valid) {
          this._showError(form, input, config);
        } else {
          this._hideError(form, input, config);
        }
      } //checks if active input is valid and shows error if needed

    _hideError(form, input, config) {
        const error = form.querySelector(`#${input.id}_error`);
        error.textContent = '';
        input.classList.remove(config.inputErrorClass);
      } //hides validation error

    _showError(form, input, config) {
        const error = form.querySelector(`#${input.id}_error`);
        error.textContent = input.validationMessage;
        input.classList.add(config.inputErrorClass);
      } //shows validation error
}