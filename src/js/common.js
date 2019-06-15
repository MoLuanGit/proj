// 生成随机n位数字
function getNumber(n = 4){
    if(typeof n != "number"){
        alert("getNumber函数需要一个数字作为参数！");
        return;
    }
    var arr = [];
    for(var i = 0; i < n ; i++){
        var temp = Math.floor(Math.random() * 10);
        arr.push(temp);
    }
    return arr.join("");
}

let myCookie = {
    getItem(key){
        let cookie = document.cookie.split("; ");
        for(let i = 0;i < cookie.length;i++){
            let tempArr = cookie[i].split("=");
            if(tempArr[0] == key){
                return tempArr[1];
            }
        }
    },
    setItem(key,val,date){
        if(!date){
            document.cookie = `${key}=${val}`;
        }else{
            let d = new Date();
            d.setDate(d.getDate()+date);
            document.cookie = `${key}=${val};expires=${d};path=/`;
        }               
    },
    removeItem(key){
        this.setItem(key,null,-1);
    },
    clear(){
        let res = this.keys();
        res.forEach(element => {
            this.setItem(element,null,-1);
        });
    },
    keys(){
        let cookie = document.cookie.split("; ");
        let res = [];
        for(let i = 0;i < cookie.length;i++){
            let tempArr = cookie[i].split("=");
            res.push(tempArr[0]);
        }
        return res;
    }
};

class LoadingLazy{
    constructor(ele){
        //获取所有图片
        this.imgLists = Array.from(document.querySelectorAll(ele));
        this.init();
    }
    init(){
        this.canLoading();
        this.bindEvent();
    }
    getPosition(ele){
        let position = ele.getBoundingClientRect();
        let clientHeight = window.innerHeight;
        //当图片快要出现在眼前，返回“处”，让图片调用加载的方法
        return position.top <= clientHeight - 100;
    }
    loadingImg(ele,i){
        //获取设置好的图片路径
        let src = ele.getAttribute("data-original");
        ele.src = src;
        // 删除已经加载的图片
        this.imgLists.splice(i,1);
    }
    canLoading(){
        let imgLists = this.imgLists;
        for(let i = imgLists.length;i--;){
            // 如果返回的是“处”，就加载
            this.getPosition(imgLists[i]) && this.loadingImg(imgLists[i],i);
        }
    }
    bindEvent(){
        window.addEventListener("scroll",()=>{
            //如果还有图片没加载完，继续判断是否可加载
            this.imgLists.length && this.canLoading();
        })
    }
}