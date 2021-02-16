export class Section {
    constructor({ items, renderer }, selector){
        this._items = items,
        this._renderer = renderer,

        this._container = document.querySelector(selector)
    }

    cardRenderer(){
        console.log(this._items)
        this._items.forEach((item) => {
          this._renderer(item);
        })
    } // renders card with a custom renderer

    addItem(elem){
        this._container.prepend(elem);
    } // places card onto the page
}