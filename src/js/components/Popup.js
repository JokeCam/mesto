export class Popup {
    constructor(selector){
        this._selector = document.querySelector(selector);
    }

    open(){
        this._selector.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        }); // opens popup and attaches esc button listener
    }

    close(){
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (event) => {
            this._handleEscClose(event);
        }); // closes popup and removes esc button listener
    }

    _handleEscClose(event){
        if (event.key === 'Escape') {
            this.close();
        }
    }; //handles escape button for closing active popup

    setEventListeners(){
        const popup = this._selector;
        const popupCloseButton = popup.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', () => {
            this.close();
            popupCloseButton.removeEventListener('click', () => {
                this.close();
            }) // sets event listeners for popup(close button)
        })
    }
}