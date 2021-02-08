export class UserInfo{
    constructor(username, infoabout){
        this._username = username,
        this._infoabout = infoabout
    }

    getUserInfo(){
        const userInfoObj = {name: '', about: ''};
        const userName = document.querySelector('.profile__title').textContent;
        const userAbout = document.querySelector('.profile__subtitle').textContent;

        userInfoObj.name = userName;
        userInfoObj.about = userAbout;

        return userInfoObj;
    } // recieves user info from the page

    setUserInfo(){
        const name = document.querySelector('.profile__title');
        const about = document.querySelector('.profile__subtitle');

        name.textContent = this._username;
        about.textContent = this._infoabout;
    } // updates user info on the page
}