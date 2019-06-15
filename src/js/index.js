$(function () {
    $(".header-wrap").load("/src/tpl/header.html");
    $("#footer-wrap").load("/src/tpl/footer.html");
    $(".sidebar-wrap").load("/src/tpl/side.html");

    let lazy = new LoadingLazy("img"); //图片懒加载

    let ycNav = $("#yc-nav-box");
    let ycNavItems = $("#yc-nav-box .yc-nav-item");
    let navItemsBox = $(".nav-item-box");
    let arrTop = []
    navItemsBox.each(function (index) {
        arrTop.push($(this).offset().top);
    });
    let arrTopFirst = arrTop[0];
    let arrTopLast = arrTop[arrTop.length - 1] + 400;
    // 隐藏的
    $(document).scroll(function (e) {
        let scrollTop = $("body,html").scrollTop();
        //搜索条
        if (scrollTop > 600) {
            $("#yc-search-box").addClass("yc-search-show");
        } else {
            $("#yc-search-box").removeClass("yc-search-show");
        }

        // 左侧导航显示和隐藏      
        if (scrollTop > arrTopFirst && scrollTop < arrTopLast) {
            ycNav.show();
        } else {
            ycNav.hide();
        }
    });
    // 左侧导航点击事件
    $("#main-wrap").on("click", ".yc-nav-item", function () {
        let index = $(this).index();
        let tempTop = arrTop[index];
        ycNavItems.eq(index).addClass("cur").siblings().removeClass("cur");
        $("body,html").stop().animate({
            scrollTop: tempTop + 220
        }, 200);
    });

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
    $(".ei-item").mouseenter(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        if ($(this).hasClass("ei-notice")) {
            $(".notice").show();
            $("#ei-tip-list").hide();
        } else {
            $(".notice").hide();
            $("#ei-tip-list").show();
        }
    });

    // 切换明星商家列表
    let isShowFlag = true;
    $("#brand_change").click(() => {
        isShowFlag = !isShowFlag;
        if (isShowFlag) {
            $("#brand_rec_list").fadeIn();
        } else {
            $("#brand_rec_list").fadeOut();
        }
    });

    // 友情链接切换
    $("#f-link .hd li").mouseenter(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        let index = $(this).index();
        $("#f-link .ft").hide();
        $("#f-link .ft").eq(index).show();
    });


});