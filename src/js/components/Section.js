export class Section {
    constructor({ items, renderer}, selector){
        this._items = items,
        this._renderer = renderer,

        this._selector = document.querySelector(selector)
    }

    cardRenderer(){
        this._items.forEach((item) => {
          this._renderer(item);
        })
    } // renders card with a custom renderer

    addItem(elem){
        this._selector.prepend(elem);
    } // places card onto the page
}