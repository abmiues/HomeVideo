class UsersModel{
    constructor() {}
    /**
    * 
    */
    uid;
    /**
    * 账号
    */
    account;
    /**
    * 密码Md5,由客户端计算完成,防止传输过程中显示明文密码
    */
    pwd;
    /**
    * 
    */
    name;
    /**
    * 创建时间
    */
    time;
    /**
    * 头像
    */
    icon;
}
module.exports=UsersModel;