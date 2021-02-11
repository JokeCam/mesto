export class Card {
    constructor(data, handleCardClick, cardTemplate) {
        this._name = data.name,
        this._link = data.link,

        this._handleCardClick = handleCardClick
        this._cardTemplate = cardTemplate
    }
    composeItem = () => {
        const clonedElement = this._cardTemplate
        const elementTitle = clonedElement.querySelector('.element__title'); //recieving values from input
        elementTitle.textContent = this._name;
        const elementImage = clonedElement.querySelector('.element__image'); //recieving values from input
        elementImage.src = this._link; 
        elementImage.alt = this._name;
        elementImage.addEventListener('click', this._handleCardClick);
        const likeButton = clonedElement.querySelector('.element__button');
        likeButton.addEventListener('click', this._handleLikeIcon);
        const deleteButton = clonedElement.querySelector('.element__delete');
        deleteButton.addEventListener('click', this._handleDeleteCard);
        return clonedElement;
    }; //function for composing cards

    _handleLikeIcon = (event) => {
        event.target.classList.toggle('element__button_active');
    }; //toggles active class for like button

    _handleDeleteCard = (event) => {
        event.target.closest('.element').remove();
    }; //targets the button parent and removes it
}