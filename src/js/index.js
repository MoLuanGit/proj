$(function () {
    //首页轮播
    function powerSwitchFun() {
        $("#slides a").each(function (index, ele) {
            var id = "Image" + index;
            ele.id = id;
        });
        $("#control-wz a").each(function (index, ele) {
            var id = "Image" + index;
            $(this).attr("data-rel", id);
        });
        $("#control-wz").find("a").powerSwitch({
            eventType: "hover",
            classAdd: "flex-active",
            animation: "fade",
            autoTime: 4000,
            classPrefix: "flex",
            container: $(".flex-direction-nav"),
        }).eq(0).trigger("mouseover");
    }
    powerSwitchFun();


    // 切换公告和小贴士
    $(".ei-item").mouseenter(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        if($(this).hasClass("ei-notice")){
            $(".notice").show();
            $("#ei-tip-list").hide();
        }else{
            $(".notice").hide();
            $("#ei-tip-list").show();
        }
    });

    // 切换明星商家列表
    let isShowFlag = true;
    $("#brand_change").click(()=>{
        isShowFlag = !isShowFlag;
        if(isShowFlag){
            $("#brand_rec_list").fadeIn();
        }else{
            $("#brand_rec_list").fadeOut();
        }
    });

    // 友情链接切换
    $("#f-link .hd li").mouseenter(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        let index = $(this).index();
        $("#f-link .ft").hide();
        $("#f-link .ft").eq(index).show();
    });
});