$(function(){
    let isUsePwd = true;
    let formNote = $(".form-inline-note");
    let formPwd = $(".form-inline-pwd");
    //切换手机、邮箱登录
    $(".btn-hd-tel,.btn-hd-email").click(function(ev){
        $(this).addClass("current").siblings().removeClass("current");
        if($(this).hasClass("btn-hd-tel")){
            $(".form-inline-tel").show();
            $(".form-inline-email").hide();
        }else{
            $(".form-inline-tel").hide();
            $(".form-inline-email").show();
            formPwd.show();
            formNote.hide();
        }      
        $("input").val("");
    });

    // 密码是否可见   
    $(".ly_rt .change-eye").click(function(){  
        let pwdHide = $(".ly_rt .password-hide");
        let pwdShow = $(".ly_rt .password-show"); 
        if($(this).hasClass("eye-hide")){
            pwdHide.hide();
            pwdShow.show();             
            pwdShow.val(pwdHide.val());   
        }else{         
            pwdHide.show();
            pwdShow.hide();
            pwdHide.val(pwdShow.val());
        }  
        $(this).toggleClass("eye-hide eye-show");
    });
    $(".ly_r .change-eye").click(function(){  
        let pwdHide = $(".ly_r .password-hide");
        let pwdShow = $(".ly_r .password-show"); 
        if($(this).hasClass("eye-hide")){
            pwdHide.hide();
            pwdShow.show();             
            pwdShow.val(pwdHide.val());   
        }else{         
            pwdHide.show();
            pwdShow.hide();
            pwdHide.val(pwdShow.val());
        }  
        $(this).toggleClass("eye-hide eye-show");
    });
    
    //使用密码或者短信登录   
    $(".note-text").click(function(){
        isUsePwd = !isUsePwd;
        if(isUsePwd){
            $(this).text("短信快捷登录丨注册");
            formNote.hide();
            formPwd.show();
        }else{
            $(this).text("使用密码登录");
            formNote.show();
            formPwd.hide();
            $(".phone").attr("placeholder","请输入您的手机号码")
        }        
    });

    // 切换注册和登录
    $(".for_register").click(function(){
        $(".ly_rt").hide();
        $(".ly_r").show();
    });
    $(".btn-hd-login").click(()=>{
        $(".ly_r").hide();
        $(".ly_rt").show();
    });

    // 显示协议
    $(".pro-show").click(()=>{
        $("#protocol-pop").show();
    });

    // 关闭协议
    $(".pop .close,.pop .affirm_btn").click(()=>{
        $("#protocol-pop").hide();
    });

    //如果不同意协议，禁止注册   
    $(".ly_r .status").click(function(){
        if($(this).is(":checked")){
            $(".ly_r .sign-btn-submit")
            .attr("disabled", false)
            .css({"background":"#f1156f","color":"white"});
        }else{
            $(".ly_r .sign-btn-submit")
            .attr("disabled", true)
            .css({"background":"#ccc","color":"#666"});;
        }
    });
})
