class BangumiGroupModel{
    constructor() {}
    #_id;
    #_name;
    get id(){
       return this.#_id;
    }
    set id(val){
       this.#_id=val;
    }
    get name(){
       return this.#_name;
    }
    set name(val){
       this.#_name=val;
    }
}
module.exports=BangumiGroupModel;