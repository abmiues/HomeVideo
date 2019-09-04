class UsersModel{
    constructor() {}
    #_uid;
    #_account;
    #_pwd;
    #_name;
    #_time;
    #_icon;
    get uid(){
       return this.#_uid;
    }
    set uid(val){
       this.#_uid=val;
    }
    get account(){
       return this.#_account;
    }
    set account(val){
       this.#_account=val;
    }
    get pwd(){
       return this.#_pwd;
    }
    set pwd(val){
       this.#_pwd=val;
    }
    get name(){
       return this.#_name;
    }
    set name(val){
       this.#_name=val;
    }
    get time(){
       return this.#_time;
    }
    set time(val){
       this.#_time=val;
    }
    get icon(){
       return this.#_icon;
    }
    set icon(val){
       this.#_icon=val;
    }
}
module.exports=UsersModel;