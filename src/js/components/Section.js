export class Section {
    constructor({ items, renderer }, selector){
        this._items = items,
        this._renderer = renderer,

        this._container = document.querySelector(selector)
    }

    cardRenderer(){
        this._items.forEach((item) => {
          this._renderer(item);
        })
    } // renders card with a custom renderer

    addItem(elem, before = false){
        if(before){
        this._container.prepend(elem);
        } else this._container.append(elem)
    } // places card onto the page
}