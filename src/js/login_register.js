$(function () {
    let isUsePwd = true;
    let formNote = $(".form-inline-note");
    let formPwd = $(".form-inline-pwd");
    let oPhone = $(".phone:visible");
    let oNoteCode = $(".note-code:visible");
    let regPhone = /^[1][3,4,5,7,8]\d{9}$/;
    let oTishi = $(".sign-hint");

    //切换手机、邮箱登录
    $(".btn-hd-tel,.btn-hd-email").click(function (ev) {
        $(this).addClass("current").siblings().removeClass("current");
        if ($(this).hasClass("btn-hd-tel")) {
            $(".form-inline-tel").show();
            $(".form-inline-email").hide();
        } else {
            $(".form-inline-tel").hide();
            $(".form-inline-email").show();
            formPwd.show();
            formNote.hide();
        }
        $("input").val("");
        oTishi.hide();
    });

    // 密码是否可见   
    $(".ly_rt .change-eye").click(function () {
        let pwdHide = $(".ly_rt .password-hide");
        let pwdShow = $(".ly_rt .password-show");
        if ($(this).hasClass("eye-hide")) {
            pwdHide.hide();
            pwdShow.show();
            pwdShow.val(pwdHide.val());
        } else {
            pwdHide.show();
            pwdShow.hide();
            pwdHide.val(pwdShow.val());
        }
        $(this).toggleClass("eye-hide eye-show");
    });
    $(".ly_r .change-eye").click(function () {
        let pwdHide = $(".ly_r .password-hide");
        let pwdShow = $(".ly_r .password-show");
        if ($(this).hasClass("eye-hide")) {
            pwdHide.hide();
            pwdShow.show();
            pwdShow.val(pwdHide.val());
        } else {
            pwdHide.show();
            pwdShow.hide();
            pwdHide.val(pwdShow.val());
        }
        $(this).toggleClass("eye-hide eye-show");
    });

    //使用密码或者短信登录   
    $(".note-text").click(function () {
        isUsePwd = !isUsePwd;
        if (isUsePwd) {
            $(this).text("短信快捷登录丨注册");
            formNote.hide();
            formPwd.show();
        } else {
            $(this).text("使用密码登录");
            formNote.show();
            formPwd.hide();
            $(".phone").attr("placeholder", "请输入您的手机号码")
        }
    });

    // 切换注册和登录
    $(".for_register").click(function () {
        $(".ly_rt").hide();
        $(".ly_r").show();
        oTishi.hide();
    });
    $(".btn-hd-login").click(() => {
        $(".ly_r").hide();
        $(".ly_rt").show();
        oTishi.hide();
        let userPhone = myCookie.getItem("userPhone");
        let userPwd = myCookie.getItem("userPwd");
        if (userPhone && userPwd) {
            let o = {
                userPhone,
                userPwd
            };
            if ($(".ly_rt").is(":visible")) {
                netWork($.param(o));
            }
        }
    });

    // 显示协议
    $(".pro-show").click(() => {
        $("#protocol-pop").show();
    });

    // 关闭协议
    $(".pop .close,.pop .affirm_btn").click(() => {
        $("#protocol-pop").hide();
    });

    //如果不同意协议，禁止注册   
    $(".ly_r .status").click(function () {
        if ($(this).is(":checked")) {
            $(".ly_r .sign-btn-submit")
                .attr("disabled", false)
                .css({
                    "background": "#f1156f",
                    "color": "white"
                }).removeClass("jinyong");
        } else {
            $(".ly_r .sign-btn-submit")
                .attr("disabled", true)
                .addClass("jinyong");
        }
    });

    // 开始注册模块
    let noteCode = "";
    let oGetNote = $(".get-note");
    let oPwd = $(".pwd:visible");
    // 验证码
    oGetNote.click(function () {
        oPhone = $(".phone:visible");
        oPwd = $(".pwd:visible");
        // 手机号验证
        let res = regPhone.test(oPhone.val());
        if (!res) {
            oTishi.show().children("p").text("请输入有效的11手机号码");
            oPhone.focus();
            return;
        }
        oTishi.hide();

        noteCode = getNumber();
        console.log(noteCode);
        alert("你的验证吗是：" + noteCode);

        let Nowtime = 60;
        let timer = setInterval(() => {
            Nowtime--;
            oGetNote.text(Nowtime + "秒后重新获取");
            if (Nowtime == 0) {
                clearInterval(timer);
                oGetNote.attr("disabled", true).text("获取验证码").removeClass("jinyong");
            }
        }, 1000);
        oGetNote.attr("disabled", false).addClass("jinyong");

    });

    // 点击注册
    $(".sign-btn-submit").click(function () {
        oPhone = $(".phone:visible");
        oPwd = $(".pwd:visible");
        // 手机号验证
        let res = regPhone.test($.trim(oPhone.val()));
        if (!res) {
            oTishi.show().children("p").text("请输入有效的11手机号码");
            oPhone.focus();
            return;
        }
        oTishi.hide();
        // 验证验证码是否正确
        if ($.trim(oNoteCode.val()) != noteCode) {
            oTishi.show().children("p").text("验证码不正确");
            oNoteCode.focus();
            return;
        }
        // 验证密码长度
        let pwd = $.trim(oPwd.val());
        if (pwd.length < 6 || pwd.length > 16) {
            oTishi.show().children("p").text("密码长度为6到16位");
            oPwd.focus();
            return;
        }
        // 发送请求，查看手机号是否注册，未注册的就给它注册
        $.ajax({
            "url": "../api/register.php",
            "data": {
                "userPhone": oPhone.val(),
                "userPwd": pwd,
            },
            "success": function (res, status, xhr) {
                if (status == "success") {
                    console.log();
                    if (xhr.responseText == "ok") {
                        alert("注册成功！请登录");
                        location.href = "../html/login.html";
                    }

                    if (xhr.responseText == "用户已经存在") {
                        oTishi.show().children("p").text("该手机号码已经注册,请直接登录");
                    }
                }
            }
        });
    });

    // 登录模块
    let userPhone = myCookie.getItem("userPhone");
    let userPwd = myCookie.getItem("userPwd");
    if (userPhone && userPwd) {
        let o = {
            userPhone,
            userPwd
        };
        if ($(".ly_rt").is(":visible")) {
            netWork($.param(o));
        }
    } else {
        $(".login-btn-submit").click(function () {
            oPhone = $(".phone:visible");
            oPwd = $(".pwd:visible");
            let phone = $.trim(oPhone.val());
            let pwd = $.trim(oPwd.val());

            // 手机号验证
            let res = regPhone.test($.trim(oPhone.val()));
            if (!res) {
                oTishi.show().children("p").text("请输入有效的11手机号码");
                oPhone.focus();
                return;
            }
            oTishi.hide();

            if ($(".auto_log .status:visible").is(":checked")) {
                console.log(111);
                myCookie.setItem("userPhone", phone, 14);
                myCookie.setItem("userPwd", pwd, 14);
            }
            netWork(`userPhone=${phone}&userPwd=${pwd}`);
        });
    }

    function netWork(queryString) {
        $.get({
            url: "../api/login.php",
            data: queryString,
            success(res) {
                if (JSON.parse(res) == "success") {
                    location.href = "/src/index.html";
                } else {
                    myCookie.clear();
                }
            }
        });
    }
})