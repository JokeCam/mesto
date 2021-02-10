import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(selector, submitCallback){
        super(selector),
        this._submitCallback = submitCallback,

        this._form = this._popup.querySelector('.popup__form')
    }

    _getInputValues(){
        this._inputList = this._popup.querySelectorAll('.popup__input');

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }; // this should recieve input values but they don't have a place to go yet

    setEventListeners(){
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });
        super.setEventListeners();
    }; // attaches event listeners to the popup(close button and a custom submit button callback)

    close(){
        this._form.reset();
        super.close();
    }; // closes popup and resets form inputs, also removes custom submit button callback
}