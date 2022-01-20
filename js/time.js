var time=document.querySelector('.header .header-r .tad .time');
var apm=document.querySelector('.header .header-r .tad .apm');
var date=document.querySelector('.header .header-r .tad .date');
var now=new Date();
var second=now.getSeconds();
var minute=now.getMinutes();
var hour=now.getHours();
function show(){
    if(hour>12&&hour<=24){
        hour-=12;
        apm.innerHTML="下午";
    }else if(hour==12){
        apm.innerHTML="下午";
    }else{
        apm.innerHTML="上午";
    }
    if(second.toString().length<2){
        second="0"+second;
    }
    if(minute.toString().length<2){
        minute="0"+minute;
    }
    if(hour.toString().length<2){
        hour="0"+hour;
    }
    time.innerHTML=hour+":"+minute+":"+second;
    date.innerHTML=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    now=new Date();
    second=now.getSeconds();
    minute=now.getMinutes();
    hour=now.getHours();
 }
show();
setInterval("show()",1000);