$(function () {

    //1.游戏规则弹出和隐藏
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
        $(".rule>a").click(function () {
            $(".rule").stop().fadeOut(100);
        })
    })

    //2.开始游戏的按钮
    $(".containt>.startBtn").click(function () {
        $(this).stop().fadeOut(100);
        startProgressHandler();
        startWolfAnimate();
    })

    //3.重新开始后mask界面隐藏
    $(".mask>button").click(function () {
        $(".mask").stop().fadeOut(100);
        $(".progress").css({
            width:180
        });
        $(".score").text("0");
        startProgressHandler()
        startWolfAnimate()
    })
    
    //4.游戏暂停
    $(".stop").click(function () {
        $(".stopPage").stop().fadeIn(100);
        stopWolfAnimate();
        endProgressHandler()
    })
    $(".stopPage>button").click(function () {
        $(".stopPage").stop().fadeOut(100);
        startWolfAnimate();
        startProgressHandler();
    });

    var proTimer;
    //进度条动画效果演示
    function startProgressHandler() {
       proTimer = setInterval(function () {
           var proWidth = $(".progress").width();
           proWidth--;
           $(".progress").css("width",proWidth);
           if (proWidth<0){
               clearInterval(proTimer);
               stopWolfAnimate();
               $(".mask").stop().fadeIn(100);
               getScore($(".score").text());
           }
       },100);

       //  这里应该是可以用animate的但是我这里写的有问题
       //  var proWidth;
       //  $(".progress").animate({
       //      width:proWidth
       //  },100,function () {
       //      proWidth = $(".progress").width();
       //      proWidth--;
       //      if (proWidth<0){
       //          $(".mask").stop().fadeIn(100);
       //      }
       //  })

    }

    function endProgressHandler() {
        clearInterval(proTimer);
    }

    //获得分数
    function getScore(score) {
        var $word = $("<span class='maskWord'>你一共获得了"+score+"</span>");
        $(".mask").append($word);
    }
    //狼出来的动画
    var timer;
    function startWolfAnimate() {
        //定义数组保存图片
        var bgWolf = ["img/h1.png","img/h2.png","img/h3.png","img/h4.png","img/h5.png","img/h6.png","img/h7.png","img/h8.png","img/h9.png"];
        var smWolf = ["img/x1.png","img/x2.png","img/x3.png","img/x4.png","img/x5.png","img/x6.png","img/x7.png","img/x8.png","img/x9.png"];
        //定义出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        //添加图片节点(创建，定位，内容，添加)
        var wolfImg = $("<img src='' class='wolfImg'>");
        //随机位置
        var wolfPos = Math.round(Math.random()*8);
        wolfImg.css({
            position:"absolute",
            left:arrPos[wolfPos].left,
            top:arrPos[wolfPos].top
        });
        //随机狼
        var wolfType = Math.round(Math.random())?smWolf:bgWolf;
        window.index = 0;
        window.indexend = 4;
        timer = setInterval(function () {
            index++;
            wolfImg.attr("src",wolfType[index]);
            if(index>indexend){
                wolfImg.remove();
                clearInterval(timer);
                startWolfAnimate();
            }
        },300)
        $(".containt").append(wolfImg);
        playRule(wolfImg);
    }

    //结束狼动画
    function stopWolfAnimate() {
        $(".wolfImg").remove();
        clearInterval(timer);
    }

    //执行规则和打到后的动画
    function playRule(wolfImg) {
        wolfImg.one("click",function () {
            var str = $(this).attr("src");
            var flag = str.indexOf("h")<0?true:false;
            index = 5;
            indexend = 8;
            if (flag){
                //-10
                $(".score").text(parseInt($(".score").text())-10);
            }else {
                //+10
                $(".score").text(parseInt($(".score").text())+10);
            }
        })
    }
})