$(function(){
    $(".header-wrap").load("../tpl/header.html");
    $("#footer-wrap").load("../tpl/footer.html");
    $(".sidebar-wrap").load("../tpl/side.html",function(){
        $(".sidebar-cart").hide();
    });

    let oForm = $("#cart_form");
    function render() {

        let cookieId = myCookie.getItem("id") || "{}";
        cookieId = JSON.parse(cookieId);
        cookieId.id = cookieId.id || [];

        let idArr = cookieId.id;
        if (idArr.length == 0) {
            oForm.html("");   
        } else {
            let html = "";
            $.each(idArr, function (i, ele) {
                let temp = JSON.parse(myCookie.getItem(ele));
                html += `<div class="shopper_n" data-id="${temp.id}">
                <div class="shopChoose">
                    <input type="checkbox" checked="" value="shop" name="checkbox" shopcode="${temp.id}" class="shopCheckAll bigCheck">
                    药店：<a href="" target="_blank">惠州民信堂大药房</a>
                </div>
            </div>
            <table width="1188" border="0" cellspacing="0" cellpadding="0" align="center" class="cart_list">
                <tbody>
                    <tr id="tr_${temp.id}">
                        <td style="text-align: left; padding-left: 10px; border: 0px;" width="20" valign="top">
                            <input type="checkbox" checked="" name="checkbox" class="smallCheck" pids="${temp.id}">
                        </td>
                        <td width="375" style="border: 0px;">
                            <div class="b_pord">
                                <p class="pic">
                                    <a href="">
                                        <img src="../${temp.src}">
                                    </a>
                                </p>
                                <p class="pord_n">
                                    <a href="">${temp.effect}</a>
                                </p>
                            </div>
                        </td>
                        <td width="180" style="border: 0px;">
                            <div class="b_price">
                                <p class="m_price">
                                    市场价：<del>￥${temp.marketPrice}</del>
                                </p>
                                <p class="s_price">
                                    会员价：<span class="price">￥${temp.price}</span>
                                </p>
                            </div>
                        </td>
                        <td width="163" style="border: 0px;">
                            <p class="pref">
                            </p>
                        </td>
                        <td width="88" style="border: 0px;">
                            <div class="mo_num">
                                <span class="rec"></span>
                                <input type="text" value="${temp.num}" class="num" id="${temp.id}">
                                <span class="add"></span>
                            </div>
                            <span id="testKucun" class="cart_storage_tips">${temp.inventory}</span>
                        </td>
                        <td width="88" style="border: 0px;">
                            <p class="s_total">
                                ￥<span class="st">${(temp.num * temp.price).toFixed(2)}</span>
                            </p>
                        </td>
                        <td width="110" style="border: 0px;">
                            <span class="opt">
                                <a class="col" href="">关注</a>
                            </span>
                            <span class="opt">
                                <a href="javascript:;">删除</a>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>`;
            });
            oForm.html(html);  
            totolPrice();
        }
    }
    function totolPrice(){
        let allPrice = 0;
        $(".st",($(".smallCheck:checked").parents("tr"))).each(function () {
            allPrice += Number($(this).text());
        });
        $("#allTotal").text(`￥${allPrice.toFixed(2)}`);
    }
    render();

    //选择
    oForm.on("click",".bigCheck",function(){
        if($(this).is(":checked")){
            $(".smallCheck",($(this).parents(".shopper_n").next())).prop("checked",true);
            if($("input",oForm).is(":checked")){
                $(".b_total input,.allCheck").prop("checked","checked");
            }
        }else{
            $("input",($(this).parents(".shopper_n").next())).prop("checked",false);
            $(".b_total input,.allCheck").prop("checked",false);
        }
        totolPrice();
    });
    oForm.on("click",".smallCheck",function(){     
        if($(this).is(":checked")){
            $("input",($(this).parents("table").prev())).prop("checked",true);
            if($("input",oForm).is(":checked")){
                $(".b_total input,.allCheck").prop("checked","checked");
            }
        }else{
            $("input",($(this).parents("table").prev())).prop("checked",false);
            $(".b_total input,.allCheck").prop("checked",false);
        }
        totolPrice();
    });
    $("input[name='checkAll']").click(function(){
        if($(this).is(":checked")){
            $("input",oForm).prop("checked",true);
            $("input[name='checkAll']").prop("checked",true);
        }else{
            $("input[name='checkAll']").prop("checked",false);
            $("input",oForm).prop("checked",false);
        }     
        totolPrice();  
    });

    // 删除该条产品
    oForm.on("click", ".opt a", function () {
        let del = confirm("确定删除？");
        if (!del) {
            return;
        }
        let id = $(this).parents("table").prev().attr("data-id");
        myCookie.removeItem(id);

        let cookieId = myCookie.getItem("id") || "{}";
        cookieId = JSON.parse(cookieId);
        cookieId.id = cookieId.id || [];
        let index = cookieId.id.indexOf(id);
        cookieId.id.splice(index, 1);

        if (cookieId.id.length) {
            console.log(111);
            myCookie.removeItem("id");
        } else {
            let strId = JSON.stringify(cookieId);
            myCookie.setItem("id", strId);
        }
        render();
    })

    // 加一减一
    oForm.on("click", ".rec", function () {
        let id = $(this).parents("table").prev().attr("data-id");
        let cookieBook = JSON.parse(myCookie.getItem(id));
        cookieBook.num = cookieBook.num * 1 - 1;
        if (cookieBook.num < 1) cookieBook.num = 1
        myCookie.setItem(`${id}`, JSON.stringify(cookieBook), 10);
        render();
    })
    oForm.on("click", ".add", function () {
        let id = $(this).parents("table").prev().attr("data-id");
        let cookieBook = JSON.parse(myCookie.getItem(id));
        cookieBook.num = cookieBook.num * 1 + 1;
        if (cookieBook.num < 1) cookieBook.num = 1
        myCookie.setItem(`${id}`, JSON.stringify(cookieBook), 10);
        render();
    })

});