export class UserInfo{
    constructor(username, infoabout, profileimage){
        this._username = username,
        this._infoabout = infoabout,
        this._profileimage = profileimage
    };

    recieveUserInfo(){
        return {
            name: this._username.textContent,
            job: this._infoabout.textContent,
            avatar: this._profileimage.src
        }
    } // recieves user info from the page

    setUserInfo(nameEdit, infoAbout){
        if(nameEdit, infoAbout){
        this._username.textContent = nameEdit;
        this._infoabout.textContent = infoAbout;
        }
        return 'Ошибка'
    }; // updates user info on the page

    setUserAvatar(picture){
        if(picture){
        this._profileimage.src = picture;
        }
        return 'Ошибка'
    }
}