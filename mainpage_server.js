const jwt = require('jsonwebtoken');
const secretkey = 'imkingofcoding';

exports.mainpage = function(req, res){
    var verified = '';

    const token = req.headers.cookie;
    if(!token){
        verified = null;
        res.send(`
        <html lang="ko"><head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">  
    <link href="./images/claplogo_orange.svg" rel="shortcut icon" type="image/x-icon">
    <title>박수투자</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/movie.css">
    <link rel="stylesheet" href="/css/aos.css">
    <link rel="stylesheet" href="https://use.typekit.net/mqq0uoy.css">
    <style>
    </style>
    <script src="./js/jquery-3.3.1.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="./js/jquery.carouselTicker.min.js"></script>
    <script>
    $(function(){
        
    // menu height
    
        menuHover(350,120);
        function menuHover(a,b){
            $("header nav #headerMenu ul > li").hover(function(){
                $("header").stop().animate({height:a});
                $("header #hiddenHeader").addClass("redbg");
            },function(){
                $("header").stop().animate({height:b});
                $("header #hiddenHeader").removeClass("redbg");
            });
        }
        
    // menu height scroll up down
    
        var scrollPosition = $(window).scrollTop(); 
        var scrollNum = 0;
        $(window).scroll(function() {
              var scroll = $(window).scrollTop();
                  
            if ( scroll > ( scrollPosition + 20 )  && scrollNum == 0 ) {
                   console.log('scrollDown');
                   $("header").animate({height:80},300);
                   menuHover(310,80);
                   $("header nav").addClass("smallMenu");
                   $("header nav #headerLogoWrap").addClass("smallMenu");
                   $("header nav #headerLogoWrap h1").addClass("smallMenu");
                   $("header nav #login").addClass("smallMenu");
                   scrollNum = 1;
            } else if ( scroll <  ( scrollPosition - 20 )  && scrollNum == 1 ) {
                   console.log('scrollUp');
                   $("header").animate({height:120},500);
                   menuHover(350,120);
                   $("header nav").removeClass("smallMenu");
                   $("header nav #headerLogoWrap").removeClass("smallMenu");
                   $("header nav #headerLogoWrap h1").removeClass("smallMenu");
                   $("header nav #login").removeClass("smallMenu");
                   scrollNum = 0;
            }
            scrollPosition = scroll;
        });
    
    // menu background
    
        $("header nav #headerMenu ul > li").eq(0).mouseenter(function(){
            $("header #hHeaderbg:not(animated)").stop(true,true).animate({marginLeft:0});
        });
        $("header nav #headerMenu ul > li").eq(1).mouseenter(function(){
            $("header #hHeaderbg:not(animated)").stop(true,true).animate({marginLeft:"25%"});
        });
        $("header nav #headerMenu ul > li").eq(2).mouseenter(function(){
            $("header #hHeaderbg:not(animated)").stop(true,true).animate({marginLeft:"50%"});
        });
        $("header nav #headerMenu ul > li").eq(3).mouseenter(function(){
            $("header #hHeaderbg:not(animated)").stop(true,true).animate({marginLeft:"75%"});
        });
    
        $("#body01 ol li").eq(0).addClass("pagerClick"); 
    
    // slider
    
        var imgNum = 0; 
        var sliderWidth = $("#body01 ul li").width();
        setInterval(function(){
            imgNum++;
            if ( imgNum > 3 ) {
                $("#body01 ul").css({marginLeft:0});
                $("#body01 ul").animate({marginLeft:-sliderWidth});
                $("#body01 ol li").removeClass("pagerClick");
                $("#body01 ol li").eq(1).addClass("pagerClick"); 
                imgNum = 1;
            } else {
                $("#body01 ul").animate({marginLeft:-sliderWidth * imgNum});
                $("#body01 ol li").removeClass("pagerClick");
                $("#body01 ol li").eq(imgNum).addClass("pagerClick");
            }
        },3000);
    
    
    // 공연 차트 버튼
    
        $("#body02 #movieChart ul li").eq(0).click(function(){
            $("#body02 #movieChart #movieChartbg").removeClass("preMovie");
            $("#body02 #movieChart #movieChartbg").removeClass("arthouse");
            $("#body02 #movieChart ul li").css({color:"white"});
            $(this).css({color:"white"});
        });
        $("#body02 #movieChart ul li").eq(1).click(function(){
            $("#body02 #movieChart #movieChartbg").addClass("preMovie");
            $("#body02 #movieChart #movieChartbg").removeClass("arthouse");
            $("#body02 #movieChart ul li").css({color:"white"});
            $(this).css({color:"white"});
            });
        $("#body02 #movieChart ul li").eq(2).click(function(){
            $("#body02 #movieChart #movieChartbg").removeClass("preMovie");
            $("#body02 #movieChart #movieChartbg").addClass("arthouse");
            $("#body02 #movieChart ul li").css({color:"white"});
            $(this).css({color:"white"});
        });     
    
    // 공연 차트 객체로 불러오기 
    
        var movie = { 
            moveChart: [ 
                { num:1, poster:'./images/movie01.jpg', ticket:19.8, view:'5,989', title:'미션 임파서블',start:'2023.07.06',text:'첫번째순위'},
                { num:2, poster:'./images/movie02.jpg', ticket:13.6, view:'3,714', title:'엘리멘탈',start:'2023.07.06',text:'두번째순위'},
                { num:3, poster:'./images/movie03.jpg', ticket:7.5, view:'10,633', title:'스파이더맨',start:'2023.06.20',text:'세번째순위'},
                { num:4, poster:'./images/movie07.jpg', ticket:7.4, view:'33,483', title:'범죄도시3',start:'2023.06.27',text:'네번째순위'},
                { num:5, poster:'./images/movie05.jpg', ticket:6.2, view:'4,228', title:'악마들',start:'2023.06.27',text:'다섯번째순위'},
                { num:6, poster:'./images/movie06.jpg', ticket:5.4, view:'6,269', title:'도라에몽',start:'2023.06.27',text:'여섯번째순위'},
                { num:7, poster:'./images/movie04.jpg', ticket:3.9, view:'21,941', title:'인디아나 존스',start:'2023.06.06',text:'일곱번째순위'},
                { num:8, poster:'./images/movie08.jpg', ticket:3.1, view:'1,656', title:'귀공자',start:'2023.07.06',text:'여덟번째순위'}
            ],
            soonChart: [
                //여기서 d-day도 불러와야함 >>펀딩 달성 못한건 펀딩마감까지 기간을 d-day표시해둠!!
                //남은 날짜구해야하는데 이건 우리가 구하지 말고 운영자가 직ㄱ접입력하게 하는게 좋을듯
                { num:'d-1', poster:'./images/movie09.jpg', ticket:9.0, view:'3,248', title:'여름날 우리',start:'2023.07.10',text:'첫번째순위'},
                { num:'d-1', poster:'./images/movie10.jpg', ticket:6.7, view:'2,258', title:'TAK-SHOW',start:'2023.07.10',text:'두번째순위'},
                { num:'d-1', poster:'./images/movie11.jpg', ticket:3.9, view:'17,871', title:'보이즈 어프레이드',start:'2023.07.10',text:'세번째순위'},
                { num:'d-1', poster:'./images/movie12.jpg', ticket:0.0, view:'61', title:'에프터 로이드 시티',start:'2023.07.10',text:'네번째순위'},
                { num:'d-2', poster:'./images/movie13.jpg', ticket:14.4, view:'5,123', title:'코난',start:'2023.07.11',text:'다섯번째순위'},
                { num:'d-2', poster:'./images/movie14.jpg', ticket:2.8, view:'2,382', title:'플래쉬',start:'2023.07.11',text:'여섯번째순위'},
                { num:'d-2', poster:'./images/movie15.jpg', ticket:0.5, view:'1,539', title:'magnolia',start:'2023.07.11',text:'일곱번째순위'},
                { num:'d-2', poster:'./images/movie16.jpg', ticket:0.4, view:'2,735', title:'interview with the vampire',start:'2023.07.11',text:'여덟번째순위'}
            ],
            artHouse: [
                { num:1, poster:'./images/movie05.jpg', ticket:60.0, view:'4,247', title:'악마들',start:'2023.06.07',text:'첫번째순위'},
                { num:2, poster:'./images/movie18.jpg', ticket:7.5, view:'1,408', title:'남은 인생 10년',start:'2023.06.28',text:'두번째순위'},
                { num:3, poster:'./images/movie19.jpg', ticket:2.2, view:'5,827', title:'하느님의 마음',start:'2017.05.17',text:'세번째순위'},
                { num:4, poster:'./images/movie20.jpg', ticket:1.7, view:'5,703', title:'a few good men',start:'2023.02.21',text:'네번째순위'},
                { num:5, poster:'./images/movie21.jpg', ticket:1.6, view:'333', title:'vanilla sky',start:'2023.06.27',text:'다섯번째순위'},
                { num:6, poster:'./images/movie22.jpg', ticket:0.3, view:'493', title:'풍재기시',start:'2023.06.27',text:'여섯번째순위'},
                { num:7, poster:'./images/movie23.jpg', ticket:0.2, view:'1,725', title:'군산전기',start:'2018.06.07',text:'일곱번째순위'},
                { num:8, poster:'./images/movie24.jpg', ticket:0.2, view:'757', title:'몸값',start:'2016.02.17',text:'여덟번째순위'}
            ]}
    
        var part = movie.moveChart;
    
        $("#movieChart ul li").click(function(){
            var chkIndex = $(this).index();
            switch(chkIndex) {
                case 0:
                    part = movie.moveChart;
                    moveList();
                    break;
                case 1:
                    part = movie.soonChart;
                    moveList('ddate');
                    break;
                case 2:   
                    part = movie.artHouse;
                    moveList();
                    break;                            
            }
        });
    
          moveList();
    
          function moveList(ddate) {
            var html = "";
            for( var i = 0; i < 8; i++) {
                  if ( i == 3 ) {      
                    html += "<li class='noMargin " + ddate +"'>";
                  } else {
                    html += "<li class='" + ddate + "'>";
                  }
    
                  html += "<div class='rankNum'>";
                  if ( i == 0 ) {
                    html += "<img src='./images/MegaCorner.png' alt='첫번째 순위''/>";
                  } else {
                    html += "<img src='./images/MegaCorner.png' alt='첫번째 순위''/>";
                  }
                  html += "<span>"+ part[i].num +"</span>";
                  html += "</div>";      
                  html += "<a href='#''><img src='"+ part[i].poster +"' alt='"+ part[i].text + "'/></a>";      
                  html += "<dl><dt>펀딩율 "+ part[i].ticket +"&#37</dt><dt>" + part[i].view + "</dt>";
                  html += "<dd>"+ part[i].title +"</dd><dt>"+ part[i].start+" 펀딩마감</dt>";
                  html += "<a href='#''>펀딩</a>";
                  html += "</dl></li>";
            }
// 여기서 view는 하트옆에 숫자 우리는 펀딩달성률로 고쳐서 써야하는데 손을 못댐ㅠ
//위에 var movie에서 chart 선언할때 숫자값으로 그냥 줬는데 그걸 백으로 달선현황/목표값 으로 받아오면 될것같애!!백연결하면서 여기도 손보기

            $("#movieList ol").html(html); 
          }
    
          setTimeout(function(){
            thumHeight = $("#body02 #movieBody #movieList ol li").height(); //height 받아옴
             $("#movieList ol").css({height:thumHeight+20});
          },300);
    
          var sizeUp = 0;
          $(window).resize(function(){
    
              thumHeight = $("#body02 #movieBody #movieList ol li").height(); 
              if ( sizeUp == 0 ) { 
                $("#movieList ol").css({height:thumHeight+20});
              } else {
                $("#movieList ol").css({height:thumHeight*2+120});
              }
          });
    
          var moreBtn = 0; 
    
          $("#body02 #moreMovie").click(function(){
            if ( moreBtn == 0 ) { 
                  $("#movieList ol").animate({height:thumHeight*2+120},500);
                  $("#body02 #moreMovie span").eq(0).animate({opacity:0},200);
                  sizeUp = 1;
                  moreBtn = 1; 
            } else { 
                  $("#movieList ol").animate({height:thumHeight+20},500);
                  $("#body02 #moreMovie span").eq(0).animate({opacity:1},200);
                  sizeUp = 0;
                  moreBtn = 0;
                }
          });
    

    //body02-1  
            // 공연 차트 버튼
                
            $("#body02-1 #movieChart1 ul li").eq(0).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("preMovie1");
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("arthouse1");
                $("#body02-1 #movieChart1 ul li").css({color:"white"});
                $(this).css({color:"white"});
            });
            $("#body02-1 #movieChart1 ul li").eq(1).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").addClass("preMovie1");
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("arthouse1");
                $("#body02-1 #movieChart1 ul li").css({color:"white"});
                $(this).css({color:"white"});
                });
            $("#body02-1 #movieChart1 ul li").eq(2).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("preMovie1");
                $("#body02-1 #movieChart1 #movieChartbg-1").addClass("arthouse1");
                $("#body02-1 #movieChart1 ul li").css({color:"white"});
                $(this).css({color:"white"});
            });     
            
            // 공연 차트 객체로 불러오기 
            
            var movie1 = { 
                moveChart1: [ 
                    { num:1, poster:'./images/movie01.jpg', ticket:19.8, view:'5,989', title:'샤잠!',start:'2019.04.03',text:'첫번째순위'},
                    { num:2, poster:'./images/movie02.jpg', ticket:13.6, view:'3,714', title:'생일',start:'2019.04.03',text:'두번째순위'},
                    { num:3, poster:'./images/movie03.jpg', ticket:7.5, view:'10,633', title:'돈',start:'2019.03.20',text:'세번째순위'},
                    { num:4, poster:'./images/movie04.jpg', ticket:7.4, view:'33,483', title:'어스',start:'2019.03.27',text:'네번째순위'},
                    { num:5, poster:'./images/movie05.jpg', ticket:6.2, view:'4,228', title:'콜레트',start:'2019.03.27',text:'다섯번째순위'},
                    { num:6, poster:'./images/movie06.jpg', ticket:5.4, view:'6,269', title:'장난스런 키스',start:'2019.03.27',text:'여섯번째순위'},
                    { num:7, poster:'./images/movie07.jpg', ticket:3.9, view:'21,941', title:'캡틴마블',start:'2019.03.06',text:'일곱번째순위'},
                    { num:8, poster:'./images/movie08.jpg', ticket:3.1, view:'1,656', title:'로망',start:'2019.04.03',text:'여덟번째순위'}
                ],
                soonChart1: [
                    { num:'d-1', poster:'./images/movie09.jpg', ticket:9.0, view:'3,248', title:'헬보이',start:'2019.04.10',text:'첫번째순위'},
                    { num:'d-1', poster:'./images/movie10.jpg', ticket:6.7, view:'2,258', title:'파이브 피트',start:'2019.04.10',text:'두번째순위'},
                    { num:'d-1', poster:'./images/movie11.jpg', ticket:3.9, view:'17,871', title:'공포의 묘지',start:'2019.04.10',text:'세번째순위'},
                    { num:'d-1', poster:'./images/movie12.jpg', ticket:0.0, view:'61', title:'키코리키',start:'2019.04.10',text:'네번째순위'},
                    { num:'d-2', poster:'./images/movie13.jpg', ticket:14.4, view:'5,123', title:'바이스',start:'2019.04.11',text:'다섯번째순위'},
                    { num:'d-2', poster:'./images/movie14.jpg', ticket:2.8, view:'2,382', title:'미성년',start:'2019.04.11',text:'여섯번째순위'},
                    { num:'d-2', poster:'./images/movie15.jpg', ticket:0.5, view:'1,539', title:'퍼스트 리폼드',start:'2019.04.11',text:'일곱번째순위'},
                    { num:'d-2', poster:'./images/movie16.jpg', ticket:0.4, view:'2,735', title:'유럽미술관 산책',start:'2019.04.11',text:'여덟번째순위'}
                ],
                artHouse1: [
                    { num:1, poster:'./images/movie05.jpg', ticket:60.0, view:'4,247', title:'콜레트!',start:'2019.03.07',text:'첫번째순위'},
                    { num:2, poster:'./images/movie18.jpg', ticket:7.5, view:'1,408', title:'루스 베이더 긴즈버그',start:'2019.03.28',text:'두번째순위'},
                    { num:3, poster:'./images/movie19.jpg', ticket:2.2, view:'5,827', title:'불한당 - 나쁜 놈들의 세상',start:'2017.05.17',text:'세번째순위'},
                    { num:4, poster:'./images/movie20.jpg', ticket:1.7, view:'5,703', title:'더 페이버릿',start:'2019.02.21',text:'네번째순위'},
                    { num:5, poster:'./images/movie21.jpg', ticket:1.6, view:'333', title:'강변호텔',start:'2019.03.27',text:'다섯번째순위'},
                    { num:6, poster:'./images/movie22.jpg', ticket:0.3, view:'493', title:'선희와 슬기',start:'2019.03.27',text:'여섯번째순위'},
                    { num:7, poster:'./images/movie23.jpg', ticket:0.2, view:'1,725', title:'유전',start:'2018.06.07',text:'일곱번째순위'},
                    { num:8, poster:'./images/movie24.jpg', ticket:0.2, view:'757', title:'영웅본색',start:'2016.02.17',text:'여덟번째순위'}
                ]};
            
            var part1 = movie1.moveChart1;
            
            $("#movieChart1 ul li").click(function(){
                var chkIndex1 = $(this).index();
                switch(chkIndex1) {
                    case 0:
                        part1 = movie1.moveChart1;
                        moveList1();
                        break;
                    case 1:
                        part1 = movie1.soonChart1;
                        moveList1('ddate1');
                        break;
                    case 2:   
                        part1 = movie1.artHouse1;
                        moveList1();
                        break;                            
                }
            });
            
              moveList1();
            
              function moveList1(ddate1) {
                var html = "";
                for( var i = 0; i < 8; i++) {
                      if ( i == 3 ) {      
                        html += "<li class='noMargin1 " + ddate1 +"'>";
                      } else {
                        html += "<li class='" + ddate1 + "'>";
                      }
            
                      html += "<div class='rankNum1'>";
                      if ( i == 0 ) {
                        html += "<img src='./images/MEGACorner.png' alt='첫번째 순위''/>";
                      } else {
                        html += "<img src='./images/whiteCorner.svg' alt='첫번째 순위''/>";
                      }
                      html += "<span>"+ part1[i].num +"</span>";
                      html += "</div>";      
                      html += "<a href='#''><img src='"+ part1[i].poster +"' alt='"+ part1[i].text + "'/></a>";      
                      html += "<dl><dt>펀딩율 "+ part1[i].ticket +"&#37</dt><dt>" + part1[i].view + "</dt>";
                      html += "<dd>"+ part1[i].title +"</dd><dt>"+ part1[i].start+" 펀딩마감</dt>";
                      html += "<a href='#''>펀딩</a>";
                      html += "</dl></li>";
                }
                $("#movieList1 ol").html(html); 
              }
            
            // 공연 차트 height값 받아오기 
            
              setTimeout(function(){
                thumHeight1 = $("#body02-1 #movieBody-1 #movieList1 ol li").height(); 
                 $("#movieList1 ol").css({height:thumHeight1+20});
              },300);
            
            // 공연 차트 height값 지정
            
              var sizeUp1 = 0;
              $(window).resize(function(){
            
                  thumHeight1= $("#body02-1 #movieBody-1 #movieList1 ol li").height(); 
                  if ( sizeUp1 == 0 ) { 
                    $("#movieList1 ol").css({height:thumHeight1+20});
                  } else {
                    $("#movieList1 ol").css({height:thumHeight1*2+120});
                  }
              });
            
            // 공연 차트 moremovie 버튼 
            
              var moreBtn1 = 0; 
            
              $("#body02-1 #moreMovie1").click(function(){
                if ( moreBtn1 == 0 ) { 
                      $("#movieList1 ol").animate({height:thumHeight1*2+120},500);
                      $("#body02-1 #moreMovie1 span").eq(0).animate({opacity:0},200);
                      sizeUp1 = 1;
                      moreBtn1 = 1; 
                } else { 
                      $("#movieList1 ol").animate({height:thumHeight1+20},500);
                      $("#body02-1 #moreMovie1 span").eq(0).animate({opacity:1},200);
                      sizeUp1 = 0;
                      moreBtn1 = 0;
                    }
              });  
              
           

    //body02-2
    // 공연 차트 버튼
    
$("#body02-2 #movieChart2 ul li").eq(0).click(function(){
    $("#body02-2 #movieChart2 #movieChartbg-2").removeClass("preMovie2");
    $("#body02-2 #movieChart2 #movieChartbg-2").removeClass("arthouse2");
    $("#body02-2 #movieChart2 ul li").css({color:"white"});
    $(this).css({color:"white"});
});
$("#body02-2 #movieChart2 ul li").eq(1).click(function(){
    $("#body02-2 #movieChart2 #movieChartbg-2").addClass("preMovie2");
    $("#body02-2 #movieChart2 #movieChartbg-2").removeClass("arthouse2");
    $("#body02-2 #movieChart2 ul li").css({color:"white"});
    $(this).css({color:"white"});
    });
$("#body02-2 #movieChart2 ul li").eq(2).click(function(){
    $("#body02-2 #movieChart2 #movieChartbg-2").removeClass("preMovie2");
    $("#body02-2 #movieChart2 #movieChartbg-2").addClass("arthouse2");
    $("#body02-2 #movieChart2 ul li").css({color:"white"});
    $(this).css({color:"white"});
});     

// 공연 차트 객체로 불러오기 

var movie2 = { 
    moveChart2: [ 
        { num:1, poster:'./images/movie01.jpg', ticket:19.8, view:'5,989', title:'샤잠!',start:'2019.04.03',text:'첫번째순위'},
        { num:2, poster:'./images/movie02.jpg', ticket:13.6, view:'3,714', title:'생일',start:'2019.04.03',text:'두번째순위'},
        { num:3, poster:'./images/movie03.jpg', ticket:7.5, view:'10,633', title:'돈',start:'2019.03.20',text:'세번째순위'},
        { num:4, poster:'./images/movie04.jpg', ticket:7.4, view:'33,483', title:'어스',start:'2019.03.27',text:'네번째순위'},
        { num:5, poster:'./images/movie05.jpg', ticket:6.2, view:'4,228', title:'콜레트',start:'2019.03.27',text:'다섯번째순위'},
        { num:6, poster:'./images/movie06.jpg', ticket:5.4, view:'6,269', title:'장난스런 키스',start:'2019.03.27',text:'여섯번째순위'},
        { num:7, poster:'./images/movie07.jpg', ticket:3.9, view:'21,941', title:'캡틴마블',start:'2019.03.06',text:'일곱번째순위'},
        { num:8, poster:'./images/movie08.jpg', ticket:3.1, view:'1,656', title:'로망',start:'2019.04.03',text:'여덟번째순위'}
    ],
    soonChart2: [
        { num:'d-1', poster:'./images/movie09.jpg', ticket:9.0, view:'3,248', title:'헬보이',start:'2019.04.10',text:'첫번째순위'},
        { num:'d-1', poster:'./images/movie10.jpg', ticket:6.7, view:'2,258', title:'파이브 피트',start:'2019.04.10',text:'두번째순위'},
        { num:'d-1', poster:'./images/movie11.jpg', ticket:3.9, view:'17,871', title:'공포의 묘지',start:'2019.04.10',text:'세번째순위'},
        { num:'d-1', poster:'./images/movie12.jpg', ticket:0.0, view:'61', title:'키코리키',start:'2019.04.10',text:'네번째순위'},
        { num:'d-2', poster:'./images/movie13.jpg', ticket:14.4, view:'5,123', title:'바이스',start:'2019.04.11',text:'다섯번째순위'},
        { num:'d-2', poster:'./images/movie14.jpg', ticket:2.8, view:'2,382', title:'미성년',start:'2019.04.11',text:'여섯번째순위'},
        { num:'d-2', poster:'./images/movie15.jpg', ticket:0.5, view:'1,539', title:'퍼스트 리폼드',start:'2019.04.11',text:'일곱번째순위'},
        { num:'d-2', poster:'./images/movie16.jpg', ticket:0.4, view:'2,735', title:'유럽미술관 산책',start:'2019.04.11',text:'여덟번째순위'}
    ],
    artHouse2: [
        { num:1, poster:'./images/movie05.jpg', ticket:60.0, view:'4,247', title:'콜레트!',start:'2019.03.07',text:'첫번째순위'},
        { num:2, poster:'./images/movie18.jpg', ticket:7.5, view:'1,408', title:'루스 베이더 긴즈버그',start:'2019.03.28',text:'두번째순위'},
        { num:3, poster:'./images/movie19.jpg', ticket:2.2, view:'5,827', title:'불한당 - 나쁜 놈들의 세상',start:'2017.05.17',text:'세번째순위'},
        { num:4, poster:'./images/movie20.jpg', ticket:1.7, view:'5,703', title:'더 페이버릿',start:'2019.02.21',text:'네번째순위'},
        { num:5, poster:'./images/movie21.jpg', ticket:1.6, view:'333', title:'강변호텔',start:'2019.03.27',text:'다섯번째순위'},
        { num:6, poster:'./images/movie22.jpg', ticket:0.3, view:'493', title:'선희와 슬기',start:'2019.03.27',text:'여섯번째순위'},
        { num:7, poster:'./images/movie23.jpg', ticket:0.2, view:'1,725', title:'유전',start:'2018.06.07',text:'일곱번째순위'},
        { num:8, poster:'./images/movie24.jpg', ticket:0.2, view:'757', title:'영웅본색',start:'2016.02.17',text:'여덟번째순위'}
    ]}

var part2 = movie2.moveChart2;

$("#movieChart2 ul li").click(function(){
    var chkIndex2 = $(this).index();
    switch(chkIndex2) {
        case 0:
            part2 = movie2.moveChart2;
            moveList2();
            break;
        case 1:
            part2 = movie2.soonChart2;
            moveList2('ddate');
            break;
        case 2:   
            part2 = movie2.artHouse22;
            moveList2();
            break;                            
    }
});

  moveList2();

  function moveList2(ddate) {
    var html = "";
    for( var i = 0; i < 8; i++) {
          if ( i == 3 ) {      
            html += "<li class='noMargin " + ddate +"'>";
          } else {
            html += "<li class='" + ddate + "'>";
          }

          html += "<div class='rankNum2'>";
          if ( i == 0 ) {
            html += "<img src='./images/MEGACorner.png' alt='첫번째 순위''/>";
          } else {
            html += "<img src='./images/whiteCorner.svg' alt='첫번째 순위''/>";
          }
          html += "<span>"+ part2[i].num +"</span>";
          html += "</div>";      
          html += "<a href='#''><img src='"+ part2[i].poster +"' alt='"+ part2[i].text + "'/></a>";      
          html += "<dl><dt>펀딩율 "+ part2[i].ticket +"&#37</dt><dt>" + part2[i].view + "</dt>";
          html += "<dd>"+ part2[i].title +"</dd><dt>"+ part2[i].start+" 펀딩마감</dt>";
          html += "<a href='#''>펀딩</a>";
          html += "</dl></li>";
    }
    $("#movieList2 ol").html(html); 
  }

// 공연 차트 height값 받아오기 

  setTimeout(function(){
    thumHeight2 = $("#body02-2 #movieBody-2 #movieList2 ol li").height(); 
     $("#movieList2 ol").css({height:thumHeight1+20});
  },300);

// 공연 차트 height값 지정

  var sizeUp2 = 0;
  $(window).resize(function(){

      thumHeight2= $("#body02-2 #movieBody-2 #movieList2 ol li").height(); 
      if ( sizeUp2 == 0 ) { 
        $("#movieList2 ol").css({height:thumHeight1+20});
      } else {
        $("#movieList2 ol").css({height:thumHeight1*2+120});
      }
  });

// 공연 차트 moremovie 버튼 

  var moreBtn2 = 0; 

  $("#body02-2 #moreMovie2").click(function(){
    if ( moreBtn2 == 0 ) { 
          $("#movieList2 ol").animate({height:thumHeight1*2+120},500);
          $("#body02-2 #moreMovie2 span").eq(0).animate({opacity:0},200);
          sizeUp2 = 1;
          moreBtn2 = 1; 
    } else { 
          $("#movieList2 ol").animate({height:thumHeight1+20},500);
          $("#body02-2 #moreMovie2 span").eq(0).animate({opacity:1},200);
          sizeUp2 = 0;
          moreBtn2 = 0;
        }
  });  
  

    
    // AOS
         
        AOS.init();
    
    
    // 이벤트 slider 
    
    
        $(".carouselTicker").carouselTicker({
            speed: 2
        });
    
    
    // 팝업창 열고 닫기 
    
        $("header #quickReserve").click(function(){
            $("#reservePopupbg").fadeIn();
        });
        $("#reservePopupbg #closeBtn").click(function(){
            $("#reservePopupbg").fadeOut();
        });
    
    // 팝업창 언어 
    
        $("#reservePopupbg #language span").eq(0).css({color:"#fff"});
    
        $("#reservePopupbg #language span").eq(0).click(function(){
            $("#reservePopupbg #language #languagebg").animate({left:"-1"});
            $("#reservePopupbg #language span").css({color:"#000"});
            $(this).css({color:"#fff"});
        });
        $("#reservePopupbg #language span").eq(1).click(function(){
            $("#reservePopupbg #language #languagebg").animate({left:74});
            $("#reservePopupbg #language span").css({color:"#000"});
            $(this).css({color:"#fff"});
        });
    
    // 팝업창 극장 
    
        $("#reservePopupbg #reserve01 ul.region li").click(function(){
            $("#reservePopupbg #reserve01 ul.region li").css({background:"#f3f3f3",color:"#000"});
            $(this).css({background:"#a3a3a3",color:"#fff"});
        });
        $("#reservePopupbg #reserve01 ul.regionDetail li").click(function(){
            $("#reservePopupbg #reserve01 ul.regionDetail li").css({background:"#f3f3f3",color:"#000"});
            $(this).css({background:"#a3a3a3",color:"#fff"});
        });
        $("#reservePopupbg #reserve02 table tr").click(function(){
            $("#reservePopupbg #reserve02 table tr").css({background:"#f3f3f3",color:"#000"});
            $(this).css({background:"#a3a3a3",color:"#fff"});
        });
        $("#reservePopupbg #reserve03 ul li").click(function(){
            $("#reservePopupbg #reserve03 ul li").css({background:"#f3f3f3",color:"#000"});
            $(this).css({background:"#a3a3a3",color:"#fff"});
        });
    
    // 모바일 main visual 이미지 바꿔치기 
    
        var winWidth = $(window).width();
               if ( winWidth <= 600 ) {
                $("img","#body01 ul li").eq(0).attr("src","./images/mobileMain01.jpg")
                $("img","#body01 ul li").eq(1).attr("src","./images/mobileMain01.jpg")
                $("img","#body01 ul li").eq(2).attr("src","./images/mobileMain01.jpg")
                $("img","#body01 ul li").eq(3).attr("src","./images/mobileMain01.jpg")
            } else { 
                   $("img","#body01 ul li").eq(0).attr("src","./images/slider1.png")
                   $("img","#body01 ul li").eq(1).attr("src","./images/slider2.png")
                   $("img","#body01 ul li").eq(2).attr("src","./images/slider2.png")
                   $("img","#body01 ul li").eq(3).attr("src","./images/slider1.png")
            };
    
    // 모바일 menu button 
    
        var mobileBtnClickNum = 0; 
    
        $("#mobileHeader #mobileBtn01 #mobileMenubg").click(function(){
            if ( mobileBtnClickNum == 0 ){
                $("#mobileMenu").fadeIn(500);
                $("#mobileHeader #mobileBtn01 #mobileMenubg span").addClass("mobileBtnClick");
                mobileBtnClickNum = 1;
            } else {
                $("#mobileMenu").fadeOut(500);
                $("#mobileHeader #mobileBtn01 #mobileMenubg span").removeClass("mobileBtnClick");
                mobileBtnClickNum = 0;
            }	
        });
    // 모바일 personal button 
    
        $("#mobileHeader #mobileBtn03 img").click(function(){
            $("#mobilePersonal").fadeIn(500);	
        });
        $("#mobilePersonal #my박수투자 img").click(function(){
            $("#mobilePersonal").fadeOut(500);	
        });
    
    
    });
    </script>
    </head>
    
    <body data-aos-easing="ease" data-aos-duration="400" data-aos-delay="0">
        <header style="height: 120px;">
            <nav class="visualWidth">
                <div id="headerLogoWrap">
                    <h1>
                        <a href="/index">
                            <img src="./images/claplogo_orange.svg" alt="박수투자바로가기">
                        </a>
                    </h1>
                </div>
                <div id="login">
                    <ol>
                        <li><a href="/login">로그인</a></li>
                        <li><a href="/signup/">회원가입</a></li>
                    </ol>
                </div>
                <div id="headerMenu">
                    <ul>
                        <li>
                            <a href="#">공연</a>
                            <ol>
                                <li><a href="#">전체 공연</a></li>
                                <li><a href="#">연극</a></li>
                                <li><a href="#">뮤지컬</a></li>
                                <li><a href="#">클래식</a></li>
                                <li><a href="#">국악</a></li>
                                <li><a href="#">대중음악</a></li>
                                <li><a href="#">무용/대중무용</a></li>
                                <li><a href="#">서커스/마술</a></li>
                       
                                
                            </ol>
                        </li>
                        <li>
                            <a href="#">펀딩</a>
                            <ol>
                                <li><a href="#">펀딩 진행현황</a></li>
                                <li><a href="/fundsend">펀딩 신청서</a></li>
                            </ol>
                        </li>
                        <li>
                            <a href="#">스토어</a>
                            <ol>
                                <li><a href="#">펀딩굿즈</a></li>
                                <li><a href="#">펀딩티켓</a></li>
                            </ol>
                        </li>
                        <li>
                            <a href="#">이벤트</a>
                            <ol>
                                <li><a href="#">진행 중인 이벤트</a></li>
                                <li><a href="#">지난 이벤트</a></li>
                   

                            </ol>
                        </li>
                    </ul>
                    <div id="quickReserve">
                        <a href="#">
                            <img src="./images/ticket.png" alt="빠른펀딩">
                            <img src="./images/ticketwhite.png" alt="빠른펀딩">
                            <span>펀딩추천</span>
                        </a>
                    </div>
                </div>
            </nav>
            <div id="hiddenHeader" class="">
                <div class="visualWidth">
                    <div id="hHeaderWrap">
                        <div id="hHeaderUl">
                            <div id="hHeaderbg" style="margin-left: 75%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

                    
        <div id="body01">
            <ul style="margin-left: -2770px;">
                <li><img src="./images/slider1.png" alt="홍보"></li>
                <li><img src="./images/slider2.png" alt="홍보"></li>
                <li><img src="./images/slider2.png" alt="홍보"></li>
                <li><img src="./images/slider1.png" alt="홍보"></li>
            </ul>
            <ol>
                <li class=""></li>
                <li class=""></li>
                <li class="pagerClick"></li>
            </ol>
        </div>
       
        <div id="body02" class="visualWidth">
            <h2>#실시간_인기_급상승</h2>
            <div id="movieChartWrap">
                <div id="movieChart">
                    <div id="movieChartbg"></div>
                    <ul>
                        <li>전체</li>
                        <li>100%미만</li>
                        <li>100%이상</li>
                    </ul>
                </div>
            </div>
            <div id="movieBody">
                <div id="movieListWrap">
                <div id="movieList">
                    <ol style="height: 420.594px;"><li class="undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>1</span></div><a href="#" '=""><img src="./images/movie01.jpg" alt="첫번째순위"></a><dl><dt>펀딩율 19.8%</dt><dt>5,989</dt><dd>미션 임파서블</dd><dt>2023.07.12 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>2</span></div><a href="#" '=""><img src="./images/movie02.jpg" alt="두번째순위"></a><dl><dt>펀딩율 13.6%</dt><dt>3,714</dt><dd>생일</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>3</span></div><a href="#" '=""><img src="./images/movie03.jpg" alt="세번째순위"></a><dl><dt>펀딩율 7.5%</dt><dt>10,633</dt><dd>돈</dd><dt>2023.06.20 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="noMargin undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>4</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="네번째순위"></a><dl><dt>펀딩율 7.4%</dt><dt>33,483</dt><dd>어스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>5</span></div><a href="#" '=""><img src="./images/movie05.jpg" alt="다섯번째순위"></a><dl><dt>펀딩율 6.2%</dt><dt>4,228</dt><dd>콜레트</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>6</span></div><a href="#" '=""><img src="./images/movie06.jpg" alt="여섯번째순위"></a><dl><dt>펀딩율 5.4%</dt><dt>6,269</dt><dd>장난스런 키스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>7</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="일곱번째순위"></a><dl><dt>펀딩율 3.9%</dt><dt>21,941</dt><dd>범죄도시3</dd><dt>2023.06.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>8</span></div><a href="#" '=""><img src="./images/movie08.jpg" alt="여덟번째순위"></a><dl><dt>펀딩율 3.1%</dt><dt>1,656</dt><dd>귀공자</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li></ol>
                </div></div>
            </div>
            <div id="moreMovie">
                <span></span>
                <span></span>
            </div>
            <div id="moreMovieScroll">
                <img src="./images/scrollDown.svg" alt="옆으로 스크롤 하세요">
            </div>
        </div>


        <!-- <script>

            $(function(){    
            // 공연 차트 버튼
                
            $("#body02-1 #movieChart1 ul li").eq(0).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("preMovie");
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("arthouse");
                $("#body02-1 #movieChart1 ul li").css({color:"black"});
                $(this).css({color:"white"});
            });
            $("#body02-1 #movieChart1 ul li").eq(1).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").addClass("preMovie");
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("arthouse");
                $("#body02-1 #movieChart1 ul li").css({color:"black"});
                $(this).css({color:"white"});
                });
            $("#body02-1 #movieChart1 ul li").eq(2).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("preMovie");
                $("#body02-1 #movieChart1 #movieChartbg-1").addClass("arthouse");
                $("#body02-1 #movieChart1 ul li").css({color:"black"});
                $(this).css({color:"white"});
            });     
            
            // 공연 차트 객체로 불러오기 
            
            var movie1 = { 
                moveChart1: [ 
                    { num:1, poster:'./images/movie01.jpg', ticket:19.8, view:'5,989', title:'샤잠!',start:'2019.04.03',text:'첫번째순위'},
                    { num:2, poster:'./images/movie02.jpg', ticket:13.6, view:'3,714', title:'생일',start:'2019.04.03',text:'두번째순위'},
                    { num:3, poster:'./images/movie03.jpg', ticket:7.5, view:'10,633', title:'돈',start:'2019.03.20',text:'세번째순위'},
                    { num:4, poster:'./images/movie04.jpg', ticket:7.4, view:'33,483', title:'어스',start:'2019.03.27',text:'네번째순위'},
                    { num:5, poster:'./images/movie05.jpg', ticket:6.2, view:'4,228', title:'콜레트',start:'2019.03.27',text:'다섯번째순위'},
                    { num:6, poster:'./images/movie06.jpg', ticket:5.4, view:'6,269', title:'장난스런 키스',start:'2019.03.27',text:'여섯번째순위'},
                    { num:7, poster:'./images/movie07.jpg', ticket:3.9, view:'21,941', title:'캡틴마블',start:'2019.03.06',text:'일곱번째순위'},
                    { num:8, poster:'./images/movie08.jpg', ticket:3.1, view:'1,656', title:'로망',start:'2019.04.03',text:'여덟번째순위'}
                ],
                soonChart1: [
                    { num:'d-1', poster:'./images/movie09.jpg', ticket:9.0, view:'3,248', title:'헬보이',start:'2019.04.10',text:'첫번째순위'},
                    { num:'d-1', poster:'./images/movie10.jpg', ticket:6.7, view:'2,258', title:'파이브 피트',start:'2019.04.10',text:'두번째순위'},
                    { num:'d-1', poster:'./images/movie11.jpg', ticket:3.9, view:'17,871', title:'공포의 묘지',start:'2019.04.10',text:'세번째순위'},
                    { num:'d-1', poster:'./images/movie12.jpg', ticket:0.0, view:'61', title:'키코리키',start:'2019.04.10',text:'네번째순위'},
                    { num:'d-2', poster:'./images/movie13.jpg', ticket:14.4, view:'5,123', title:'바이스',start:'2019.04.11',text:'다섯번째순위'},
                    { num:'d-2', poster:'./images/movie14.jpg', ticket:2.8, view:'2,382', title:'미성년',start:'2019.04.11',text:'여섯번째순위'},
                    { num:'d-2', poster:'./images/movie15.jpg', ticket:0.5, view:'1,539', title:'퍼스트 리폼드',start:'2019.04.11',text:'일곱번째순위'},
                    { num:'d-2', poster:'./images/movie16.jpg', ticket:0.4, view:'2,735', title:'유럽미술관 산책',start:'2019.04.11',text:'여덟번째순위'}
                ],
                artHouse1: [
                    { num:1, poster:'./images/movie05.jpg', ticket:60.0, view:'4,247', title:'콜레트!',start:'2019.03.07',text:'첫번째순위'},
                    { num:2, poster:'./images/movie18.jpg', ticket:7.5, view:'1,408', title:'루스 베이더 긴즈버그',start:'2019.03.28',text:'두번째순위'},
                    { num:3, poster:'./images/movie19.jpg', ticket:2.2, view:'5,827', title:'불한당 - 나쁜 놈들의 세상',start:'2017.05.17',text:'세번째순위'},
                    { num:4, poster:'./images/movie20.jpg', ticket:1.7, view:'5,703', title:'더 페이버릿',start:'2019.02.21',text:'네번째순위'},
                    { num:5, poster:'./images/movie21.jpg', ticket:1.6, view:'333', title:'강변호텔',start:'2019.03.27',text:'다섯번째순위'},
                    { num:6, poster:'./images/movie22.jpg', ticket:0.3, view:'493', title:'선희와 슬기',start:'2019.03.27',text:'여섯번째순위'},
                    { num:7, poster:'./images/movie23.jpg', ticket:0.2, view:'1,725', title:'유전',start:'2018.06.07',text:'일곱번째순위'},
                    { num:8, poster:'./images/movie24.jpg', ticket:0.2, view:'757', title:'영웅본색',start:'2016.02.17',text:'여덟번째순위'}
                ]}
            
            var part1 = movie.moveChart1;
            
            $("#movieChart1 ul li").click(function(){
                var chkIndex1 = $(this).index();
                switch(chkIndex1) {
                    case 0:
                        part = movie.moveChart1;
                        moveList1();
                        break;
                    case 1:
                        part = movie.soonChart1;
                        moveList1('ddate');
                        break;
                    case 2:   
                        part = movie.artHouse1;
                        moveList1();
                        break;                            
                }
            });
            
              moveList1();
            
              function moveList1(ddate) {
                var html = "";
                for( var i = 0; i < 8; i++) {
                      if ( i == 3 ) {      
                        html += "<li class='noMargin " + ddate +"'>";
                      } else {
                        html += "<li class='" + ddate + "'>";
                      }
            
                      html += "<div class='rankNum'>";
                      if ( i == 0 ) {
                        html += "<img src='../images/MegaCorner.png' alt='첫번째 순위''/>";
                      } else {
                        html += "<img src='./images/whiteCorner.svg' alt='첫번째 순위''/>";
                      }
                      html += "<span>"+ part1[i].num +"</span>";
                      html += "</div>";      
                      html += "<a href='#''><img src='"+ part1[i].poster +"' alt='"+ part1[i].text + "'/></a>";      
                      html += "<dl><dt>펀딩율 "+ part1[i].ticket +"&#37</dt><dt>" + part1[i].view + "</dt>";
                      html += "<dd>"+ part1[i].title +"</dd><dt>"+ part1[i].start+" 펀딩마감</dt>";
                      html += "<a href='#''>펀딩</a>";
                      html += "</dl></li>";
                }
                $("#movieList1 ol").html(html); 
              }
            
            // 공연 차트 height값 받아오기 
            
              setTimeout(function(){
                thumHeight1 = $("#body02-1 #movieBody-1 #movieList1 ol li").height(); 
                 $("#movieList1 ol").css({height:thumHeight1+20});
              },300);
            
            // 공연 차트 height값 지정
            
              var sizeUp1 = 0;
              $(window).resize(function(){
            
                  thumHeight1= $("#body02-1 #movieBody-1 #movieList1 ol li").height(); 
                  if ( sizeUp1 == 0 ) { 
                    $("#movieList1 ol").css({height:thumHeight1+20});
                  } else {
                    $("#movieList1 ol").css({height:thumHeight1*2+120});
                  }
              });
            
            // 공연 차트 moremovie 버튼 
            
              var moreBtn1 = 0; 
            
              $("#body02-1 #moreMovie1").click(function(){
                if ( moreBtn1 == 0 ) { 
                      $("#movieList1 ol").animate({height:thumHeight1*2+120},500);
                      $("#body02-1 #moreMovie1 span").eq(0).animate({opacity:0},200);
                      sizeUp1 = 1;
                      moreBtn1 = 1; 
                } else { 
                      $("#movieList1 ol").animate({height:thumHeight1+20},500);
                      $("#body02-1 #moreMovie1 span").eq(0).animate({opacity:1},200);
                      sizeUp1 = 0;
                      moreBtn1 = 0;
                    }
              });  
              
            });
            </script> -->
            
            <div id="body02-1" class="visualWidth">
                <!-- body02-1은 알고리즘을 통한 개인 추천작품 -->
                <h2>#username님_추천작품</h2> 
                <!-- 여기에 username받아와야함!!!!! 백필요 -->
                <div id="movieChartWrap-1">
                    <div id="movieChart1">
                        <div id="movieChartbg-1"></div>
                        <ul>
                            <li>전체</li>
                            <li>100%미만</li>
                            <li>100%이상</li>
                        </ul>
                    </div>
                </div>
                <div id="movieBody-1">
                    <div id="movieList1">
                             <ol style="height: 420.594px;">
                                <li class="undefined1"><div class="rankNum1"><img src="./images/MEGACorner.png" alt="첫번째 순위" '=""><span>1</span></div><a href="#" '=""><img src="./images/movie01.jpg" alt="첫번째순위"></a><dl><dt>펀딩율 19.8%</dt><dt>5,989</dt><dd>미션 임파서블</dd><dt>2023.07.12 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li>
                                <li class="undefined1"><div class="rankNum1"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>2</span></div><a href="#" '=""><img src="./images/movie02.jpg" alt="두번째순위"></a><dl><dt>펀딩율 13.6%</dt><dt>3,714</dt><dd>생일</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li>
                                <li class="undefined1"><div class="rankNum1"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>3</span></div><a href="#" '=""><img src="./images/movie03.jpg" alt="세번째순위"></a><dl><dt>펀딩율 7.5%</dt><dt>10,633</dt><dd>돈</dd><dt>2023.06.20 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li>
                                <li class="noMargin1 undefined1"><div class="rankNum1"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>4</span></div><a href="#" '="">
                                        <img src="./images/movie07.jpg" alt="네번째순위"></a><dl><dt>펀딩율 7.4%</dt><dt>33,483</dt><dd>어스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum1">
                                        <img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>5</span></div><a href="#" '=""><img src="./images/movie05.jpg" alt="다섯번째순위"></a><dl><dt>펀딩율 6.2%</dt><dt>4,228</dt><dd>콜레트</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined1"><div class="rankNum1">
                                            <img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>6</span></div><a href="#" '=""><img src="./images/movie06.jpg" alt="여섯번째순위"></a><dl><dt>펀딩율 5.4%</dt><dt>6,269</dt><dd>장난스런 키스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined1"><div class="rankNum1">
                                                <img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>7</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="일곱번째순위"></a><dl><dt>펀딩율 3.9%</dt><dt>21,941</dt><dd>범죄도시3</dd><dt>2023.06.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined1"><div class="rankNum1">
                                                    <img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>8</span></div><a href="#" '=""><img src="./images/movie08.jpg" alt="여덟번째순위"></a><dl><dt>펀딩율 3.1%</dt><dt>1,656</dt><dd>귀공자</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li></ol>
                    </div>
                </div>
                <div id="moreMovie1">
                    <span></span>
                    <span></span>
                </div>
                <div id="moreMovieScroll1">
                    <img src="./images/scrollDown.svg" alt="옆으로 스크롤 하세요">
                </div>
            </div>

            <div id="body02-2" class="visualWidth">
                <h2>#username님_집합사람들의_추천</h2>
                <!-- 너네 집단이 이런거 좋아한다는걸 뭐라할지 모르겠다 -->
                <div id="movieChartWrap-2">
                    <div id="movieChart2">
                        <div id="movieChartbg-2"></div>
                        <ul>
                            <li>전체</li>
                        <!--전체=movechart-->
                            <li>100%미만</li>
                        <!--100%미만=soonchart-->
                            <li>100%이상</li>
                        <!--100%미만=arthousechart-->

                        </ul>
                    </div>
                </div>
                <div id="movieBody-2">
                    <div id="movieList2">
                             <ol style="height: 420.594px;"><li class="undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>1</span></div><a href="#" '=""><img src="./images/movie01.jpg" alt="첫번째순위"></a><dl><dt>펀딩율 19.8%</dt><dt>5,989</dt><dd>미션 임파서블</dd><dt>2023.07.12 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>2</span></div><a href="#" '=""><img src="./images/movie02.jpg" alt="두번째순위"></a><dl><dt>펀딩율 13.6%</dt><dt>3,714</dt><dd>생일</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>3</span></div><a href="#" '=""><img src="./images/movie03.jpg" alt="세번째순위"></a><dl><dt>펀딩율 7.5%</dt><dt>10,633</dt><dd>돈</dd><dt>2023.06.20 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="noMargin undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>4</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="네번째순위"></a><dl><dt>펀딩율 7.4%</dt><dt>33,483</dt><dd>어스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>5</span></div><a href="#" '=""><img src="./images/movie05.jpg" alt="다섯번째순위"></a><dl><dt>펀딩율 6.2%</dt><dt>4,228</dt><dd>콜레트</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>6</span></div><a href="#" '=""><img src="./images/movie06.jpg" alt="여섯번째순위"></a><dl><dt>펀딩율 5.4%</dt><dt>6,269</dt><dd>장난스런 키스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>7</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="일곱번째순위"></a><dl><dt>펀딩율 3.9%</dt><dt>21,941</dt><dd>범죄도시3</dd><dt>2023.06.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>8</span></div><a href="#" '=""><img src="./images/movie08.jpg" alt="여덟번째순위"></a><dl><dt>펀딩율 3.1%</dt><dt>1,656</dt><dd>귀공자</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li></ol>
                    </div>
                </div>
                <div id="moreMovie2">
                    <span></span>
                    <span></span>
                </div>
                <div id="moreMovieScroll2">
                    <img src="./images/scrollDown.svg" alt="옆으로 스크롤 하세요">
                </div>
            </div>

            <br>
            <br>
         
                                                      

        <div id="body03" class="visualWidth">
            <div id="body02Invi"></div>
            <div id="body02Wrap">
                <div id="photocard">
                    <img src="./images/photocard1.png" alt="포토카드1"/>
                    <img src="./images/photocard2.png" alt="포토카드2"/>
                    <img src="./images/photocard3.png" alt="포토카드3"/>
                </div>
                <div id="body02Info">
                    <h3>박수투자 오리지널 티켓</h3>
                    <h4>메가박스가 제안하는 공연를 가장 잘 간직하는 방법</h4>
                    <button onfocus="this.blur()">
                        <a href="#">
                            <span>자세히 보기</span>
                        </a>
                    </button>
                    <button onfocus="this.blur()">
                        <a href="#">
                            <img src="./images/claplogo_orange.svg" alt="박수투자 모바일 어플">
                            <span>모바일 어플 다운받기</span>
                        </a>
                    </button>
                </div>
            </div>
        </div>
  
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
            

        <div id="body05" class="visualWidth">
            <h2>EVENT</h2>
            <div class="carouselTicker">
                <div class="carouselTicker__wrap" style="position: relative; overflow: hidden; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none;"><ul style="width: 4000px; left: -1282px; position: relative;">
                    <li><a href="#"><img src="./images/event1.jpg" alt="event"></a></li>
                    <li><a href="#"><img src="./images/event2.jpg" alt="event"></a></li>
                    <li><a href="#"><img src="./images/event3.jpg" alt="event"></a></li>
                    <li><a href="#"><img src="./images/event1.jpg" alt="event"></a></li>
                    <li><a href="#"><img src="./images/event2.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event1.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event2.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event3.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event1.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event2.jpg" alt="event"></a></li
                        ></ul></div>	
            </div>
        </div>
        <footer>
            <div id="footerTop">
                <ul class="visualWidth">
                    <li><a href="#">회사소개</a></li>
                    <li><a href="#">IR</a></li>
                    <li><a href="#">채용정보</a></li>
                    <li><a href="#">광고/프로모션문의</a></li>
                    <li><a href="#">출점문의</a></li>
                    <li><a href="#">이용약관</a></li>
                    <li><a href="#">편성기준</a></li>
                    <li><a href="./개인정보처리방침/person.html">개인정보처리방침</a></li>
                    <li><a href="#">법적고지</a></li>
                    <li><a href="#">이메일주소무단수집</a></li>
                    <li><a href="#">상생경영</a></li>
                    <li><a href="#">사이트</a></li>
                </ul>
            </div>
            <div id="footerBottom" class="visualWidth">
                <h1><img src="./images/claplogo_orange.svg" alt="박수투자"></h1>
                <div id="address">
                    <address>서울특별시 성동구 왕십리로 50, 6층 (성수동1가, 메가박스 스퀘어)</address>
                    <ol>
                        <li>대표이사 : 홍정인</li>
                        <li>개인정보보호 책임자 : 정종민</li>
                        <li>사업자등록번호 : 211-86-59478</li>
                        <li>통신판매업신고번호 : 2017-서울용산-0662</li>
                        <li>통신판매업신고번호 : 2023-서울성동-0177</li>
                        <li>박수투자고객센터 : 1544-0070</li>
                    </ol>
                </div>
                <div id="familySite">
                    <select>
                        <option selected="">제작팀 바로가기</option>
                        <option value="#">kopis</option>
                        <option value="#">istp</option>
                    </select>
                    <address>© 박수투자, team_istp. All Rights Reserved</address>
                </div>
                
            </div>
        </footer>
        <div id="reservePopupbg">
            <div id="reservePopup">
                <div id="closeBtn">
                    <button>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div id="languageWrap">
                    <button>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                            <path class="rereserve" d="M25,5c-3.7,0-7.3,0.9-10.5,2.7L9.8,1L3.2,21L24,21.2l-4.9-6.9C21,13.4,23,13,25,13c7.7,0,14,6.3,14,14s-6.3,14-14,14s-14-6.3-14-14H3c0,12.1,9.9,22,22,22s22-9.9,22-22S37.1,5,25,5z"></path>
                        </svg>
    
                        펀딩 다시하기
                    </button>
                    <div id="language">
                        <div id="languagebg"></div>
                        <span style="color: rgb(255, 255, 255);">KOR</span>
                        <span>ENG</span>
                    </div>
                </div>
                <div id="reservebd">
                    <div id="reserveBox">
                        <div id="reserve01" class="reserve">
                            <div class="reserveClass">극장</div>
                            <ol>
                                <li>전체</li>
                                <li>society</li>
                            </ol>
                            <ul class="region">
                                <li>서울</li>
                                <li>경기</li>
                                <li>인천</li>
                                <li>강원</li>
                                <li>대전/충청</li>
                                <li>대구</li>
                                <li>부산/울산</li>
                                <li>경상</li>
                                <li>광주/전라/제주</li>
                            </ul>
                            <ul class="regionDetail">
                                <li>강남</li>
                                <li>강변</li>
                                <li>건대입구</li>
                                <li>구로</li>
                                <li>대학로</li>
                                <li>동대문</li>
                                <li>등촌</li>
                                <li>목동</li>
                                <li>미아</li>
                                <li>불광</li>
                                <li>상봉</li>
                                <li>성신여대입구</li>
                                <li>송파</li>
                                <li>수유</li>
                                <li>신촌아트레온</li>
                                <li>씨네드쉐프 압구정</li>
                            </ul>
                        </div>
                        <div id="reserve02" class="reserve">
                            <div class="reserveClass">공연</div>
                            <ol>
                                <li>펀딩율</li>
                                <li>최신순</li>
                            </ol>
                            <table>
                                <tbody><tr>
                                    <td><span class="blue">12</span></td>
                                    <td>미션 임파서블</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>엘리맨탈</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>스파이더맨</td>
                                </tr>
                                <tr>
                                    <td><span class="orange">15</span></td>
                                    <td>악마들</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>도라에몽</td>
                                </tr>
                                <tr>
                                    <td><span class="orange">15</span></td>
                                    <td>범죄도시3</td>
                                </tr>
                                <tr>
                                    <td><span class="orange">15</span></td>
                                    <td>플래시</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>코난</td>
                                </tr>
                                <tr>
                                    <td><span class="red">19</span></td>
                                    <td>몸값</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>TAK-SHOW</td>
                                </tr>
    
                            </tbody></table>
                        </div>
                        <div id="reserve03" class="reserve">
                            <div class="reserveClass">날짜</div>
                            <p>2023<span>07</span></p>
                            <ul>
                                <li>1 토</li>
                                <li>2 일</li>
                                <li>3 월</li>
                                <li>4 화</li>
                                <li>5 수</li>
                                <li>6 목</li>
                                <li>7 금</li>
                                <li>8 토</li>
                                <li>9 일</li>
                                <li>10 월</li>
                                <li>11 화</li>
                                <li>12 수</li>
                            </ul>
                        </div>
                        <div id="reserve07" class="reserve">
                            <div class="reserveClass">시간</div>
                            <p>극장, 공연, 날짜를 선택해주세요.</p>
                        </div>
                    </div>
                </div>
                <div id="reserveBottom">
                    <span>도움이 필요하신가요?</span>
                    <button>
                        좌석 선택
                    </button>
                </div>
            </div>
        </div> 
    </body></html>
        `)
    }
    else{
    verified = jwt.verify(token.substring(4), secretkey);
    res.send(`
    <html lang="ko"><head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">  
    <link href="./images/claplogo_orange.svg" rel="shortcut icon" type="image/x-icon">
    <title>박수투자</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/movie.css">
    <link rel="stylesheet" href="/css/aos.css">
    <link rel="stylesheet" href="https://use.typekit.net/mqq0uoy.css">
    <style>
    </style>
    <script src="./js/jquery-3.3.1.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="./js/jquery.carouselTicker.min.js"></script>
    <script>
    $(function(){
        
    // menu height
    
        menuHover(350,120);
        function menuHover(a,b){
            $("header nav #headerMenu ul > li").hover(function(){
                $("header").stop().animate({height:a});
                $("header #hiddenHeader").addClass("redbg");
            },function(){
                $("header").stop().animate({height:b});
                $("header #hiddenHeader").removeClass("redbg");
            });
        }
        
    // menu height scroll up down
    
        var scrollPosition = $(window).scrollTop(); 
        var scrollNum = 0;
        $(window).scroll(function() {
              var scroll = $(window).scrollTop();
                  
            if ( scroll > ( scrollPosition + 20 )  && scrollNum == 0 ) {
                   console.log('scrollDown');
                   $("header").animate({height:80},300);
                   menuHover(310,80);
                   $("header nav").addClass("smallMenu");
                   $("header nav #headerLogoWrap").addClass("smallMenu");
                   $("header nav #headerLogoWrap h1").addClass("smallMenu");
                   $("header nav #login").addClass("smallMenu");
                   scrollNum = 1;
            } else if ( scroll <  ( scrollPosition - 20 )  && scrollNum == 1 ) {
                   console.log('scrollUp');
                   $("header").animate({height:120},500);
                   menuHover(350,120);
                   $("header nav").removeClass("smallMenu");
                   $("header nav #headerLogoWrap").removeClass("smallMenu");
                   $("header nav #headerLogoWrap h1").removeClass("smallMenu");
                   $("header nav #login").removeClass("smallMenu");
                   scrollNum = 0;
            }
            scrollPosition = scroll;
        });
    
    // menu background
    
        $("header nav #headerMenu ul > li").eq(0).mouseenter(function(){
            $("header #hHeaderbg:not(animated)").stop(true,true).animate({marginLeft:0});
        });
        $("header nav #headerMenu ul > li").eq(1).mouseenter(function(){
            $("header #hHeaderbg:not(animated)").stop(true,true).animate({marginLeft:"25%"});
        });
        $("header nav #headerMenu ul > li").eq(2).mouseenter(function(){
            $("header #hHeaderbg:not(animated)").stop(true,true).animate({marginLeft:"50%"});
        });
        $("header nav #headerMenu ul > li").eq(3).mouseenter(function(){
            $("header #hHeaderbg:not(animated)").stop(true,true).animate({marginLeft:"75%"});
        });
    
        $("#body01 ol li").eq(0).addClass("pagerClick"); 
    
    // slider
    
        var imgNum = 0; 
        var sliderWidth = $("#body01 ul li").width();
        setInterval(function(){
            imgNum++;
            if ( imgNum > 3 ) {
                $("#body01 ul").css({marginLeft:0});
                $("#body01 ul").animate({marginLeft:-sliderWidth});
                $("#body01 ol li").removeClass("pagerClick");
                $("#body01 ol li").eq(1).addClass("pagerClick"); 
                imgNum = 1;
            } else {
                $("#body01 ul").animate({marginLeft:-sliderWidth * imgNum});
                $("#body01 ol li").removeClass("pagerClick");
                $("#body01 ol li").eq(imgNum).addClass("pagerClick");
            }
        },3000);
    
    
    // 공연 차트 버튼
    
        $("#body02 #movieChart ul li").eq(0).click(function(){
            $("#body02 #movieChart #movieChartbg").removeClass("preMovie");
            $("#body02 #movieChart #movieChartbg").removeClass("arthouse");
            $("#body02 #movieChart ul li").css({color:"white"});
            $(this).css({color:"white"});
        });
        $("#body02 #movieChart ul li").eq(1).click(function(){
            $("#body02 #movieChart #movieChartbg").addClass("preMovie");
            $("#body02 #movieChart #movieChartbg").removeClass("arthouse");
            $("#body02 #movieChart ul li").css({color:"white"});
            $(this).css({color:"white"});
            });
        $("#body02 #movieChart ul li").eq(2).click(function(){
            $("#body02 #movieChart #movieChartbg").removeClass("preMovie");
            $("#body02 #movieChart #movieChartbg").addClass("arthouse");
            $("#body02 #movieChart ul li").css({color:"white"});
            $(this).css({color:"white"});
        });     
    
    // 공연 차트 객체로 불러오기 
    
        var movie = { 
            moveChart: [ 
                { num:1, poster:'./images/movie01.jpg', ticket:19.8, view:'5,989', title:'미션 임파서블',start:'2023.07.06',text:'첫번째순위'},
                { num:2, poster:'./images/movie02.jpg', ticket:13.6, view:'3,714', title:'엘리멘탈',start:'2023.07.06',text:'두번째순위'},
                { num:3, poster:'./images/movie03.jpg', ticket:7.5, view:'10,633', title:'스파이더맨',start:'2023.06.20',text:'세번째순위'},
                { num:4, poster:'./images/movie07.jpg', ticket:7.4, view:'33,483', title:'범죄도시3',start:'2023.06.27',text:'네번째순위'},
                { num:5, poster:'./images/movie05.jpg', ticket:6.2, view:'4,228', title:'악마들',start:'2023.06.27',text:'다섯번째순위'},
                { num:6, poster:'./images/movie06.jpg', ticket:5.4, view:'6,269', title:'도라에몽',start:'2023.06.27',text:'여섯번째순위'},
                { num:7, poster:'./images/movie04.jpg', ticket:3.9, view:'21,941', title:'인디아나 존스',start:'2023.06.06',text:'일곱번째순위'},
                { num:8, poster:'./images/movie08.jpg', ticket:3.1, view:'1,656', title:'귀공자',start:'2023.07.06',text:'여덟번째순위'}
            ],
            soonChart: [
                //여기서 d-day도 불러와야함 >>펀딩 달성 못한건 펀딩마감까지 기간을 d-day표시해둠!!
                //남은 날짜구해야하는데 이건 우리가 구하지 말고 운영자가 직ㄱ접입력하게 하는게 좋을듯
                { num:'d-1', poster:'./images/movie09.jpg', ticket:9.0, view:'3,248', title:'여름날 우리',start:'2023.07.10',text:'첫번째순위'},
                { num:'d-1', poster:'./images/movie10.jpg', ticket:6.7, view:'2,258', title:'TAK-SHOW',start:'2023.07.10',text:'두번째순위'},
                { num:'d-1', poster:'./images/movie11.jpg', ticket:3.9, view:'17,871', title:'보이즈 어프레이드',start:'2023.07.10',text:'세번째순위'},
                { num:'d-1', poster:'./images/movie12.jpg', ticket:0.0, view:'61', title:'에프터 로이드 시티',start:'2023.07.10',text:'네번째순위'},
                { num:'d-2', poster:'./images/movie13.jpg', ticket:14.4, view:'5,123', title:'코난',start:'2023.07.11',text:'다섯번째순위'},
                { num:'d-2', poster:'./images/movie14.jpg', ticket:2.8, view:'2,382', title:'플래쉬',start:'2023.07.11',text:'여섯번째순위'},
                { num:'d-2', poster:'./images/movie15.jpg', ticket:0.5, view:'1,539', title:'magnolia',start:'2023.07.11',text:'일곱번째순위'},
                { num:'d-2', poster:'./images/movie16.jpg', ticket:0.4, view:'2,735', title:'interview with the vampire',start:'2023.07.11',text:'여덟번째순위'}
            ],
            artHouse: [
                { num:1, poster:'./images/movie05.jpg', ticket:60.0, view:'4,247', title:'악마들',start:'2023.06.07',text:'첫번째순위'},
                { num:2, poster:'./images/movie18.jpg', ticket:7.5, view:'1,408', title:'남은 인생 10년',start:'2023.06.28',text:'두번째순위'},
                { num:3, poster:'./images/movie19.jpg', ticket:2.2, view:'5,827', title:'하느님의 마음',start:'2017.05.17',text:'세번째순위'},
                { num:4, poster:'./images/movie20.jpg', ticket:1.7, view:'5,703', title:'a few good men',start:'2023.02.21',text:'네번째순위'},
                { num:5, poster:'./images/movie21.jpg', ticket:1.6, view:'333', title:'vanilla sky',start:'2023.06.27',text:'다섯번째순위'},
                { num:6, poster:'./images/movie22.jpg', ticket:0.3, view:'493', title:'풍재기시',start:'2023.06.27',text:'여섯번째순위'},
                { num:7, poster:'./images/movie23.jpg', ticket:0.2, view:'1,725', title:'군산전기',start:'2018.06.07',text:'일곱번째순위'},
                { num:8, poster:'./images/movie24.jpg', ticket:0.2, view:'757', title:'몸값',start:'2016.02.17',text:'여덟번째순위'}
            ]}
    
        var part = movie.moveChart;
    
        $("#movieChart ul li").click(function(){
            var chkIndex = $(this).index();
            switch(chkIndex) {
                case 0:
                    part = movie.moveChart;
                    moveList();
                    break;
                case 1:
                    part = movie.soonChart;
                    moveList('ddate');
                    break;
                case 2:   
                    part = movie.artHouse;
                    moveList();
                    break;                            
            }
        });
    
          moveList();
    
          function moveList(ddate) {
            var html = "";
            for( var i = 0; i < 8; i++) {
                  if ( i == 3 ) {      
                    html += "<li class='noMargin " + ddate +"'>";
                  } else {
                    html += "<li class='" + ddate + "'>";
                  }
    
                  html += "<div class='rankNum'>";
                  if ( i == 0 ) {
                    html += "<img src='./images/MegaCorner.png' alt='첫번째 순위''/>";
                  } else {
                    html += "<img src='./images/MegaCorner.png' alt='첫번째 순위''/>";
                  }
                  html += "<span>"+ part[i].num +"</span>";
                  html += "</div>";      
                  html += "<a href='#''><img src='"+ part[i].poster +"' alt='"+ part[i].text + "'/></a>";      
                  html += "<dl><dt>펀딩율 "+ part[i].ticket +"&#37</dt><dt>" + part[i].view + "</dt>";
                  html += "<dd>"+ part[i].title +"</dd><dt>"+ part[i].start+" 펀딩마감</dt>";
                  html += "<a href='#''>펀딩</a>";
                  html += "</dl></li>";
            }
// 여기서 view는 하트옆에 숫자 우리는 펀딩달성률로 고쳐서 써야하는데 손을 못댐ㅠ
//위에 var movie에서 chart 선언할때 숫자값으로 그냥 줬는데 그걸 백으로 달선현황/목표값 으로 받아오면 될것같애!!백연결하면서 여기도 손보기

            $("#movieList ol").html(html); 
          }
    
          setTimeout(function(){
            thumHeight = $("#body02 #movieBody #movieList ol li").height(); //height 받아옴
             $("#movieList ol").css({height:thumHeight+20});
          },300);
    
          var sizeUp = 0;
          $(window).resize(function(){
    
              thumHeight = $("#body02 #movieBody #movieList ol li").height(); 
              if ( sizeUp == 0 ) { 
                $("#movieList ol").css({height:thumHeight+20});
              } else {
                $("#movieList ol").css({height:thumHeight*2+120});
              }
          });
    
          var moreBtn = 0; 
    
          $("#body02 #moreMovie").click(function(){
            if ( moreBtn == 0 ) { 
                  $("#movieList ol").animate({height:thumHeight*2+120},500);
                  $("#body02 #moreMovie span").eq(0).animate({opacity:0},200);
                  sizeUp = 1;
                  moreBtn = 1; 
            } else { 
                  $("#movieList ol").animate({height:thumHeight+20},500);
                  $("#body02 #moreMovie span").eq(0).animate({opacity:1},200);
                  sizeUp = 0;
                  moreBtn = 0;
                }
          });
    

    //body02-1  
            // 공연 차트 버튼
                
            $("#body02-1 #movieChart1 ul li").eq(0).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("preMovie1");
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("arthouse1");
                $("#body02-1 #movieChart1 ul li").css({color:"white"});
                $(this).css({color:"white"});
            });
            $("#body02-1 #movieChart1 ul li").eq(1).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").addClass("preMovie1");
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("arthouse1");
                $("#body02-1 #movieChart1 ul li").css({color:"white"});
                $(this).css({color:"white"});
                });
            $("#body02-1 #movieChart1 ul li").eq(2).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("preMovie1");
                $("#body02-1 #movieChart1 #movieChartbg-1").addClass("arthouse1");
                $("#body02-1 #movieChart1 ul li").css({color:"white"});
                $(this).css({color:"white"});
            });     
            
            // 공연 차트 객체로 불러오기 
            
            var movie1 = { 
                moveChart1: [ 
                    { num:1, poster:'./images/movie01.jpg', ticket:19.8, view:'5,989', title:'샤잠!',start:'2019.04.03',text:'첫번째순위'},
                    { num:2, poster:'./images/movie02.jpg', ticket:13.6, view:'3,714', title:'생일',start:'2019.04.03',text:'두번째순위'},
                    { num:3, poster:'./images/movie03.jpg', ticket:7.5, view:'10,633', title:'돈',start:'2019.03.20',text:'세번째순위'},
                    { num:4, poster:'./images/movie04.jpg', ticket:7.4, view:'33,483', title:'어스',start:'2019.03.27',text:'네번째순위'},
                    { num:5, poster:'./images/movie05.jpg', ticket:6.2, view:'4,228', title:'콜레트',start:'2019.03.27',text:'다섯번째순위'},
                    { num:6, poster:'./images/movie06.jpg', ticket:5.4, view:'6,269', title:'장난스런 키스',start:'2019.03.27',text:'여섯번째순위'},
                    { num:7, poster:'./images/movie07.jpg', ticket:3.9, view:'21,941', title:'캡틴마블',start:'2019.03.06',text:'일곱번째순위'},
                    { num:8, poster:'./images/movie08.jpg', ticket:3.1, view:'1,656', title:'로망',start:'2019.04.03',text:'여덟번째순위'}
                ],
                soonChart1: [
                    { num:'d-1', poster:'./images/movie09.jpg', ticket:9.0, view:'3,248', title:'헬보이',start:'2019.04.10',text:'첫번째순위'},
                    { num:'d-1', poster:'./images/movie10.jpg', ticket:6.7, view:'2,258', title:'파이브 피트',start:'2019.04.10',text:'두번째순위'},
                    { num:'d-1', poster:'./images/movie11.jpg', ticket:3.9, view:'17,871', title:'공포의 묘지',start:'2019.04.10',text:'세번째순위'},
                    { num:'d-1', poster:'./images/movie12.jpg', ticket:0.0, view:'61', title:'키코리키',start:'2019.04.10',text:'네번째순위'},
                    { num:'d-2', poster:'./images/movie13.jpg', ticket:14.4, view:'5,123', title:'바이스',start:'2019.04.11',text:'다섯번째순위'},
                    { num:'d-2', poster:'./images/movie14.jpg', ticket:2.8, view:'2,382', title:'미성년',start:'2019.04.11',text:'여섯번째순위'},
                    { num:'d-2', poster:'./images/movie15.jpg', ticket:0.5, view:'1,539', title:'퍼스트 리폼드',start:'2019.04.11',text:'일곱번째순위'},
                    { num:'d-2', poster:'./images/movie16.jpg', ticket:0.4, view:'2,735', title:'유럽미술관 산책',start:'2019.04.11',text:'여덟번째순위'}
                ],
                artHouse1: [
                    { num:1, poster:'./images/movie05.jpg', ticket:60.0, view:'4,247', title:'콜레트!',start:'2019.03.07',text:'첫번째순위'},
                    { num:2, poster:'./images/movie18.jpg', ticket:7.5, view:'1,408', title:'루스 베이더 긴즈버그',start:'2019.03.28',text:'두번째순위'},
                    { num:3, poster:'./images/movie19.jpg', ticket:2.2, view:'5,827', title:'불한당 - 나쁜 놈들의 세상',start:'2017.05.17',text:'세번째순위'},
                    { num:4, poster:'./images/movie20.jpg', ticket:1.7, view:'5,703', title:'더 페이버릿',start:'2019.02.21',text:'네번째순위'},
                    { num:5, poster:'./images/movie21.jpg', ticket:1.6, view:'333', title:'강변호텔',start:'2019.03.27',text:'다섯번째순위'},
                    { num:6, poster:'./images/movie22.jpg', ticket:0.3, view:'493', title:'선희와 슬기',start:'2019.03.27',text:'여섯번째순위'},
                    { num:7, poster:'./images/movie23.jpg', ticket:0.2, view:'1,725', title:'유전',start:'2018.06.07',text:'일곱번째순위'},
                    { num:8, poster:'./images/movie24.jpg', ticket:0.2, view:'757', title:'영웅본색',start:'2016.02.17',text:'여덟번째순위'}
                ]};
            
            var part1 = movie1.moveChart1;
            
            $("#movieChart1 ul li").click(function(){
                var chkIndex1 = $(this).index();
                switch(chkIndex1) {
                    case 0:
                        part1 = movie1.moveChart1;
                        moveList1();
                        break;
                    case 1:
                        part1 = movie1.soonChart1;
                        moveList1('ddate1');
                        break;
                    case 2:   
                        part1 = movie1.artHouse1;
                        moveList1();
                        break;                            
                }
            });
            
              moveList1();
            
              function moveList1(ddate1) {
                var html = "";
                for( var i = 0; i < 8; i++) {
                      if ( i == 3 ) {      
                        html += "<li class='noMargin1 " + ddate1 +"'>";
                      } else {
                        html += "<li class='" + ddate1 + "'>";
                      }
            
                      html += "<div class='rankNum1'>";
                      if ( i == 0 ) {
                        html += "<img src='./images/MEGACorner.png' alt='첫번째 순위''/>";
                      } else {
                        html += "<img src='./images/whiteCorner.svg' alt='첫번째 순위''/>";
                      }
                      html += "<span>"+ part1[i].num +"</span>";
                      html += "</div>";      
                      html += "<a href='#''><img src='"+ part1[i].poster +"' alt='"+ part1[i].text + "'/></a>";      
                      html += "<dl><dt>펀딩율 "+ part1[i].ticket +"&#37</dt><dt>" + part1[i].view + "</dt>";
                      html += "<dd>"+ part1[i].title +"</dd><dt>"+ part1[i].start+" 펀딩마감</dt>";
                      html += "<a href='#''>펀딩</a>";
                      html += "</dl></li>";
                }
                $("#movieList1 ol").html(html); 
              }
            
            // 공연 차트 height값 받아오기 
            
              setTimeout(function(){
                thumHeight1 = $("#body02-1 #movieBody-1 #movieList1 ol li").height(); 
                 $("#movieList1 ol").css({height:thumHeight1+20});
              },300);
            
            // 공연 차트 height값 지정
            
              var sizeUp1 = 0;
              $(window).resize(function(){
            
                  thumHeight1= $("#body02-1 #movieBody-1 #movieList1 ol li").height(); 
                  if ( sizeUp1 == 0 ) { 
                    $("#movieList1 ol").css({height:thumHeight1+20});
                  } else {
                    $("#movieList1 ol").css({height:thumHeight1*2+120});
                  }
              });
            
            // 공연 차트 moremovie 버튼 
            
              var moreBtn1 = 0; 
            
              $("#body02-1 #moreMovie1").click(function(){
                if ( moreBtn1 == 0 ) { 
                      $("#movieList1 ol").animate({height:thumHeight1*2+120},500);
                      $("#body02-1 #moreMovie1 span").eq(0).animate({opacity:0},200);
                      sizeUp1 = 1;
                      moreBtn1 = 1; 
                } else { 
                      $("#movieList1 ol").animate({height:thumHeight1+20},500);
                      $("#body02-1 #moreMovie1 span").eq(0).animate({opacity:1},200);
                      sizeUp1 = 0;
                      moreBtn1 = 0;
                    }
              });  
              
           

    //body02-2
    // 공연 차트 버튼
    
$("#body02-2 #movieChart2 ul li").eq(0).click(function(){
    $("#body02-2 #movieChart2 #movieChartbg-2").removeClass("preMovie2");
    $("#body02-2 #movieChart2 #movieChartbg-2").removeClass("arthouse2");
    $("#body02-2 #movieChart2 ul li").css({color:"white"});
    $(this).css({color:"white"});
});
$("#body02-2 #movieChart2 ul li").eq(1).click(function(){
    $("#body02-2 #movieChart2 #movieChartbg-2").addClass("preMovie2");
    $("#body02-2 #movieChart2 #movieChartbg-2").removeClass("arthouse2");
    $("#body02-2 #movieChart2 ul li").css({color:"white"});
    $(this).css({color:"white"});
    });
$("#body02-2 #movieChart2 ul li").eq(2).click(function(){
    $("#body02-2 #movieChart2 #movieChartbg-2").removeClass("preMovie2");
    $("#body02-2 #movieChart2 #movieChartbg-2").addClass("arthouse2");
    $("#body02-2 #movieChart2 ul li").css({color:"white"});
    $(this).css({color:"white"});
});     

// 공연 차트 객체로 불러오기 

var movie2 = { 
    moveChart2: [ 
        { num:1, poster:'./images/movie01.jpg', ticket:19.8, view:'5,989', title:'샤잠!',start:'2019.04.03',text:'첫번째순위'},
        { num:2, poster:'./images/movie02.jpg', ticket:13.6, view:'3,714', title:'생일',start:'2019.04.03',text:'두번째순위'},
        { num:3, poster:'./images/movie03.jpg', ticket:7.5, view:'10,633', title:'돈',start:'2019.03.20',text:'세번째순위'},
        { num:4, poster:'./images/movie04.jpg', ticket:7.4, view:'33,483', title:'어스',start:'2019.03.27',text:'네번째순위'},
        { num:5, poster:'./images/movie05.jpg', ticket:6.2, view:'4,228', title:'콜레트',start:'2019.03.27',text:'다섯번째순위'},
        { num:6, poster:'./images/movie06.jpg', ticket:5.4, view:'6,269', title:'장난스런 키스',start:'2019.03.27',text:'여섯번째순위'},
        { num:7, poster:'./images/movie07.jpg', ticket:3.9, view:'21,941', title:'캡틴마블',start:'2019.03.06',text:'일곱번째순위'},
        { num:8, poster:'./images/movie08.jpg', ticket:3.1, view:'1,656', title:'로망',start:'2019.04.03',text:'여덟번째순위'}
    ],
    soonChart2: [
        { num:'d-1', poster:'./images/movie09.jpg', ticket:9.0, view:'3,248', title:'헬보이',start:'2019.04.10',text:'첫번째순위'},
        { num:'d-1', poster:'./images/movie10.jpg', ticket:6.7, view:'2,258', title:'파이브 피트',start:'2019.04.10',text:'두번째순위'},
        { num:'d-1', poster:'./images/movie11.jpg', ticket:3.9, view:'17,871', title:'공포의 묘지',start:'2019.04.10',text:'세번째순위'},
        { num:'d-1', poster:'./images/movie12.jpg', ticket:0.0, view:'61', title:'키코리키',start:'2019.04.10',text:'네번째순위'},
        { num:'d-2', poster:'./images/movie13.jpg', ticket:14.4, view:'5,123', title:'바이스',start:'2019.04.11',text:'다섯번째순위'},
        { num:'d-2', poster:'./images/movie14.jpg', ticket:2.8, view:'2,382', title:'미성년',start:'2019.04.11',text:'여섯번째순위'},
        { num:'d-2', poster:'./images/movie15.jpg', ticket:0.5, view:'1,539', title:'퍼스트 리폼드',start:'2019.04.11',text:'일곱번째순위'},
        { num:'d-2', poster:'./images/movie16.jpg', ticket:0.4, view:'2,735', title:'유럽미술관 산책',start:'2019.04.11',text:'여덟번째순위'}
    ],
    artHouse2: [
        { num:1, poster:'./images/movie05.jpg', ticket:60.0, view:'4,247', title:'콜레트!',start:'2019.03.07',text:'첫번째순위'},
        { num:2, poster:'./images/movie18.jpg', ticket:7.5, view:'1,408', title:'루스 베이더 긴즈버그',start:'2019.03.28',text:'두번째순위'},
        { num:3, poster:'./images/movie19.jpg', ticket:2.2, view:'5,827', title:'불한당 - 나쁜 놈들의 세상',start:'2017.05.17',text:'세번째순위'},
        { num:4, poster:'./images/movie20.jpg', ticket:1.7, view:'5,703', title:'더 페이버릿',start:'2019.02.21',text:'네번째순위'},
        { num:5, poster:'./images/movie21.jpg', ticket:1.6, view:'333', title:'강변호텔',start:'2019.03.27',text:'다섯번째순위'},
        { num:6, poster:'./images/movie22.jpg', ticket:0.3, view:'493', title:'선희와 슬기',start:'2019.03.27',text:'여섯번째순위'},
        { num:7, poster:'./images/movie23.jpg', ticket:0.2, view:'1,725', title:'유전',start:'2018.06.07',text:'일곱번째순위'},
        { num:8, poster:'./images/movie24.jpg', ticket:0.2, view:'757', title:'영웅본색',start:'2016.02.17',text:'여덟번째순위'}
    ]}

var part2 = movie2.moveChart2;

$("#movieChart2 ul li").click(function(){
    var chkIndex2 = $(this).index();
    switch(chkIndex2) {
        case 0:
            part2 = movie2.moveChart2;
            moveList2();
            break;
        case 1:
            part2 = movie2.soonChart2;
            moveList2('ddate');
            break;
        case 2:   
            part2 = movie2.artHouse22;
            moveList2();
            break;                            
    }
});

  moveList2();

  function moveList2(ddate) {
    var html = "";
    for( var i = 0; i < 8; i++) {
          if ( i == 3 ) {      
            html += "<li class='noMargin " + ddate +"'>";
          } else {
            html += "<li class='" + ddate + "'>";
          }

          html += "<div class='rankNum2'>";
          if ( i == 0 ) {
            html += "<img src='./images/MEGACorner.png' alt='첫번째 순위''/>";
          } else {
            html += "<img src='./images/whiteCorner.svg' alt='첫번째 순위''/>";
          }
          html += "<span>"+ part2[i].num +"</span>";
          html += "</div>";      
          html += "<a href='#''><img src='"+ part2[i].poster +"' alt='"+ part2[i].text + "'/></a>";      
          html += "<dl><dt>펀딩율 "+ part2[i].ticket +"&#37</dt><dt>" + part2[i].view + "</dt>";
          html += "<dd>"+ part2[i].title +"</dd><dt>"+ part2[i].start+" 펀딩마감</dt>";
          html += "<a href='#''>펀딩</a>";
          html += "</dl></li>";
    }
    $("#movieList2 ol").html(html); 
  }

// 공연 차트 height값 받아오기 

  setTimeout(function(){
    thumHeight2 = $("#body02-2 #movieBody-2 #movieList2 ol li").height(); 
     $("#movieList2 ol").css({height:thumHeight1+20});
  },300);

// 공연 차트 height값 지정

  var sizeUp2 = 0;
  $(window).resize(function(){

      thumHeight2= $("#body02-2 #movieBody-2 #movieList2 ol li").height(); 
      if ( sizeUp2 == 0 ) { 
        $("#movieList2 ol").css({height:thumHeight1+20});
      } else {
        $("#movieList2 ol").css({height:thumHeight1*2+120});
      }
  });

// 공연 차트 moremovie 버튼 

  var moreBtn2 = 0; 

  $("#body02-2 #moreMovie2").click(function(){
    if ( moreBtn2 == 0 ) { 
          $("#movieList2 ol").animate({height:thumHeight1*2+120},500);
          $("#body02-2 #moreMovie2 span").eq(0).animate({opacity:0},200);
          sizeUp2 = 1;
          moreBtn2 = 1; 
    } else { 
          $("#movieList2 ol").animate({height:thumHeight1+20},500);
          $("#body02-2 #moreMovie2 span").eq(0).animate({opacity:1},200);
          sizeUp2 = 0;
          moreBtn2 = 0;
        }
  });  
  

    
    // AOS
         
        AOS.init();
    
    
    // 이벤트 slider 
    
    
        $(".carouselTicker").carouselTicker({
            speed: 2
        });
    
    
    // 팝업창 열고 닫기 
    
        $("header #quickReserve").click(function(){
            $("#reservePopupbg").fadeIn();
        });
        $("#reservePopupbg #closeBtn").click(function(){
            $("#reservePopupbg").fadeOut();
        });
    
    // 팝업창 언어 
    
        $("#reservePopupbg #language span").eq(0).css({color:"#fff"});
    
        $("#reservePopupbg #language span").eq(0).click(function(){
            $("#reservePopupbg #language #languagebg").animate({left:"-1"});
            $("#reservePopupbg #language span").css({color:"#000"});
            $(this).css({color:"#fff"});
        });
        $("#reservePopupbg #language span").eq(1).click(function(){
            $("#reservePopupbg #language #languagebg").animate({left:74});
            $("#reservePopupbg #language span").css({color:"#000"});
            $(this).css({color:"#fff"});
        });
    
    // 팝업창 극장 
    
        $("#reservePopupbg #reserve01 ul.region li").click(function(){
            $("#reservePopupbg #reserve01 ul.region li").css({background:"#f3f3f3",color:"#000"});
            $(this).css({background:"#a3a3a3",color:"#fff"});
        });
        $("#reservePopupbg #reserve01 ul.regionDetail li").click(function(){
            $("#reservePopupbg #reserve01 ul.regionDetail li").css({background:"#f3f3f3",color:"#000"});
            $(this).css({background:"#a3a3a3",color:"#fff"});
        });
        $("#reservePopupbg #reserve02 table tr").click(function(){
            $("#reservePopupbg #reserve02 table tr").css({background:"#f3f3f3",color:"#000"});
            $(this).css({background:"#a3a3a3",color:"#fff"});
        });
        $("#reservePopupbg #reserve03 ul li").click(function(){
            $("#reservePopupbg #reserve03 ul li").css({background:"#f3f3f3",color:"#000"});
            $(this).css({background:"#a3a3a3",color:"#fff"});
        });
    
    // 모바일 main visual 이미지 바꿔치기 
    
        var winWidth = $(window).width();
               if ( winWidth <= 600 ) {
                $("img","#body01 ul li").eq(0).attr("src","./images/mobileMain01.jpg")
                $("img","#body01 ul li").eq(1).attr("src","./images/mobileMain01.jpg")
                $("img","#body01 ul li").eq(2).attr("src","./images/mobileMain01.jpg")
                $("img","#body01 ul li").eq(3).attr("src","./images/mobileMain01.jpg")
            } else { 
                   $("img","#body01 ul li").eq(0).attr("src","./images/slider1.png")
                   $("img","#body01 ul li").eq(1).attr("src","./images/slider2.png")
                   $("img","#body01 ul li").eq(2).attr("src","./images/slider2.png")
                   $("img","#body01 ul li").eq(3).attr("src","./images/slider1.png")
            };
    
    // 모바일 menu button 
    
        var mobileBtnClickNum = 0; 
    
        $("#mobileHeader #mobileBtn01 #mobileMenubg").click(function(){
            if ( mobileBtnClickNum == 0 ){
                $("#mobileMenu").fadeIn(500);
                $("#mobileHeader #mobileBtn01 #mobileMenubg span").addClass("mobileBtnClick");
                mobileBtnClickNum = 1;
            } else {
                $("#mobileMenu").fadeOut(500);
                $("#mobileHeader #mobileBtn01 #mobileMenubg span").removeClass("mobileBtnClick");
                mobileBtnClickNum = 0;
            }	
        });
    // 모바일 personal button 
    
        $("#mobileHeader #mobileBtn03 img").click(function(){
            $("#mobilePersonal").fadeIn(500);	
        });
        $("#mobilePersonal #my박수투자 img").click(function(){
            $("#mobilePersonal").fadeOut(500);	
        });
    
    
    });
    </script>
    </head>
    
    <body data-aos-easing="ease" data-aos-duration="400" data-aos-delay="0">
        <header style="height: 120px;">
            <nav class="visualWidth">
                <div id="headerLogoWrap">
                    <h1>
                        <a href="/index">
                            <img src="./images/claplogo_orange.svg" alt="박수투자바로가기">
                        </a>
                    </h1>
                </div>
                <div id="login">
                    <ol>
                        <li><a href="/login">로그인</a></li>
                        <li><a href="/signup/">회원가입</a></li>
                    </ol>
                </div>
                <div id="headerMenu">
                    <ul>
                        <li>
                            <a href="#">공연</a>
                            <ol>
                                <li><a href="#">전체 공연</a></li>
                                <li><a href="#">연극</a></li>
                                <li><a href="#">뮤지컬</a></li>
                                <li><a href="#">클래식</a></li>
                                <li><a href="#">국악</a></li>
                                <li><a href="#">대중음악</a></li>
                                <li><a href="#">무용/대중무용</a></li>
                                <li><a href="#">서커스/마술</a></li>
                       
                                
                            </ol>
                        </li>
                        <li>
                            <a href="#">펀딩</a>
                            <ol>
                                <li><a href="#">펀딩 진행현황</a></li>
                                <li><a href="/fund">펀딩 신청서</a></li>
                            </ol>
                        </li>
                        <li>
                            <a href="#">스토어</a>
                            <ol>
                                <li><a href="#">펀딩굿즈</a></li>
                                <li><a href="#">펀딩티켓</a></li>
                            </ol>
                        </li>
                        <li>
                            <a href="#">이벤트</a>
                            <ol>
                                <li><a href="#">진행 중인 이벤트</a></li>
                                <li><a href="#">지난 이벤트</a></li>
                   

                            </ol>
                        </li>
                    </ul>
                    <div id="quickReserve">
                        <a href="#">
                            <img src="./images/ticket.png" alt="빠른펀딩">
                            <img src="./images/ticketwhite.png" alt="빠른펀딩">
                            <span>펀딩추천</span>
                        </a>
                    </div>
                </div>
            </nav>
            <div id="hiddenHeader" class="">
                <div class="visualWidth">
                    <div id="hHeaderWrap">
                        <div id="hHeaderUl">
                            <div id="hHeaderbg" style="margin-left: 75%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

                    
        <div id="body01">
            <ul style="margin-left: -2770px;">
                <li><img src="./images/slider1.png" alt="홍보"></li>
                <li><img src="./images/slider2.png" alt="홍보"></li>
                <li><img src="./images/slider2.png" alt="홍보"></li>
                <li><img src="./images/slider1.png" alt="홍보"></li>
            </ul>
            <ol>
                <li class=""></li>
                <li class=""></li>
                <li class="pagerClick"></li>
            </ol>
        </div>
       
        <div id="body02" class="visualWidth">
            <h2>#실시간_인기_급상승</h2>
            <div id="movieChartWrap">
                <div id="movieChart">
                    <div id="movieChartbg"></div>
                    <ul>
                        <li>전체</li>
                        <li>100%미만</li>
                        <li>100%이상</li>
                    </ul>
                </div>
            </div>
            <div id="movieBody">
                <div id="movieListWrap">
                <div id="movieList">
                    <ol style="height: 420.594px;"><li class="undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>1</span></div><a href="#" '=""><img src="./images/movie01.jpg" alt="첫번째순위"></a><dl><dt>펀딩율 19.8%</dt><dt>5,989</dt><dd>미션 임파서블</dd><dt>2023.07.12 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>2</span></div><a href="#" '=""><img src="./images/movie02.jpg" alt="두번째순위"></a><dl><dt>펀딩율 13.6%</dt><dt>3,714</dt><dd>생일</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>3</span></div><a href="#" '=""><img src="./images/movie03.jpg" alt="세번째순위"></a><dl><dt>펀딩율 7.5%</dt><dt>10,633</dt><dd>돈</dd><dt>2023.06.20 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="noMargin undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>4</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="네번째순위"></a><dl><dt>펀딩율 7.4%</dt><dt>33,483</dt><dd>어스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>5</span></div><a href="#" '=""><img src="./images/movie05.jpg" alt="다섯번째순위"></a><dl><dt>펀딩율 6.2%</dt><dt>4,228</dt><dd>콜레트</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>6</span></div><a href="#" '=""><img src="./images/movie06.jpg" alt="여섯번째순위"></a><dl><dt>펀딩율 5.4%</dt><dt>6,269</dt><dd>장난스런 키스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>7</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="일곱번째순위"></a><dl><dt>펀딩율 3.9%</dt><dt>21,941</dt><dd>범죄도시3</dd><dt>2023.06.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>8</span></div><a href="#" '=""><img src="./images/movie08.jpg" alt="여덟번째순위"></a><dl><dt>펀딩율 3.1%</dt><dt>1,656</dt><dd>귀공자</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li></ol>
                </div></div>
            </div>
            <div id="moreMovie">
                <span></span>
                <span></span>
            </div>
            <div id="moreMovieScroll">
                <img src="./images/scrollDown.svg" alt="옆으로 스크롤 하세요">
            </div>
        </div>


        <!-- <script>

            $(function(){    
            // 공연 차트 버튼
                
            $("#body02-1 #movieChart1 ul li").eq(0).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("preMovie");
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("arthouse");
                $("#body02-1 #movieChart1 ul li").css({color:"black"});
                $(this).css({color:"white"});
            });
            $("#body02-1 #movieChart1 ul li").eq(1).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").addClass("preMovie");
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("arthouse");
                $("#body02-1 #movieChart1 ul li").css({color:"black"});
                $(this).css({color:"white"});
                });
            $("#body02-1 #movieChart1 ul li").eq(2).click(function(){
                $("#body02-1 #movieChart1 #movieChartbg-1").removeClass("preMovie");
                $("#body02-1 #movieChart1 #movieChartbg-1").addClass("arthouse");
                $("#body02-1 #movieChart1 ul li").css({color:"black"});
                $(this).css({color:"white"});
            });     
            
            // 공연 차트 객체로 불러오기 
            
            var movie1 = { 
                moveChart1: [ 
                    { num:1, poster:'./images/movie01.jpg', ticket:19.8, view:'5,989', title:'샤잠!',start:'2019.04.03',text:'첫번째순위'},
                    { num:2, poster:'./images/movie02.jpg', ticket:13.6, view:'3,714', title:'생일',start:'2019.04.03',text:'두번째순위'},
                    { num:3, poster:'./images/movie03.jpg', ticket:7.5, view:'10,633', title:'돈',start:'2019.03.20',text:'세번째순위'},
                    { num:4, poster:'./images/movie04.jpg', ticket:7.4, view:'33,483', title:'어스',start:'2019.03.27',text:'네번째순위'},
                    { num:5, poster:'./images/movie05.jpg', ticket:6.2, view:'4,228', title:'콜레트',start:'2019.03.27',text:'다섯번째순위'},
                    { num:6, poster:'./images/movie06.jpg', ticket:5.4, view:'6,269', title:'장난스런 키스',start:'2019.03.27',text:'여섯번째순위'},
                    { num:7, poster:'./images/movie07.jpg', ticket:3.9, view:'21,941', title:'캡틴마블',start:'2019.03.06',text:'일곱번째순위'},
                    { num:8, poster:'./images/movie08.jpg', ticket:3.1, view:'1,656', title:'로망',start:'2019.04.03',text:'여덟번째순위'}
                ],
                soonChart1: [
                    { num:'d-1', poster:'./images/movie09.jpg', ticket:9.0, view:'3,248', title:'헬보이',start:'2019.04.10',text:'첫번째순위'},
                    { num:'d-1', poster:'./images/movie10.jpg', ticket:6.7, view:'2,258', title:'파이브 피트',start:'2019.04.10',text:'두번째순위'},
                    { num:'d-1', poster:'./images/movie11.jpg', ticket:3.9, view:'17,871', title:'공포의 묘지',start:'2019.04.10',text:'세번째순위'},
                    { num:'d-1', poster:'./images/movie12.jpg', ticket:0.0, view:'61', title:'키코리키',start:'2019.04.10',text:'네번째순위'},
                    { num:'d-2', poster:'./images/movie13.jpg', ticket:14.4, view:'5,123', title:'바이스',start:'2019.04.11',text:'다섯번째순위'},
                    { num:'d-2', poster:'./images/movie14.jpg', ticket:2.8, view:'2,382', title:'미성년',start:'2019.04.11',text:'여섯번째순위'},
                    { num:'d-2', poster:'./images/movie15.jpg', ticket:0.5, view:'1,539', title:'퍼스트 리폼드',start:'2019.04.11',text:'일곱번째순위'},
                    { num:'d-2', poster:'./images/movie16.jpg', ticket:0.4, view:'2,735', title:'유럽미술관 산책',start:'2019.04.11',text:'여덟번째순위'}
                ],
                artHouse1: [
                    { num:1, poster:'./images/movie05.jpg', ticket:60.0, view:'4,247', title:'콜레트!',start:'2019.03.07',text:'첫번째순위'},
                    { num:2, poster:'./images/movie18.jpg', ticket:7.5, view:'1,408', title:'루스 베이더 긴즈버그',start:'2019.03.28',text:'두번째순위'},
                    { num:3, poster:'./images/movie19.jpg', ticket:2.2, view:'5,827', title:'불한당 - 나쁜 놈들의 세상',start:'2017.05.17',text:'세번째순위'},
                    { num:4, poster:'./images/movie20.jpg', ticket:1.7, view:'5,703', title:'더 페이버릿',start:'2019.02.21',text:'네번째순위'},
                    { num:5, poster:'./images/movie21.jpg', ticket:1.6, view:'333', title:'강변호텔',start:'2019.03.27',text:'다섯번째순위'},
                    { num:6, poster:'./images/movie22.jpg', ticket:0.3, view:'493', title:'선희와 슬기',start:'2019.03.27',text:'여섯번째순위'},
                    { num:7, poster:'./images/movie23.jpg', ticket:0.2, view:'1,725', title:'유전',start:'2018.06.07',text:'일곱번째순위'},
                    { num:8, poster:'./images/movie24.jpg', ticket:0.2, view:'757', title:'영웅본색',start:'2016.02.17',text:'여덟번째순위'}
                ]}
            
            var part1 = movie.moveChart1;
            
            $("#movieChart1 ul li").click(function(){
                var chkIndex1 = $(this).index();
                switch(chkIndex1) {
                    case 0:
                        part = movie.moveChart1;
                        moveList1();
                        break;
                    case 1:
                        part = movie.soonChart1;
                        moveList1('ddate');
                        break;
                    case 2:   
                        part = movie.artHouse1;
                        moveList1();
                        break;                            
                }
            });
            
              moveList1();
            
              function moveList1(ddate) {
                var html = "";
                for( var i = 0; i < 8; i++) {
                      if ( i == 3 ) {      
                        html += "<li class='noMargin " + ddate +"'>";
                      } else {
                        html += "<li class='" + ddate + "'>";
                      }
            
                      html += "<div class='rankNum'>";
                      if ( i == 0 ) {
                        html += "<img src='../images/MegaCorner.png' alt='첫번째 순위''/>";
                      } else {
                        html += "<img src='./images/whiteCorner.svg' alt='첫번째 순위''/>";
                      }
                      html += "<span>"+ part1[i].num +"</span>";
                      html += "</div>";      
                      html += "<a href='#''><img src='"+ part1[i].poster +"' alt='"+ part1[i].text + "'/></a>";      
                      html += "<dl><dt>펀딩율 "+ part1[i].ticket +"&#37</dt><dt>" + part1[i].view + "</dt>";
                      html += "<dd>"+ part1[i].title +"</dd><dt>"+ part1[i].start+" 펀딩마감</dt>";
                      html += "<a href='#''>펀딩</a>";
                      html += "</dl></li>";
                }
                $("#movieList1 ol").html(html); 
              }
            
            // 공연 차트 height값 받아오기 
            
              setTimeout(function(){
                thumHeight1 = $("#body02-1 #movieBody-1 #movieList1 ol li").height(); 
                 $("#movieList1 ol").css({height:thumHeight1+20});
              },300);
            
            // 공연 차트 height값 지정
            
              var sizeUp1 = 0;
              $(window).resize(function(){
            
                  thumHeight1= $("#body02-1 #movieBody-1 #movieList1 ol li").height(); 
                  if ( sizeUp1 == 0 ) { 
                    $("#movieList1 ol").css({height:thumHeight1+20});
                  } else {
                    $("#movieList1 ol").css({height:thumHeight1*2+120});
                  }
              });
            
            // 공연 차트 moremovie 버튼 
            
              var moreBtn1 = 0; 
            
              $("#body02-1 #moreMovie1").click(function(){
                if ( moreBtn1 == 0 ) { 
                      $("#movieList1 ol").animate({height:thumHeight1*2+120},500);
                      $("#body02-1 #moreMovie1 span").eq(0).animate({opacity:0},200);
                      sizeUp1 = 1;
                      moreBtn1 = 1; 
                } else { 
                      $("#movieList1 ol").animate({height:thumHeight1+20},500);
                      $("#body02-1 #moreMovie1 span").eq(0).animate({opacity:1},200);
                      sizeUp1 = 0;
                      moreBtn1 = 0;
                    }
              });  
              
            });
            </script> -->
            
            <div id="body02-1" class="visualWidth">
                <!-- body02-1은 알고리즘을 통한 개인 추천작품 -->
                <h2>#${verified.name}님_추천작품</h2> 
                <!-- 여기에 username받아와야함!!!!! 백필요 -->
                <div id="movieChartWrap-1">
                    <div id="movieChart1">
                        <div id="movieChartbg-1"></div>
                        <ul>
                            <li>전체</li>
                            <li>100%미만</li>
                            <li>100%이상</li>
                        </ul>
                    </div>
                </div>
                <div id="movieBody-1">
                    <div id="movieList1">
                             <ol style="height: 420.594px;">
                                <li class="undefined1"><div class="rankNum1"><img src="./images/MEGACorner.png" alt="첫번째 순위" '=""><span>1</span></div><a href="#" '=""><img src="./images/movie01.jpg" alt="첫번째순위"></a><dl><dt>펀딩율 19.8%</dt><dt>5,989</dt><dd>미션 임파서블</dd><dt>2023.07.12 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li>
                                <li class="undefined1"><div class="rankNum1"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>2</span></div><a href="#" '=""><img src="./images/movie02.jpg" alt="두번째순위"></a><dl><dt>펀딩율 13.6%</dt><dt>3,714</dt><dd>생일</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li>
                                <li class="undefined1"><div class="rankNum1"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>3</span></div><a href="#" '=""><img src="./images/movie03.jpg" alt="세번째순위"></a><dl><dt>펀딩율 7.5%</dt><dt>10,633</dt><dd>돈</dd><dt>2023.06.20 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li>
                                <li class="noMargin1 undefined1"><div class="rankNum1"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>4</span></div><a href="#" '="">
                                        <img src="./images/movie07.jpg" alt="네번째순위"></a><dl><dt>펀딩율 7.4%</dt><dt>33,483</dt><dd>어스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum1">
                                        <img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>5</span></div><a href="#" '=""><img src="./images/movie05.jpg" alt="다섯번째순위"></a><dl><dt>펀딩율 6.2%</dt><dt>4,228</dt><dd>콜레트</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined1"><div class="rankNum1">
                                            <img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>6</span></div><a href="#" '=""><img src="./images/movie06.jpg" alt="여섯번째순위"></a><dl><dt>펀딩율 5.4%</dt><dt>6,269</dt><dd>장난스런 키스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined1"><div class="rankNum1">
                                                <img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>7</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="일곱번째순위"></a><dl><dt>펀딩율 3.9%</dt><dt>21,941</dt><dd>범죄도시3</dd><dt>2023.06.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined1"><div class="rankNum1">
                                                    <img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>8</span></div><a href="#" '=""><img src="./images/movie08.jpg" alt="여덟번째순위"></a><dl><dt>펀딩율 3.1%</dt><dt>1,656</dt><dd>귀공자</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li></ol>
                    </div>
                </div>
                <div id="moreMovie1">
                    <span></span>
                    <span></span>
                </div>
                <div id="moreMovieScroll1">
                    <img src="./images/scrollDown.svg" alt="옆으로 스크롤 하세요">
                </div>
            </div>

            <div id="body02-2" class="visualWidth">
                <h2>#${verified.name}님_집합사람들의_추천</h2>
                <!-- 너네 집단이 이런거 좋아한다는걸 뭐라할지 모르겠다 -->
                <div id="movieChartWrap-2">
                    <div id="movieChart2">
                        <div id="movieChartbg-2"></div>
                        <ul>
                            <li>전체</li>
                        <!--전체=movechart-->
                            <li>100%미만</li>
                        <!--100%미만=soonchart-->
                            <li>100%이상</li>
                        <!--100%미만=arthousechart-->

                        </ul>
                    </div>
                </div>
                <div id="movieBody-2">
                    <div id="movieList2">
                             <ol style="height: 420.594px;"><li class="undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>1</span></div><a href="#" '=""><img src="./images/movie01.jpg" alt="첫번째순위"></a><dl><dt>펀딩율 19.8%</dt><dt>5,989</dt><dd>미션 임파서블</dd><dt>2023.07.12 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>2</span></div><a href="#" '=""><img src="./images/movie02.jpg" alt="두번째순위"></a><dl><dt>펀딩율 13.6%</dt><dt>3,714</dt><dd>생일</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>3</span></div><a href="#" '=""><img src="./images/movie03.jpg" alt="세번째순위"></a><dl><dt>펀딩율 7.5%</dt><dt>10,633</dt><dd>돈</dd><dt>2023.06.20 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="noMargin undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>4</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="네번째순위"></a><dl><dt>펀딩율 7.4%</dt><dt>33,483</dt><dd>어스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/MegaCorner.png" alt="첫번째 순위" '=""><span>5</span></div><a href="#" '=""><img src="./images/movie05.jpg" alt="다섯번째순위"></a><dl><dt>펀딩율 6.2%</dt><dt>4,228</dt><dd>콜레트</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>6</span></div><a href="#" '=""><img src="./images/movie06.jpg" alt="여섯번째순위"></a><dl><dt>펀딩율 5.4%</dt><dt>6,269</dt><dd>장난스런 키스</dd><dt>2023.06.27 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>7</span></div><a href="#" '=""><img src="./images/movie07.jpg" alt="일곱번째순위"></a><dl><dt>펀딩율 3.9%</dt><dt>21,941</dt><dd>범죄도시3</dd><dt>2023.06.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li><li class="undefined"><div class="rankNum2"><img src="./images/whiteCorner.svg" alt="첫번째 순위" '=""><span>8</span></div><a href="#" '=""><img src="./images/movie08.jpg" alt="여덟번째순위"></a><dl><dt>펀딩율 3.1%</dt><dt>1,656</dt><dd>귀공자</dd><dt>2023.07.06 펀딩마감</dt><a href="#" '="">펀딩</a></dl></li></ol>
                    </div>
                </div>
                <div id="moreMovie2">
                    <span></span>
                    <span></span>
                </div>
                <div id="moreMovieScroll2">
                    <img src="./images/scrollDown.svg" alt="옆으로 스크롤 하세요">
                </div>
            </div>

            <br>
            <br>
         
                                                      

        <div id="body03" class="visualWidth">
            <div id="body02Invi"></div>
            <div id="body02Wrap">
                <div id="photocard">
                    <img src="./images/photocard1.png" alt="포토카드1"/>
                    <img src="./images/photocard2.png" alt="포토카드2"/>
                    <img src="./images/photocard3.png" alt="포토카드3"/>
                </div>
                <div id="body02Info">
                    <h3>박수투자 오리지널 티켓</h3>
                    <h4>메가박스가 제안하는 공연를 가장 잘 간직하는 방법</h4>
                    <button onfocus="this.blur()">
                        <a href="#">
                            <span>자세히 보기</span>
                        </a>
                    </button>
                    <button onfocus="this.blur()">
                        <a href="#">
                            <img src="./images/claplogo_orange.svg" alt="박수투자 모바일 어플">
                            <span>모바일 어플 다운받기</span>
                        </a>
                    </button>
                </div>
            </div>
        </div>
  
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
            

        <div id="body05" class="visualWidth">
            <h2>EVENT</h2>
            <div class="carouselTicker">
                <div class="carouselTicker__wrap" style="position: relative; overflow: hidden; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none;"><ul style="width: 4000px; left: -1282px; position: relative;">
                    <li><a href="#"><img src="./images/event1.jpg" alt="event"></a></li>
                    <li><a href="#"><img src="./images/event2.jpg" alt="event"></a></li>
                    <li><a href="#"><img src="./images/event3.jpg" alt="event"></a></li>
                    <li><a href="#"><img src="./images/event1.jpg" alt="event"></a></li>
                    <li><a href="#"><img src="./images/event2.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event1.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event2.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event3.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event1.jpg" alt="event"></a></li>
                    <li class="carouselTicker__clone"><a href="#"><img src="./images/event2.jpg" alt="event"></a></li
                        ></ul></div>	
            </div>
        </div>
        <footer>
            <div id="footerTop">
                <ul class="visualWidth">
                    <li><a href="#">회사소개</a></li>
                    <li><a href="#">IR</a></li>
                    <li><a href="#">채용정보</a></li>
                    <li><a href="#">광고/프로모션문의</a></li>
                    <li><a href="#">출점문의</a></li>
                    <li><a href="#">이용약관</a></li>
                    <li><a href="#">편성기준</a></li>
                    <li><a href="./개인정보처리방침/person.html">개인정보처리방침</a></li>
                    <li><a href="#">법적고지</a></li>
                    <li><a href="#">이메일주소무단수집</a></li>
                    <li><a href="#">상생경영</a></li>
                    <li><a href="#">사이트</a></li>
                </ul>
            </div>
            <div id="footerBottom" class="visualWidth">
                <h1><img src="./images/claplogo_orange.svg" alt="박수투자"></h1>
                <div id="address">
                    <address>서울특별시 성동구 왕십리로 50, 6층 (성수동1가, 메가박스 스퀘어)</address>
                    <ol>
                        <li>대표이사 : 홍정인</li>
                        <li>개인정보보호 책임자 : 정종민</li>
                        <li>사업자등록번호 : 211-86-59478</li>
                        <li>통신판매업신고번호 : 2017-서울용산-0662</li>
                        <li>통신판매업신고번호 : 2023-서울성동-0177</li>
                        <li>박수투자고객센터 : 1544-0070</li>
                    </ol>
                </div>
                <div id="familySite">
                    <select>
                        <option selected="">제작팀 바로가기</option>
                        <option value="#">kopis</option>
                        <option value="#">istp</option>
                    </select>
                    <address>© 박수투자, team_istp. All Rights Reserved</address>
                </div>
                
            </div>
        </footer>
        <div id="reservePopupbg">
            <div id="reservePopup">
                <div id="closeBtn">
                    <button>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div id="languageWrap">
                    <button>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                            <path class="rereserve" d="M25,5c-3.7,0-7.3,0.9-10.5,2.7L9.8,1L3.2,21L24,21.2l-4.9-6.9C21,13.4,23,13,25,13c7.7,0,14,6.3,14,14s-6.3,14-14,14s-14-6.3-14-14H3c0,12.1,9.9,22,22,22s22-9.9,22-22S37.1,5,25,5z"></path>
                        </svg>
    
                        펀딩 다시하기
                    </button>
                    <div id="language">
                        <div id="languagebg"></div>
                        <span style="color: rgb(255, 255, 255);">KOR</span>
                        <span>ENG</span>
                    </div>
                </div>
                <div id="reservebd">
                    <div id="reserveBox">
                        <div id="reserve01" class="reserve">
                            <div class="reserveClass">극장</div>
                            <ol>
                                <li>전체</li>
                                <li>society</li>
                            </ol>
                            <ul class="region">
                                <li>서울</li>
                                <li>경기</li>
                                <li>인천</li>
                                <li>강원</li>
                                <li>대전/충청</li>
                                <li>대구</li>
                                <li>부산/울산</li>
                                <li>경상</li>
                                <li>광주/전라/제주</li>
                            </ul>
                            <ul class="regionDetail">
                                <li>강남</li>
                                <li>강변</li>
                                <li>건대입구</li>
                                <li>구로</li>
                                <li>대학로</li>
                                <li>동대문</li>
                                <li>등촌</li>
                                <li>목동</li>
                                <li>미아</li>
                                <li>불광</li>
                                <li>상봉</li>
                                <li>성신여대입구</li>
                                <li>송파</li>
                                <li>수유</li>
                                <li>신촌아트레온</li>
                                <li>씨네드쉐프 압구정</li>
                            </ul>
                        </div>
                        <div id="reserve02" class="reserve">
                            <div class="reserveClass">공연</div>
                            <ol>
                                <li>펀딩율</li>
                                <li>최신순</li>
                            </ol>
                            <table>
                                <tbody><tr>
                                    <td><span class="blue">12</span></td>
                                    <td>미션 임파서블</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>엘리맨탈</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>스파이더맨</td>
                                </tr>
                                <tr>
                                    <td><span class="orange">15</span></td>
                                    <td>악마들</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>도라에몽</td>
                                </tr>
                                <tr>
                                    <td><span class="orange">15</span></td>
                                    <td>범죄도시3</td>
                                </tr>
                                <tr>
                                    <td><span class="orange">15</span></td>
                                    <td>플래시</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>코난</td>
                                </tr>
                                <tr>
                                    <td><span class="red">19</span></td>
                                    <td>몸값</td>
                                </tr>
                                <tr>
                                    <td><span class="green">all</span></td>
                                    <td>TAK-SHOW</td>
                                </tr>
    
                            </tbody></table>
                        </div>
                        <div id="reserve03" class="reserve">
                            <div class="reserveClass">날짜</div>
                            <p>2023<span>07</span></p>
                            <ul>
                                <li>1 토</li>
                                <li>2 일</li>
                                <li>3 월</li>
                                <li>4 화</li>
                                <li>5 수</li>
                                <li>6 목</li>
                                <li>7 금</li>
                                <li>8 토</li>
                                <li>9 일</li>
                                <li>10 월</li>
                                <li>11 화</li>
                                <li>12 수</li>
                            </ul>
                        </div>
                        <div id="reserve07" class="reserve">
                            <div class="reserveClass">시간</div>
                            <p>극장, 공연, 날짜를 선택해주세요.</p>
                        </div>
                    </div>
                </div>
                <div id="reserveBottom">
                    <span>도움이 필요하신가요?</span>
                    <button>
                        좌석 선택
                    </button>
                </div>
            </div>
        </div>    
    </body></html>`)
        }
}