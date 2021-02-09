import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector){
        super(selector)

        this._popup = document.querySelector(this._selector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageText = this._popup.querySelector('.popup__image-title');
    }

    open = (evt) => {
        this._popupImage.src = evt.target.src;
        this._popupImage.alt = evt.target.alt;
        this._popupImageText.textContent = evt.target.alt;
        super.open();
    } //opens image popup and copies image text, alt and src propeties
}