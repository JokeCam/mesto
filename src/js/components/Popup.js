export class Popup {
    constructor(selector){
        this._selector = selector;
    }

    open(){
        document.querySelector(this._selector).classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose); // opens popup and attaches esc button listener
    }

    close(){
        document.querySelector(this._selector).classList.remove('popup_opened');
         // closes popup
    }

    _handleEscClose = (event) =>{
        if (event.key === 'Escape') {
            this.close();
        }
    }; //handles escape button for closing active popup

    _handleOverLay(evt){
        if (evt.target.classList.contains('popup_opened')){
            this.close;
        }
    }

    setEventListeners(){
        const popup = document.querySelector(this._selector);
        popup.addEventListener('mousedown', this._handleOverLay);
        const popupCloseButton = popup.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', () => {
            this.close(); 
        }); // sets event listeners for popup(close button)
    }
}