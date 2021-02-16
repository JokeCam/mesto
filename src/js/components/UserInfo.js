export class UserInfo{
    constructor(username, infoabout, profileimage){
        this._username = username,
        this._infoabout = infoabout,
        this._profileimage = profileimage

        this._name = '',
        this._job = ''
    };

    recieveUserInfo(){
        return {
            name: this._username.textContent,
            job: this._infoabout.textContent
        }
    } // recieves user info from the page

    setUserInfo(nameEdit, infoAbout){
        this._username.textContent = nameEdit;
        this._infoabout.textContent = infoAbout;
    }; // updates user info on the page

    setUserAvatar(picture){
        this._profileimage.src = picture;
    }
}