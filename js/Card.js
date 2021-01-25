import { openPopup, imagePopupContainer, imagePopup, imagePopupName } 
from './main.js'

export class Card {
    constructor(name, src) {
        this._name = name,
        this._src = src
    }
    composeItem = () => {
        const clonedElement = document.querySelector('.template').content.cloneNode(true); //template tag cloning
        const elementTitle = clonedElement.querySelector('.element__title'); //recieving values from input
        elementTitle.textContent = this._name;
        const elementImage = clonedElement.querySelector('.element__image'); //recieving values from input
        elementImage.src = this._src;
        elementImage.alt = this._name;
        elementImage.addEventListener('click', this._handlePreviewPicture);
        const likeButton = clonedElement.querySelector('.element__button');
        likeButton.addEventListener('click', this._handleLikeIcon);
        const deleteButton = clonedElement.querySelector('.element__delete');
        deleteButton.addEventListener('click', this._handleDeleteCard);
        return clonedElement;
    }; //function for composing cards

    _handlePreviewPicture = (event) => {
        openPopup(imagePopupContainer);
        imagePopup.src = event.target.src;
        imagePopup.alt = event.target.alt;
        imagePopupName.textContent = event.target.alt;
    }  //opens image popup and copies image text, alt and src propeties

    _handleLikeIcon = (event) => {
        event.target.classList.toggle('element__button_active');
    }; //toggles active class for like button

    _handleDeleteCard = (event) => {
        event.target.closest('.element').remove();
    }; //targets the button parent and removes it
}