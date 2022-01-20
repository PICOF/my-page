    var t1=document.querySelector('.todo tbody');
    var t2=document.querySelector('.done tbody');
    var add=document.querySelector(".add");
    var cache=null;
    if(localStorage.getItem("todo")!=null){
        t1.innerHTML=localStorage.getItem("todo");
    }
    if(localStorage.getItem("done")){
        t2.innerHTML=localStorage.getItem("done");
    }
    var box=document.querySelectorAll('.obj');
    var del=document.querySelectorAll('.obj button');
    for(var i=0;i<box.length;i++){
        box[i].ondragstart=function(){
            cache=this;
        }
        box[i].ondragend=function(){
            cache=null;
        }
        del[i].onclick=function(){
            this.parentNode.parentNode.remove();
            localStorage.setItem('todo',t1.innerHTML);
            localStorage.setItem('done',t2.innerHTML);
            prem=0;
            refresh();
        }
    }
    add.onclick=function(){
        var now = new Date();
        var task=document.getElementById('task');
        var time=document.getElementById('time');
        if(!task.value){
            alert('请输入待办事项！');
            return;
        }else if(!time.value){
            alert('请输入DDL！');
            return;
        }else if(now.getTime()>(new Date(parseInt(time.value.slice(0,4)),parseInt(time.value.slice(5,7))-1,parseInt(time.value.slice(8,10)))).getTime()){
            alert('DDL不得早于立项时间！');
            return;
        }
        let tr=document.createElement('tr');
        tr.className="obj";
        tr.draggable=true;
        let td1=document.createElement('td');
        td1.innerText=task.value;
        let td2=document.createElement('td');
        td2.innerText=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
        let td3=document.createElement('td');
        td3.innerText=time.value;
        let td4=document.createElement('td');
        let btn4=document.createElement('button');
        //btn4.innerText="删除";
        btn4.onclick=function(){
            this.parentNode.parentNode.remove();
            localStorage.setItem('todo',t1.innerHTML);
            localStorage.setItem('done',t2.innerHTML);
        }
        td4.appendChild(btn4);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.ondragstart=function(){
            cache=this;
        }
        tr.ondragend=function(){
            cache=null;
        }
        t1.appendChild(tr);
        task.value=null;
        time.value=null;
        localStorage.setItem('todo',t1.innerHTML);
        prem=0;
        refresh();
    }
    t1.ondragover = t2.ondragover = function (e) {
    e.preventDefault();
    }
    t1.ondrop = t2.ondrop = function () {
        this.appendChild(cache);
        localStorage.setItem('todo',t1.innerHTML);
        localStorage.setItem('done',t2.innerHTML);
        prem=0;
        refresh();
    }