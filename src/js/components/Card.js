export class Card {
    constructor(data, handleCardClick, cardTemplate, handleDeleteCard, handleLikeButton, ownerData) {
        this._name = data.name,
        this._link = data.link,
        this._likes = data.likes,
        this._owner = data.owner,
        this._likes.forEach((item) => this._likesId = item._id),
        this._ownerData = ownerData,

        this._handleDeleteCard = handleDeleteCard,
        this._handleCardClick = handleCardClick,
        this._cardTemplate = cardTemplate,
        this._handleLikeButton = handleLikeButton
    }
    composeItem = () => {
        const clonedElement = this._cardTemplate
        const elementTitle = clonedElement.querySelector('.element__title'); //recieving values from input
        elementTitle.textContent = this._name;
        const elementImage = clonedElement.querySelector('.element__image'); //recieving values from input
        elementImage.src = this._link; 
        elementImage.alt = this._name;
        const likeButton = clonedElement.querySelector('.element__button');
        const deleteButton = clonedElement.querySelector('.element__delete');
        this._ownerData.then((res) => {
        if(this._likesId == res._id){
            likeButton.classList.add('element__button_active');
        }
        if(this._owner._id !== res._id){
            deleteButton.classList.add('element__delete_hidden')
        }
        })
        const likes = clonedElement.querySelector('.element__likes');
        likes.textContent = `${this._likes.length}`
        this._setEventListeners(elementImage, likeButton, deleteButton);
        return clonedElement;
    }; //function for composing cards

    _handleLikeIcon = (event) => {
        event.target.classList.toggle('element__button_active');
    }; //toggles active class for like button

    _setEventListeners(elementImage, likeButton, deleteButton){
        elementImage.addEventListener('click', this._handleCardClick);
        likeButton.addEventListener('click', this._handleLikeButton);
        deleteButton.addEventListener('click', this._handleDeleteCard);
    }
}