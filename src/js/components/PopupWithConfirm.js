import { Popup } from './Popup.js'
export class PopupWithConfirm extends Popup {
    constructor(selector, button, deleteCard){
        super(selector)

        this._deleteCard = deleteCard
        this._button = this._popup.querySelector(button);
    }

    setEventListeners(){
        this._button.addEventListener('click', this._deleteCard);
        super.setEventListeners()
    }
}