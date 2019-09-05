class BangumiVideoModel{
    constructor() {}
    /**
    * 主键
    */
    id;
    /**
    * 名字
    */
    name;
    /**
    * 描述
    */
    des;
    /**
    * 扩展名，不带‘.’号
    */
    extension;
    /**
    * 完整路径
    */
    path;
    /**
    * 添加时间
    */
    addtime;
    /**
    * 封面路径
    */
    cover;
    /**
    * 视频尺寸，kb
    */
    size;
    /**
    * 是否是某个番剧的合集
    */
    belong;
    /**
    * 视频序号，合集视频有序号，其他没有
    */
    part;
}
module.exports=BangumiVideoModel;