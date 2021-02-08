import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector){
        super(selector)
    }

    open = (evt) => {
        const popup = this._selector;
        const popupImage = popup.querySelector('.popup__image');
        const popupImageText = popup.querySelector('.popup__image-title');
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        popupImageText.textContent = evt.target.alt;
        super.open();
    } //opens image popup and copies image text, alt and src propeties
}