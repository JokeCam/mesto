export class Popup {
    constructor(selector){
        this._popup = document.querySelector(selector);;
    }

    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose); // opens popup and attaches esc button listener
    }

    close(){
        this._popup.classList.remove('popup_opened');
         // closes popup
    }

    _handleEscClose = (event) =>{
        if (event.key === 'Escape') {
            this.close();
        }
    }; //handles escape button for closing active popup

    _handleOverLay = (evt) =>{
        if (evt.target.classList.contains('popup_opened')){
            this.close();
        }
    }

    setEventListeners(){
        this._popup.addEventListener('mousedown', this._handleOverLay);
        const popupCloseButton = this._popup.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', () => {
            this.close(); 
        }); // sets event listeners for popup(close button)
    }
}