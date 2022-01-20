var can=document.querySelector('div.can');
var musicbox=document.querySelector('div.music_box');
var music=document.querySelector('div.music');
var table=document.querySelectorAll('div.table');
function changeM(){
    can.style.zIndex=100;
    musicbox.style.zIndex=200;
    music.style.display='block';
    for(let i=0;i<table.length;i++){
        table[i].style.display='none';
    }
    can.style.marginBottom='400px';
    notice.style.height='180px';
    notice.firstElementChild.innerHTML=null;
    // css 的路径以文件所在为基准，js 以执行脚本的文件所在为基准?但是这里是改的css文件啊，怪
    notice.style.backgroundImage='url(./image/decoration.jpeg)';
}
function changeC(){
    can.style.zIndex=200;
    musicbox.style.zIndex=100;
    music.style.display='none';
    for(let i=0;i<table.length;i++){
        table[i].style.display='block';
    } 
    can.style.marginBottom=0;
    notice.style.height='120px';
    notice.style.backgroundImage='none';
    refresh();
}