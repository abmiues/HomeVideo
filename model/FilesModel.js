class FilesModel{
    constructor() {}
    /**
    * 
    */
    id;
    /**
    * md5值
    */
    md5;
    /**
    * 文件大小，字节单位
    */
    filesize;
    /**
    * 文件名
    */
    filename;
    /**
    * 上传时间
    */
    time;
    /**
    * 扩展名
    */
    ext;
    /**
    * 保存在文件系统中的名字
    */
    path;
}
module.exports=FilesModel;