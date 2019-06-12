<?php
    require "../api/common.php";
    $phone = $_REQUEST["userPhone"];
    $pwd = md5($_REQUEST["userPwd"]);

    //    判断是否存在用户的手机号码
    $isHasPhone = select("select password from user where username='$phone'");
    //var_dump($isHasPhone);
    $res = "";
    if(!$isHasPhone){
        $res = "用户不存在";
    }elseif($isHasPhone[0]["password"] != $pwd){
        $res = "密码不正确";
    }else{
        $res = "success";
    }
    echo json_encode($res,JSON_UNESCAPED_UNICODE);