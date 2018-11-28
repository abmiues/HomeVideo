let videoCss=$('.video-main');
let videoMain=videoCss[0];
var slider=$('.bar-area')[0];
var flag=$('.time-flag');
var btnplay=$('#btn-play');
let textTimeAll=$('.play-alltime');
let textTimeNow=$('.play-time');
let playBar=$('.playbar');
let buffbar=$('.buffbar');
let soundSlider=$('#sound-slider');
let soundText=$('#sound-slider-box span');
//let soundBtn=$('#sound')[0];
//let soundSliderBox=$('#sound-slider-box');
let duration=0;
videoMain.addEventListener('play',function () {

})
videoMain.addEventListener('waiting',function () {
    console.log("缓冲中")
})
videoMain.addEventListener('canplay',function () {
    console.log("canplay")
})
videoMain.addEventListener('loadedmetadata',function () {
    playBar.css('width','0%')
    buffbar.css('width','0%')
    soundSlider[0].value=videoMain.volume*100;
    soundText.text(videoMain.volume*100);
    duration=videoMain.duration;
    textTimeAll.text(formatTime(duration))
    textTimeNow.text("00:00")
})
videoMain.addEventListener('loadeddata',function (data) {
    console.log("loadeddata")
})
videoMain.addEventListener('progress',function () {
    let buffer=videoMain.buffered;
    console.log(buffer)
    let length=buffer.length;
    if(length>0)
    {
        buffbar.css('width',buffer.end(length-1)*100/duration+'%')
    }
})
videoMain.addEventListener('timeupdate',function (data) {
    let currentTime=videoMain.currentTime;
    textTimeNow.text(formatTime(currentTime))
    playBar.css('width',currentTime*100/duration+"%")
})
//videoMain.addEventListener()

let selectTime=0;
let sliderPressDown=false;
let inslider=false;
/*
注册全局鼠标移动，用于按下拖拽情况，同时屏蔽播放面的所有拖拽事件
 */
document.onmousemove=MouseMove;
/*
注册全局鼠标弹起，用于结束拖拽状态，同时设置播放位置
 */
document.onmouseup=MouseUp;
/*soundBtn.onmouseenter=function(e)
{
    console.log('do')
    soundSliderBox.css('display','block')
}
soundBtn.onmouseleave=function(e){
    soundSliderBox.css('display','none')
}*/
slider.onmousedown=OnSliderDown;
slider.onmousemove=OnSliderMove;
slider.onmouseenter=OnSliderMouseEnter;
slider.onmouseleave=OnSliderMouseLeave;
soundSlider.bind('input propertychange',OnSoundChange);

function OnSliderMove (a) {
    let mousePosX=a.clientX;//获取鼠标全局坐标
    let rect=slider.getBoundingClientRect();//获取进度条位置矩形
    let offsetX=mousePosX-rect.left;//计算鼠标距离进图条坐标最左边位置,只能用left,x是chrome用的
    let selectPre=offsetX/slider.offsetWidth;//计算比例
    selectPre=Math.min(1,Math.max(0,selectPre))//math.clamp(0,1,x),限制值范围在0-1
    selectTime=duration*selectPre;//比例乘上时间，得到需要跳转的时间
    flag.text(formatTime(selectTime))//先设置值
    flag.css('left',offsetX-flag[0].offsetWidth/2);//再获取尺寸
    if(sliderPressDown)//如果处于点击状态，实时设置进图条
    {
        playBar.css('width',selectTime*100/duration+"%")
    }
}
function OnSliderDown(a) {
    sliderPressDown=true;
}
function OnSliderMouseEnter(e) {
    flag.css('display','block');
    inslider=true;
}
function OnSliderMouseLeave(e) {
    if(!sliderPressDown)
    {
        flag.css('display','none');
    }
    inslider=false;
}
function MouseMove (e) {
    if(sliderPressDown)
    {
        OnSliderMove(e);
    }
}
function MouseUp(e) {
    console.log("up")
    if(sliderPressDown)
    {
        if(!inslider)
            flag.css('display','none');
        videoMain.currentTime=selectTime;
        sliderPressDown=false;
    }
}
function play() {
    if(!videoMain.paused)
    {
        videoMain.pause();
        btnplay.attr("class", " glyphicon glyphicon-play");
    }
    else
    {
        videoMain.play();
        btnplay.attr("class", " glyphicon glyphicon-pause");
    }
}
function OnSoundChange(event) {
    let value=soundSlider[0].value;
    soundText.text(value);
    videoMain.volume=value/100;
}
function formatTime(time) {
    time=Math.max(time,0);
    if(time>3600)
    {
        let h=parseInt(time/3600);
        let m=parseInt(time%3600/60);
        let s=parseInt(time%60);
        return (h>9?'':'0')+h+":"+(m>9?'':'0')+m+":"+(s>9?'':'0')+s;
    }
    else
    {
        let m=parseInt(time%3600/60);
        let s=parseInt(time%60);
        return (m>9?'':'0')+m+":"+(s>9?'':'0')+s;
    }
}
