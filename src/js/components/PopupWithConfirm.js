import { Popup } from './Popup.js'
export class PopupWithConfirm extends Popup {
    constructor(selector, button, deleteCard){
        super(selector)

        this._deleteCard = deleteCard
        this._button = button;
    }

    deleteCardListener(evt, data){
        this._button.addEventListener('click', () => {
            this._deleteCard(evt, data)
        });
    }
}