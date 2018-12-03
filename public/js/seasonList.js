let btnShowList=$('#btnShowList');
let btnShowBlock=$('#btnShowBlock');
let simpleList=$('#simple-list');
btnShowBlock[0].onclick=function (e) {
    btnShowBlock.attr('class','glyphicon glyphicon-th-large on');
    btnShowList.attr('class','glyphicon glyphicon-th-list')
    simpleList.attr('class','')
}
btnShowList[0].onclick=function (e) {
    btnShowBlock.attr('class','glyphicon glyphicon-th-large');
    btnShowList.attr('class','glyphicon glyphicon-th-list on')
    simpleList.attr('class','simple')
}