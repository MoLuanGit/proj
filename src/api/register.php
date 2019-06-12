<?php
    require "../api/common.php";
    $phone = $_REQUEST["userPhone"];
    $pwd = md5($_REQUEST["userPwd"]);

    //    判断是否存在用户的手机号码
    $isHasPhone = select("select * from user where username='$phone'");

    if($isHasPhone){
        echo "用户已经存在";
        return;
    }

    // 插入用户的数据
    $res=mysqli_query($conn,"insert into user values(null,'$phone','$pwd')");
    if($res){
        echo "ok";
    }
