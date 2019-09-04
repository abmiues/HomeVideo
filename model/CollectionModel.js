class CollectionModel{
    constructor() {}
    #_id;
    #_name;
    #_cover;
    #_time;
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
    get cover(){
       return this.#_cover;
    }
    set cover(val){
       this.#_cover=val;
    }
    get time(){
       return this.#_time;
    }
    set time(val){
       this.#_time=val;
    }
}
module.exports=CollectionModel;