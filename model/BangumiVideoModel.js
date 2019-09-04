class BangumiVideoModel{
    constructor() {}
    #_id;
    #_name;
    #_des;
    #_extension;
    #_path;
    #_addtime;
    #_cover;
    #_size;
    #_belong;
    #_part;
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
    get des(){
       return this.#_des;
    }
    set des(val){
       this.#_des=val;
    }
    get extension(){
       return this.#_extension;
    }
    set extension(val){
       this.#_extension=val;
    }
    get path(){
       return this.#_path;
    }
    set path(val){
       this.#_path=val;
    }
    get addtime(){
       return this.#_addtime;
    }
    set addtime(val){
       this.#_addtime=val;
    }
    get cover(){
       return this.#_cover;
    }
    set cover(val){
       this.#_cover=val;
    }
    get size(){
       return this.#_size;
    }
    set size(val){
       this.#_size=val;
    }
    get belong(){
       return this.#_belong;
    }
    set belong(val){
       this.#_belong=val;
    }
    get part(){
       return this.#_part;
    }
    set part(val){
       this.#_part=val;
    }
}
module.exports=BangumiVideoModel;