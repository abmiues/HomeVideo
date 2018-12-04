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
    sliderRightBtn.css('display','block')
    sliderLeftBtn.css('display','block')
    simpleList.css('transform','translateX('+(-currentTime*onClickRate)+"px)")
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

let sliderWidth=videoItem.length*128-1050;
let clickTimes=Math.floor(sliderWidth/1040+0.5);//四舍五入决定点击次数;
let onClickRate=sliderWidth/clickTimes;//每次点击步幅
let currentTime=0;
sliderRightBtn[0].onclick=function (e) {
    currentTime++;
    currentTime=Math.min(currentTime,clickTimes);
    if(currentTime>clickTimes)
    {
        currentTime=clickTimes;
    }
    else if(currentTime==clickTimes)
    {
        sliderRightBtn.css('display','none')
        ResetSliderBtn();
    }
    else
    {
        ResetSliderBtn();
    }
    sliderLeftBtn.css('display','block')
}
sliderLeftBtn[0].onclick=function (e) {
    currentTime--;
    if(currentTime<0)
    {
        currentTime=0;
    }
    else if(currentTime==0)
    {
        sliderLeftBtn.css('display','none')
        ResetSliderBtn();
    }
    else
    {
        ResetSliderBtn();
    }
    sliderRightBtn.css('display','block')
}


function ResetSliderBtn() {
    if(inSimpleMode)
        return;
    simpleList.css('transform','translateX('+(-currentTime*onClickRate)+"px)")
}