export class FormValidator {
    constructor(config, form){
        this._config = config,
        this._form = form,

        this._submitButton = this._form.querySelector(this._config.submitButtonSelector),
        this._inputList = this._form.querySelectorAll(this._config.inputSelector)
    }

    enableValidation = (config) => {
        this._attachFormValidityListener(form, config);
          this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
          })
          this._setButtonState(this._submitButton, this._form.checkValidity(), config)
      } //starts to attach validation to all forms on page

    _attachFormValidityListener(form, config) {
      this._form.addEventListener('reset', () => {
        this._inputList.forEach((inputElement) => {
            this._hideError(form, inputElement, config)
            this._setButtonState(this._submitButton);
        })
      });
        this._inputList.forEach(input => {
          input.addEventListener('input', (evt) => {
            this._checkInputValidity(form, input, config)
            this._setButtonState(this._submitButton, this._form.checkValidity(), config)
          })
        })
      } //attaches validity listeners to inputs and buttons

    _setButtonState(button, isActive, config) {
        if (isActive) {
          button.classList.remove(this._config.inactiveButtonClass)
          button.disabled = false;
        } else {
          button.classList.add(this._config.inactiveButtonClass);
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
        const error = this._form.querySelector(`#${input.id}_error`);
        error.textContent = '';
        input.classList.remove(this._config.inputErrorClass);
      } //hides validation error

    _showError(form, input, config) {
        const error = this._form.querySelector(`#${input.id}_error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
      } //shows validation error
}