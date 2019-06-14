$(function () {
    $(".header-wrap").load("../tpl/header.html");
    $("#footer-wrap").load("../tpl/footer.html");
    $(".sidebar-wrap").load("../tpl/side.html");
    
    let urlPage = location.search.substr(1);
    let nowPage = urlPage.split("=")[1] || 1;

    // 请求
    function networkPage(nowPage,sort="") {
        $("#search_result")[0].innerHTML = "";
        $.get({
            url: "../api/list.php",
            data: {
                "nowPage": nowPage,
                "sort":sort
            },
            success(res) {
                let result = JSON.parse(res);
                $(".page_text").text(`${nowPage}/${result.allPage}`);
                $("#prevP a").attr("href", `list.html?nowPage=${Number(nowPage)-1}`);
                $("#nextP a").attr("href", `list.html?nowPage=${Number(nowPage)+1}`);
                if (nowPage == 1) {
                    $("#prevP a").attr("href", "#").css("background","#ccc");
                }
                if (nowPage == result.allPage) {
                    $("#nextP a").attr("href", "#").css("background","#ccc");
                }
                // 生成列表
                let html = "";
                $.each(result.lists, function (i, ele) {
                    html += ` <div class="mod">
                    <dl class="b_prod">
                        <dt class="pic">
                            <a href="" title="${ele.title}">
                                <img src="../${ele.src}" alt="${ele.title}"
                                    style="width: 100px; height: 100px; padding-top: 0px;">
                            </a>
                        </dt>
                        <dd class="b_info">
                            <p class="tit">
                                <a href="" title="${ele.title}">
                                    ${ele.title}
                                    <span class="madeIn"> --【${ele.madeIn}】</span>
                                </a>
                            </p>
                            <p class="c_name">
                                通用名称：
                                <a href="">${ele.title}</a>
                            </p>
                        </dd>
                    </dl>
                    <span class="pdPrice">
                        <b>￥</b>${ele.price}
                    </span>
                    <a class="goNextBtn" href="../html/goods.html?id=${ele.id}">查看商品详情 &gt;</a>
                </div>`;
                });
                $("#search_result").append(html);

                // 生成分页                
                let pageHtml = "";
                let selec = "";
                if (nowPage == 1) {
                    pageHtml += `<span class="nextprev">首 页</span>
                    <span class="nextprev">«上一页</span>`;
                } else {
                    pageHtml += `<a href="list.html?nowPage=${Number(nowPage)-1}">上一页»</a>
                    <a href="list.html?nowPage=1">首页</a>`;
                }

                for (let i = 1; i <= result.allPage; i++) {
                    let temp = "";
                    if (i == nowPage) {
                        temp = `<span class="current">${i}</span>`;
                    } else {
                        temp = `<a href="list.html?nowPage=${i}">${i}</a>`;
                    }
                    pageHtml += temp;

                    let opt = "";
                    if (i == nowPage) {
                        opt = `<option value="${i}" selected="">${i}</option>`;
                    } else {
                        opt = `<option value="${i}">${i}</option>`;
                    }
                    selec += opt;
                }
                if (nowPage == result.allPage) {
                    pageHtml += `<span class="nextprev">末 页</span>
                    <span class="nextprev">下一页»</span>`;
                } else {
                    pageHtml += `<a href="list.html?nowPage=${Number(nowPage)+1}">下一页»</a>
                    <a href="list.html?nowPage=${result.allPage}">末页</a>`;
                }
                pageHtml += `&nbsp;&nbsp;跳到<select name="selpage">` + selec + `</select>页`;
                $("#pageDiv .pages").append(pageHtml);
            }
        });
    }

    networkPage(nowPage);

    // 下拉框
    $("#pageDiv").on("change", "select", function () {
        $("#pageDiv .pages")[0].innerHTML = "";
        networkPage($(this).val());
    });

    // 排序
    $("#salesNumOrderBy,#searchDefault").click(function(){
        $(this)
        .css({
            "background":"#da1337",
            "color":"#fff"
        })
        .siblings().css({
            "background":"#fff",
            "color":"#525252"
        });
        return false;
    });
    $("#searchDefault").click(function(){
        networkPage(nowPage);
        $("#pageDiv .pages")[0].innerHTML = "";
    });

    $("#salesNumOrderBy").click(function(){
        networkPage(nowPage,"sales");
        $("#pageDiv .pages")[0].innerHTML = "";
    });
    

});