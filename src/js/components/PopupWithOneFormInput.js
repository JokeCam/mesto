import { PopupWithForm } from "./PopupWithForm";

export class PopupWithOneFormInput extends PopupWithForm {
    constructor(selector, sumbitCallback){
        super(selector, sumbitCallback)
    }

    _getInputValues(){
        this._input = this._popup.querySelector('.popup__input');
        
        return this._input.value;
    };
}