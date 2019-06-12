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