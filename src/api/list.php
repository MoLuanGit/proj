<?php
    $lists = [
        [
            "id"=>15,
            "title"=>"常菁茶",
            "src"=>"img/list/c283530f15943a33aca0cbbdd74b5fd71affa590.jpg",
            "sales"=>"1000",
            "madeIn"=>"北京澳特舒尔保健品开发有限公司",
            "price"=>49.80
        ],
        [
            "id"=>1,
            "title"=>"薏米山药茶",
            "sales"=>"100",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00,         
        ],
        [
            "id"=>2,
            "title"=>"金贵 胖大海80g/包*1包 清咽利喉 花茶 花草茶 上班族休息泡茶养生",
            "sales"=>"24200",
            "src"=>"img/list/20141022160211_51.jpg",
            "madeIn"=>"其他",
            "price"=>39.00
        ],
        [
            "id"=>3,
            "title"=>"东洋参",
            "src"=>"img/list/fd07ae4e90efb2feeb8437f9a5e845ed2a1bce91.jpg",
            "sales"=>"15320",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>4,
            "title"=>"桂圆红枣枸杞茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"300",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>42.00
        ],
        [
            "id"=>5,
            "title"=>"养元茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"400",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>6,
            "title"=>"马蒲槐金汤",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1100",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>7,
            "title"=>"玫瑰冬瓜荷叶茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1200",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>8,
            "title"=>"山药芡实茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1300",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>9,
            "title"=>"胖大海枇杷叶清润茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1400",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>10,
            "title"=>"红豆薏米薏苡仁白扁豆茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1500",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],       
        [
            "id"=>11,
            "title"=>"黑豆黑木耳桑葚茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1600",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>12,
            "title"=>"润音银冬茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1700",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>13,
            "title"=>"七味甜茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1800",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
        [
            "id"=>14,
            "title"=>"酣然入梦饮",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1900",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],        
        [
            "id"=>16,
            "title"=>"薏米山药茶",
            "src"=>"img/list/53a485ff5d9bb6b047fc81643df42c40f02816d5.jpg",
            "sales"=>"1490",
            "madeIn"=>"池州辰泰茶业有限公司",
            "price"=>39.00
        ],
    ];
    $count = count($lists);  
    $show  = 15;
    $allPage = ceil($count / $show);
    $nowPage = @$_REQUEST["nowPage"]?$_REQUEST["nowPage"]:1;
    $offset = ($nowPage-1) * 15;

    $length = $offset+15;
    if($length > $count){
        $length = $count;
    }
    $resLists = [];
    if($_REQUEST["sort"]){
        foreach ($lists as $key => $v)
        {
            $sales[$key]  = $v['sales'];
        }
        array_multisort($sales, SORT_DESC, $lists);
    }
    for($i=$offset;$i<$length;$i++){
        $resLists[$i] = $lists[$i];
    }
    $res = ["allPage"=>$allPage,"lists"=>$resLists];
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

