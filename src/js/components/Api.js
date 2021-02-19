export class Api {
    constructor(option){

    this._url = option.baseUrl
    this._headers = option.headers
    }

    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then((res) => {
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((res) => {return res})
    }

    getCards(){
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
        .then((res) => {
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
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
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then(res => {console.log('Данный обновлены'); return res})
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
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then(res=> {console.log('Карточка добавлена'); return res})
    }

    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then((res) => {
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((res) => console.log(res))
    }

    addLike(id){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers
        })  
        .then((res) => {
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((res) => {console.log('Лайк оставлен'); return res})
    }

    removeLike(id){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers
        })  
        .then((res) => {
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((res) => {console.log('Лайк убран'); return res})
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
            if (res.ok){
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((res) => {console.log('Аватар обновлён'); return res})
    }
}