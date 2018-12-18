let btnShowList=$('#btnShowList');
let btnShowBlock=$('#btnShowBlock');
let simpleList=$('#simple-list');
let sliderRightBtn=$('.slider-right-btn');
let sliderLeftBtn=$('.slider-left-btn');
let videoItem=$('#simple-list li')
let inSimpleMode=false;
btnShowBlock[0].onclick=function (e) {
    btnShowBlock.attr('class','glyphicon glyphicon-th-large on');
    btnShowList.attr('class','glyphicon glyphicon-th-list')
    simpleList.attr('class','')
    inSimpleMode=false
    SetSlider();
}
btnShowList[0].onclick=function (e) {
    btnShowBlock.attr('class','glyphicon glyphicon-th-large');
    btnShowList.attr('class','glyphicon glyphicon-th-list on')
    simpleList.attr('class','simple')
    inSimpleMode=true;
    sliderRightBtn.css('display','none')
    sliderLeftBtn.css('display','none')
    simpleList.css('transform','translateX('+0+"px)")
}

let currentVideoIndex=0;
let sliderShowWidth=1050;
let currentPos=0;
let sliderWidth=videoItem.length*128-sliderShowWidth;
Init();
function Init() {
    currentVideoIndex=0;
    onListItemClick(currentVideoIndex);
    let parent=simpleList[0];
    let count=simpleList[0].childElementCount;
    for (let i=0;i<count;i++)
    {

        let child= parent.children[i];
        let index=i;
        child.onclick=function (e){onListItemClick(index);}
    }
    SetSlider();
}
sliderRightBtn[0].onclick=function (e) {
    let offset=sliderWidth-currentPos;
    if(offset==0)
    {
        currentPos=sliderWidth;
    }
    else
    {
        currentPos+=(offset/(offset/sliderShowWidth)-25);
    }
    SetSlider()
    if(currentPos>=sliderWidth)
        sliderRightBtn.css('display','none');
    sliderLeftBtn.css('display','block')
}
sliderLeftBtn[0].onclick=function (e) {
    let times=currentPos/sliderShowWidth;
    if(times==0)
    {
        currentPos=0;
    }
    else
    {
        currentPos-=(currentPos/times-25)
    }
    SetSlider()
    if(currentPos==0)
        sliderLeftBtn.css('display','none');
    sliderRightBtn.css('display','block');
}

function onListItemClick(index) {
    currentPos=128*index;
    let parent=simpleList[0];
    if(currentVideoIndex<parent.childElementCount){
        parent.children[currentVideoIndex].setAttribute('class','')
        currentVideoIndex=index;
        parent.children[currentVideoIndex].setAttribute('class','on')
        SetSlider();
    }
}
function SetSlider() {
    if(inSimpleMode)
        return;
    currentPos=Math.max(Math.min(sliderWidth,currentPos),0);
    simpleList.css('transform','translateX('+(-currentPos)+"px)")
    sliderRightBtn.css('display',currentPos==sliderWidth?'none':'block')
    sliderLeftBtn.css('display',currentPos==0?'none':'block')
}