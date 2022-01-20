var hd = document.getElementById('hd');
hd.onmouseover = function () {
    hd.style.top='0px';
}
hd.onmouseleave= function () {
    if(window.pageYOffset>100){
        hd.style.top='-100px';
    }
}
window.onscroll=function () { // 页面发生scroll事件时触发
    if(window.pageYOffset<=100){
        hd.style.top='0px';
    }else{
        hd.style.top='-100px';
    }
    // console.log(window.scrollY);
};