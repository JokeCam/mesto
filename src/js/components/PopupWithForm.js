import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(selector, submitCallback){
        super(selector),
        this._submitCallback = submitCallback
    }

    _getInputValues(){
        const popupInputs = this._selector.querySelectorAll('.popup__input');
        popupInputs.forEach(item => {
        }) 
    }; // this should recieve input values but they don't have a place to go yet

    setEventListeners(){
        const popupForm = this._selector.querySelector('.popup__form');
        popupForm.addEventListener('submit', this._submitCallback);
        super.setEventListeners();
    }; // attaches event listeners to the popup(close button and a custom submit button callback)

    close(){
        const popupForm = this._selector.querySelector('.popup__form');
        popupForm.reset();
        super.close();
        popupForm.removeEventListener('submit', this._submitCallback);
    }; // closes popup and resets form inputs, also removes custom submit button callback
}