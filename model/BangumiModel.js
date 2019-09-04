class BangumiModel{
    constructor() {}
    #_id;
    #_name;
    #_cover;
    #_time;
    #_group;
    #_part;
    #_des;
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
    get group(){
       return this.#_group;
    }
    set group(val){
       this.#_group=val;
    }
    get part(){
       return this.#_part;
    }
    set part(val){
       this.#_part=val;
    }
    get des(){
       return this.#_des;
    }
    set des(val){
       this.#_des=val;
    }
}
module.exports=BangumiModel;