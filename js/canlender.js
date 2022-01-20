var date=new Date();
var dtshow=document.querySelector('div.control input');
var dayblock=document.querySelectorAll('div.week div');
var el = document.getElementById('Cbody');
var things=document.querySelectorAll('.todo tr td:nth-child(1)');
var notice=document.querySelector('#notice');
var mon=date.getMonth()+1;
var day=date.getDate();
var num=0;
var prem=0;
if(mon.toString().length<2){
    mon="0"+mon;
}
if(day.toString().length<2){
    day="0"+day;
}
//console.log(mon);
dtshow.value=date.getFullYear()+"-"+mon+"-"+day;
for(var i=0;i<6;i++){
    var wt=document.createElement('div');
    wt.className='week table';
    for(var j=0;j<7;j++){
        wt.innerHTML=wt.innerHTML+
        '<div></div> ';
    }
    el.appendChild(wt);
}
function refresh(){
    num=0;
    var ndate=dtshow.value;
    //console.log(ndate);
    var ny=ndate.slice(0,4);
    var nm=ndate.slice(5,7);
    var nd=ndate.slice(8,10);
    var DDL=document.querySelectorAll('.todo tr td:nth-child(3)');
    things=document.querySelectorAll('.todo tr td:nth-child(1)');
    if(nm.indexOf('0')==0){
        nm=nm.substring(1);
    }
    if(nd.indexOf('0')==0){
        nd=nd.substring(1);
    }
    //console.log(ny+' '+nm+' '+nd);
    var ntime= new Date(ny,nm-1,1);
    var dlen= (new Date(ny,nm,0)).getDate();
    var index=ntime.getDay();
    //console.log(dlen);
    if(index==0){
        index=7;
    }//注意星期日对应的数字是0，坑死我了
    if(prem!=nm){
        cloneC();
    }
    for(var i=0;i<dayblock.length;i++){
        if(i<dlen+index-1&&i>=index-1){
            dayblock[i].innerHTML=i-index+2;
            dayblock[i].style.color='black';
            if(i-index+2==nd){
                dayblock[i].style.backgroundColor='rgba(243, 115, 65, 0.726)';
            }else{
                if(((i+1)%7==0)){
                    dayblock[i].style.backgroundColor='rgba(65, 193, 243, 0.726)';
                }else{
                    dayblock[i].style.backgroundColor='rgba(255, 255, 255, 0.829)';
                }
            }
        }else{
            dayblock[i].innerHTML=null;
        }
    }
    for(let i=1;i<DDL.length;i++){
        if(DDL[i].innerHTML.length<10||ndate.slice(0,7)!=DDL[i].innerHTML.slice(0,7)){
            continue;
        }
        if(prem!=nm){
            dayblock[parseInt(DDL[i].innerHTML.slice(8,10))+index-2].addEventListener("mouseover",()=>adinfo(i));
            dayblock[parseInt(DDL[i].innerHTML.slice(8,10))+index-2].addEventListener("mouseout",rmov);
        }
        if((DDL[i].innerHTML.slice(8,10))==nd){
            num++;
            continue;
        }
        dayblock[parseInt(DDL[i].innerHTML.slice(8,10))+index-2].style.backgroundColor='rgb(88, 189, 110)';
        dayblock[parseInt(DDL[i].innerHTML.slice(8,10))+index-2].style.color='white';
    }
    primeshow();
    if(prem!=nm){
        prem=nm;
    }
}
function cloneC(){
    //这一句不能少，因为上一轮复制已经将旧的el替换后扔掉了
    el = document.getElementById('Cbody');
    elClone = el.cloneNode(true);
    console.log(el.parentNode);
    el.parentNode.replaceChild(elClone, el);
    dayblock=document.querySelectorAll('div.week div');
    for(var i=0;i<dayblock.length;i++){
        dayblock[i].onclick=function(){
            var y=this.innerHTML
            if(y.toString().length<2){
                y='0'+y;
            }
            dtshow.value=dtshow.value.slice(0,-2)+y
            refresh();
        }
    }
}
function primeshow(){
    var tips=document.querySelector('#notice div.tips');
    if(num==0){
        tips.innerHTML='你这一天没有预定要完成的事项哦';
    }else{
        tips.innerHTML='你这一天有 '+num+' 件预定要完成的事项';
    }
}
function rmov(){
    var tar=document.querySelectorAll('#notice div.thing');
    for(var i=0;i<tar.length;i++){
        tar[i].remove();
    }
}
function adinfo(i){
    var tdiv=document.createElement('div');
    tdiv.className='thing';
    tdiv.innerHTML='-'+things[i].innerHTML+'-';
    notice.appendChild(tdiv);
}
function pre_mon(){
    var x=dtshow.value;
    var mm=x.substring(5,7);
    var dd=x.substring(8,10);
    if(mm.indexOf('0')==0){
        mm=mm.substring(1);
    }
    mm=parseInt(mm)-1;
    if(mm==0){
        mm=12
    }
    var dlen=(new Date(x.slice(0,4),mm,0)).getDate();
    if(mm.toString().length<2){
        mm="0"+mm;
    }
    if(parseInt(dd)>dlen){
        dd=dlen;
    }
    dtshow.value=x.slice(0,5)+mm+"-"+dd;
    refresh();
}
function next_mon(){
    var x=dtshow.value;
    var mm=x.substring(5,7);
    var dd=x.substring(8,10);
    if(mm.indexOf('0')==0){
        mm=mm.substring(1);
    }
    mm=parseInt(mm)+1;
    if(mm==13){
        mm=1
    }
    var dlen=(new Date(x.slice(0,4),mm,0)).getDate();
    if(mm.toString().length<2){
        mm="0"+mm;
    }
    if(parseInt(dd)>dlen){
        dd=dlen;
    }
    dtshow.value=x.slice(0,5)+mm+"-"+dd;
    refresh();
}
refresh();
dtshow.onchange=function(){
    refresh();
}
// refresh();
// setInterval('refresh()',1000);//使用onchange规避循环检测