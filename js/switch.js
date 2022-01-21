var can=document.querySelector('div.can');
var musicbox=document.querySelector('div.music_box');
var music=document.querySelector('div.music');
//table 在之前refresh中可能被刷新，只能动态获取
var table=null;
function changeM(){
    table=document.querySelectorAll('div.table');
    can.style.zIndex=100;
    musicbox.style.zIndex=200;
    music.style.display='block';
    for(let i=0;i<table.length;i++){
        table[i].style.display='none';
    }
    can.style.marginBottom='400px';
    notice.style.height='180px';
    notice.firstElementChild.style.display='none';
    // css 的路径以文件所在为基准，js 以执行脚本的文件所在为基准?但是这里是改的css文件啊，怪
    notice.style.backgroundImage='url(./image/decoration.jpeg)';
}
function changeC(){
    table=document.querySelectorAll('div.table');
    can.style.zIndex=200;
    musicbox.style.zIndex=100;
    music.style.display='none';
    for(let i=0;i<table.length;i++){
        table[i].style.display='block';
    } 
    can.style.marginBottom=0;
    notice.style.height='120px';
    notice.style.backgroundImage='none';
    notice.firstElementChild.style.display='block';
    refresh();
}