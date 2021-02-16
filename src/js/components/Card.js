export class Card {
    constructor(data, handleCardClick, cardTemplate, handleDeleteCard, handleLikeButton) {
        this._name = data.name,
        this._link = data.link,
        this._likes = data.likes,
        this._owner = data.owner,
        this._likes.forEach((item) => this._likesId = item._id)

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
        elementImage.addEventListener('click', this._handleCardClick);
        const likeButton = clonedElement.querySelector('.element__button');
        likeButton.addEventListener('click', this._handleLikeButton);
        const deleteButton = clonedElement.querySelector('.element__delete');
        if(this._likesId == '207e1fdbd01b64856ad98d6c'){
            likeButton.classList.add('element__button_active');
        }
        if(this._owner._id !== '207e1fdbd01b64856ad98d6c'){
            deleteButton.classList.add('element__delete_hidden')
        }
        deleteButton.addEventListener('click', this._handleDeleteCard);
        const likes = clonedElement.querySelector('.element__likes');
        likes.textContent = `${this._likes.length}`
        return clonedElement;
    }; //function for composing cards

    _handleLikeIcon = (event) => {
        event.target.classList.toggle('element__button_active');
    }; //toggles active class for like button
}