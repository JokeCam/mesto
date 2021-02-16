export class Api {
    constructor(option){

    this._url = option.baseUrl
    this._headers = option.headers

    this._dat
    }

    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then(res => res.json())
        .catch(err=>console.log(`Ошибка: ${err}`))
    }

    getCards(){
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
        .then((res) => {
            return res.json();
        })
        .catch(err=>console.log(`Ошибка: ${err}`))
    }

    updateUserInfo(data){
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
              })
        })
        .then((res) => {
            return res.json();
        })
        .then(res => {console.log('Данный обновлены'); return res})
        .catch(err=>console.log(`Ошибка: ${err}`))
    }

    addNewCard(data){
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
              })
        })
        .then((res) => {
            return res.json();
        })
        .then(res=> {console.log('Карточка добавлена'); return res})
        .catch(err=>console.log(`Ошибка: ${err}`))
    }

    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => console.log(res))
        .catch(err=>console.log(`Ошибка: ${err}`))
    }

    addLike(id){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers
        })  
        .then((res) => {
            return res.json();
        })
        .then((res) => {console.log('Лайк оставлен'); return res})
        .catch(err=>console.log(`Ошибка: ${err}`))
    }

    removeLike(id){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers
        })  
        .then((res) => {
            return res.json();
        })
        .then((res) => {console.log('Лайк убран'); return res})
        .catch(err=>console.log(`Ошибка: ${err}`))
    }

    updateUserAvatar(url){
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
              })
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {console.log('Аватар обновлён'); return res})
        .catch(err=>console.log(`Ошибка: ${err}`))
    }
}