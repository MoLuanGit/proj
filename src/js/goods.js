$(function () {
    $(".header-wrap").load("../tpl/header.html");
    $("#footer-wrap").load("../tpl/footer.html");

    let urlId = location.search.substr(1);
    let id = urlId.split("=")[1] || 15;

    $.get({
        url: "../api/goods.php",
        data: {
            "id": id,
        },
        success(res) {
            let result = JSON.parse(res);

            $(".price_shang").html(`<em>￥</em>${(result.price).toFixed(2)}`);
            $(".price_shi").html(`￥${(result.marketPrice).toFixed(2)}`);
            $(".fontNum #STORAGE").text(result.inventory);
            $(".idNum").text(result.id);
            $(".main_mid h1").text(result.effect);
            $("#add_cart").attr("data-id", result.id);
        }
    });

    let middleImgBox = $("#spec-n1");
    let middleImg = middleImgBox.children("img");
    let zheZao = middleImgBox.children("div");
    let bigImg = $(".bigImg");
    // 鼠标移入小图标切换图片
    $("#spec-list ul li").mouseenter(function () {
        $(this).addClass("border-blue").siblings().removeClass("border-blue");
        let srcImg = $(this).children("img").attr("src");
        middleImg.attr("src", srcImg);
    });
    // 鼠标移入中图
    middleImgBox.mousemove(function (e) {
        middleImg = middleImgBox.children("img");
        let l = e.pageX - $(this).offset().left - 1 / 2 * zheZao.width();
        let t = e.pageY - $(this).offset().top - 1 / 2 * zheZao.height();

        if (l < 0) l = 0;
        if (l >= (middleImgBox.width() - zheZao.width())) {
            l = (middleImgBox.width() - zheZao.width());
        }
        if (t < 0) t = 0;
        if (t >= middleImgBox.height() - zheZao.height()) {
            t = (middleImgBox.height() - zheZao.height());
        }
        zheZao.css({
            "left": l,
            "top": t
        }).show();
        bigImg.css({
            "background-image": `url(${middleImg.attr("src")})`,
            "background-position": `-${l}px -${t}px`,
            "background-size": "620px 620px",
        }).stop(true).show();

    });
    middleImgBox.mouseleave(function () {
        zheZao.hide();
        bigImg.css("background", "white").hide();
    });

    // 增加减少
    let quantity = $("#quantity");
    $("#cart_form .icon_add").click(function () {
        let v = quantity.val() * 1 + 1;
        quantity.val(v);
    })
    $("#cart_form .icon_rec").click(function () {
        let v = quantity.val() * 1 - 1;
        if (v <= 1) v = 1;
        quantity.val(v);
    })

    function redraw() {
        let cartUl = $(".sidebar-wrap .cart-box ul");
        let cookieId = myCookie.getItem("id") || "{}";
        cookieId = JSON.parse(cookieId);
        cookieId.id = cookieId.id || [];

        let idArr = cookieId.id;

        if (idArr.length == 0) {
            $(".cart-empty").show();
        } else {
            $(".cart-empty").hide();
            let html = "";
            $.each(idArr, function (i, ele) {
                let temp = JSON.parse(myCookie.getItem(ele));
                html += `<li data-gid="${temp.id}" data-scode="${temp.id}">
                        <div class="cfb-img-box">
                            <a href="">
                                <img src="../${temp.src}">
                            </a>
                        </div>
                        <div class="cfb-goods-info">
                            <a class="cgi-title" href="">
                            ${temp.effect}
                            </a>
                            <div class="cgi-price-box" data-ispackage="0">
                                <div class="cpb-jj-box" data-qty="${temp.inventory}" data-price="49.8">
                                    <span class="cjb-jia cjb-single-jian">-</span>
                                    <input class="goods-number" type="text" value="${temp.num}" name="goods-single-number">
                                    <span class="cjb-jian cjb-single-jia">+</span>
                                </div>
                                <span class="price">¥${(temp.price*temp.num).toFixed(2)}</span>
                                <a class="del-btn" name="fc-del-btn" href="javascript:void(0);">删除</a>
                            </div>
                        </div>
                    </li>`;
            });
            cartUl.html(html);
        }
    }

    // 添加购物车
    $("#add_cart .add_cart,#add_cart .buy").click(function (e) {
        let id = $("#add_cart").attr("data-id");
        console.log(id)
        let num = quantity.val() * 1;
        if (typeof num != "number" || num < 1) {
            num = 1;
        }
        $.get({
            url: "../api/goods.php",
            data: {
                "id": id,
            },
            success(res) {
                // 记录书的id
                let cookieId = myCookie.getItem("id") || "{}";
                cookieId = JSON.parse(cookieId);
                cookieId.id = cookieId.id || [];
                if (cookieId.id.indexOf(id) == -1) {
                    cookieId.id.push(id);
                }

                let strId = JSON.stringify(cookieId);

                // //找到对应的书，修改本数
                let cookieBook = myCookie.getItem(id) || "{}";
                let cookieBookNum = JSON.parse(cookieBook).num || 0;
                let resNum = cookieBookNum * 1 + num;

                let arrBook = JSON.parse(res);
                arrBook.num = resNum;

                myCookie.setItem("id", strId);
                myCookie.setItem(`${id}`, JSON.stringify(arrBook), 10);

                redraw();
                if (e.target.className == "buy") {
                    location.href = "./cart.html";
                }
            }
        });
    });
});