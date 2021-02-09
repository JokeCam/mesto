export class UserInfo{
    constructor(username, infoabout){
        this._username = username,
        this._infoabout = infoabout,

        this._name = '',
        this._job = ''
    };

    recieveUserInfo(){
        return {
            name: this._username.textContent,
            job: this._infoabout.textContent
        }
    }

    updateUserInfo(nameEdit, infoAbout){
        this._name = nameEdit;
        this._job = infoAbout;
    }; // recieves user info from the page

    setUserInfo(){
        this._username.textContent = this._name;
        this._infoabout.textContent = this._job;
    }; // updates user info on the page
}