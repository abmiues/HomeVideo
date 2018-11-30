let videoBox=$('.video-box')[0]
let videoCss=$('.video-main video');
let videoMain=videoCss[0];
var slider=$('.bar-area')[0];
var flag=$('.time-flag');
var btnplay=$('#btn-play');
let textTimeAll=$('.play-alltime');
let textTimeNow=$('.play-time');
let playBar=$('.playbar');
let buffbar=$('.buffbar');
let videoControl=$('.video-control');
let videoControlPanel=$('.video-control-panel');
let soundBtn=$('#sound')[0];
let fullScreenBtns=$('#fullscreen');
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
    soundText.text(videoMain.volume*100);
    duration=videoMain.duration;
    textTimeAll.text('/'+formatTime(duration))
    textTimeNow.text("00:00")
    SetVolume(60)
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

let selectTime=0;
let sliderPressDown=false;
let inFlagShow=false;//时间标签是否显示
let isFullScreen=false;
let oncePlay=false;
let mouseInVideoBox=false;//鼠标是否在视频容器内
let isVideoBoxVisible=true;
let mouseInControlBox=false;
let time;
//只有没点击时执行
function OnSliderMove(e) {
    if(!sliderPressDown)
        PlayerBarMove(e);
}
function OnSliderDown(a) {
    sliderPressDown=true;
    PlayerBarMove(a);
}
function OnSliderMouseEnter(e) {
    flag.css('display','block');
    inFlagShow=true;
}
function OnSliderMouseLeave(e) {
    if(!sliderPressDown)
    {
        flag.css('display','none');
    }
    inFlagShow=false;
}
function PlayerBarMove (a) {
    let mousePosX=a.clientX;//获取鼠标全局坐标
    let rect=slider.getBoundingClientRect();//获取进度条位置矩形
    let offsetX=mousePosX-rect.left;//计算鼠标距离进图条坐标最左边位置,只能用left,x是chrome用的
    offsetX=Math.min(slider.offsetWidth,Math.max(0,offsetX))
    let selectPre=offsetX/slider.offsetWidth;//计算比例
    selectTime=duration*selectPre;//比例乘上时间，得到需要跳转的时间
    flag.text(formatTime(selectTime))//先设置值
    flag.css('left',offsetX-flag[0].offsetWidth/2);//再获取尺寸
    if(sliderPressDown)//如果处于点击状态，实时设置进图条
    {
        playBar.css('width',selectTime*100/duration+"%")
    }
}
function MouseMove (e) {
    if(mouseInVideoBox&&oncePlay)
    {
        if(time)
        {
            clearTimeout(time,false);
        };
        SetVideoBoxVisible(true);
        time=window.setTimeout('SetVideoBoxVisible(false)',1000);
    }
    if(sliderPressDown)
    {
        PlayerBarMove(e);
    }
    if(soundPress)
    {
        OnSoundSliderChange(e);
    }
}
function MouseUp(e) {
    console.log("up")
    if(sliderPressDown)
    {
        if(!inFlagShow)
            flag.css('display','none');
        videoMain.currentTime=selectTime;
        sliderPressDown=false;
    }
    if(soundPress)
    {
        soundSliderBox.css('display','none');
        soundPress=false;
    }

}
function OnSoundBtnEnter(e) {
    soundSliderBox.css('display','block')
}
function OnSoundBtnLeave(e) {
    if(!soundPress)
        soundSliderBox.css('display','none')
}
function OnFullScreenClick(e) {
    if(!isFullScreen)
    {
        if (videoBox .requestFullscreen) {
            videoBox .requestFullscreen();
        } else if (videoBox .mozRequestFullScreen) {
            videoBox .mozRequestFullScreen();
        } else if (videoBox .webkitRequestFullScreen) {
            videoBox .webkitRequestFullScreen();
        }
    }
    else
    {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.oRequestFullscreen){
            document.oCancelFullScreen();
        }else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

}
function playOrPause() {
    if(!videoMain.paused)
    {
        videoMain.pause();
        btnplay.attr("class", " glyphicon glyphicon-play");
    }
    else
    {
        videoMain.play();
        if(!oncePlay)
        {
            time=setTimeout('SetVideoBoxVisible(false)',1000);
            oncePlay=true;
        }
        btnplay.attr("class", " glyphicon glyphicon-pause");
    }
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
function FullScreenChanged(isFull) {
    console.log(isFull?'full':'quitfull')
    isFullScreen=isFull;
    fullScreenBtns.attr("class", isFull?" glyphicon glyphicon-resize-small":" glyphicon glyphicon-resize-full");
    if(isFull)
    {

    }
    else
    {
        videoControlPanel.css('display','block')
    }
}
function OnVideoBoxEnter(e) {
    SetVideoBoxVisible(true);
    mouseInVideoBox=true;
}
function OnVideoBoxLeave(e){
    SetVideoBoxVisible(false);
    mouseInVideoBox=false;
}
function OnControlBoxEnter(e) {
    mouseInControlBox=true;
}
function OnControlBoxLeave(e) {
    mouseInControlBox=false;
}
function SetVideoBoxVisible(visible){
    if(!oncePlay||mouseInControlBox)
        return;
    if(isVideoBoxVisible==visible)
        return;
    isVideoBoxVisible=visible;
    if(isFullScreen)
    {
        videoControlPanel.css('display',visible?'block':'none')
    }
    else
    {
        if(visible)
        {
            videoControl.css('left','10px')
            videoControl.css('right','10px')
            videoControl.css('bottom','0')
        }
        else
        {
            videoControl.css('left','0')
            videoControl.css('right','0')
            videoControl.css('bottom','-41px')
        }
    }
    console.log(visible)
}
/*
注册全局鼠标移动，用于按下拖拽情况，同时屏蔽播放面的所有拖拽事件
 */
document.onmousemove=MouseMove;
/*
注册全局鼠标弹起，用于结束拖拽状态，同时设置播放位置
 */
document.onmouseup=MouseUp;
slider.onmousedown=OnSliderDown;
slider.onmousemove=OnSliderMove;
slider.onmouseenter=OnSliderMouseEnter;
slider.onmouseleave=OnSliderMouseLeave;
soundBtn.onmouseenter=OnSoundBtnEnter;
soundBtn.onmouseleave=OnSoundBtnLeave;
fullScreenBtns[0].onclick=OnFullScreenClick;

videoBox.addEventListener("fullscreenchange", function(){FullScreenChanged(document.fullscreen);}, false);
videoBox.addEventListener("mozfullscreenchange", function(){FullScreenChanged(document.mozFullScreen);}, false);
videoBox.addEventListener("webkitfullscreenchange", function(){FullScreenChanged(document.webkitIsFullScreen);}, false);
videoBox.addEventListener("msfullscreenchange", function(){FullScreenChanged(document.msFullscreenElement);}, false);
videoBox.onmouseenter=OnVideoBoxEnter;
videoBox.onmouseleave=OnVideoBoxLeave;
videoControl[0].onmouseenter=OnControlBoxEnter;
videoControl[0].onmouseleave=OnControlBoxLeave;
//-------音频相关--------//
let soundSliderBox=$('#sound-slider-box-2');
let soundSliderBar=$('#sound-slider-bar')[0];
let soundRadio=$('#sound-radio');
let soundText=$('#sound-slider-box-2 span');
let soundPress=false;

soundSliderBar.onmousedown=soundSliderMouseDown;
function soundSliderMouseDown(event) {
    soundPress=true;
    OnSoundSliderChange(event)
}
function OnSoundSliderChange(a) {
    let mousePosY=a.clientY//获取鼠标全局坐标
    let rect=soundSliderBar.getBoundingClientRect();//获取进度条位置矩形
    SetVolume(rect.bottom-mousePosY);//计算鼠标距离进图条坐标最左边位置,只能用bottom
}
function SetVolume(volume) {
    volume=Math.min(100,Math.max(0,volume))//math.clamp(0,1,x),限制值范围在0-1
    soundText.text(parseInt(volume))//先设置值
    soundRadio.css('top',(126-volume)+'px');//再获取尺寸
    videoMain.volume=volume/100;
}
//-------音频相关--------//

