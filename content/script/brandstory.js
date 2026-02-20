$(document).ready(function () {

    // [공유 변수] 휠 상태와 슬라이드 제어를 위해 상단에 유지
    var pageCount = 0;
    var stat = 0;
    var autocall;
    var moveNum = 0;

    // [1] 마우스 휠 이벤트 (모든 로직의 중심)
    $(document).on('mousewheel DOMMouseScroll', function (e) {

        // 이동 중이면 차단
        if (stat === 1) return false;
        stat = 1;

        var total = $('.page').length;
        var delta = 0;

        // 휠 데이터 확인 (사용자 조작인지 trigger인지 구분)
        if (e.originalEvent) {
            const evt = e.originalEvent;
            delta = evt.wheelDelta ? evt.wheelDelta : -evt.detail;
            if (/Firefox/i.test(navigator.userAgent)) delta = -evt.detail;
        }

        // 페이지 번호 계산 (사용자가 직접 굴렸을 때만 작동)
        if (delta < 0) {
            pageCount++;
            if (pageCount === total) pageCount = total - 1;
        } else if (delta > 0) {
            pageCount--;
            if (pageCount === -1) pageCount = 0;
        }

        // 이동 위치 구하기
        var pageTop = $('.page').eq(pageCount).offset().top;

        // 페이지 이동 애니메이션
        $('html, body').stop().animate({
            scrollTop: pageTop + 'px'
        }, 600, function () {

            stat = 0;

            if (pageCount === 0) {
                // 0번 페이지: 완전 투명
                $("header").css({
                    "backgroundColor": "rgba(255, 255, 255, 0)",
                    "transition": "0.5s"
                });
            }
            else {
                $("header").css({
                    "backgroundColor": "rgba(255, 255, 255, 0.4)",
                    "transition": "0.5s"
                });
            }

            // [Brand 3 또는 Brand 6 페이지 도착 시]
            if (pageCount === 2 || pageCount === 5) { // ||는 '또는(OR)' 이라는 뜻

                var target; // 타겟을 담을 빈 그릇

                if (pageCount === 2) {
                    target = "#brand3"; // 2번이면 3번 브랜드를
                } else {
                    target = "#brand6"; // 아니면(5번이면) 6번 브랜드를 그릇
                }

                // target(그릇)에 담긴 애들만 요리합니다.
                $(target + " .w-list").css({ "opacity": 0 });
                $(target + " .w-list dt, " + target + " .w-list dd").css({
                    "opacity": 0,
                    "marginTop": "20px"
                });

                $(target + " .w-list").stop().animate({ "opacity": 1 }, 800, function () {
                    $(target + " .b-tit").stop().animate({ "opacity": 1, "marginTop": "0px" }, 700);
                    $(target + " .b-sub").stop().delay(300).animate({ "opacity": 1, "marginTop": "0px" }, 700);
                    $(target + " .b-desc").stop().delay(600).animate({ "opacity": 1, "marginTop": "0px" }, 700);
                });


            }


            // [Brand 4, 5, 7 페이지 도착 시]
            if (pageCount === 3 || pageCount === 4 || pageCount === 6) {
                var targetId;
                if (pageCount === 3) targetId = "#brand4";
                else if (pageCount === 4) targetId = "#brand5";
                else targetId = "#brand7";

                // 1. 초기 상태 설정 (글자들만 숨기고 아래로 20px 내림)
                $(targetId + " .b-tit, " + targetId + " .b-sub, " + targetId + " .b-desc").css({
                    "opacity": 0,
                });

                $(targetId + " .b-tit").stop().animate({ "opacity": 1 }, 1000, function () {
                    $(targetId + " .b-sub").stop().animate({ "opacity": 1}, 700);
                    $(targetId + " .b-desc").stop().delay(800).animate({ "opacity": 1 }, 700);
                });
            }

            // --- 각 페이지 도착 시 애니메이션 ---

            // A. Brand 1 페이지 (0번)
            if (pageCount === 0) {
                // 1. 초기 상태 설정
                $(".logo-box").css({ "opacity": 0 });
                $(".first-title, .brand-des").css({ "opacity": 0, "marginTop": "30px" });


                $(".logo-box").stop().animate({ "opacity": 1 }, 1900);


                $(".first-title").stop().delay(1600).animate({
                    "opacity": 1,
                    "marginTop": "0px"
                }, 800);

                $(".brand-des").stop().delay(1700).animate({
                    "opacity": 1,
                    "marginTop": "0px"
                }, 900);
            }
            // B. Brand 2 페이지 (1번)
            if (pageCount === 1) {
                clearInterval(autocall);
                autocall = setInterval(flow, 20);
            } else {
                clearInterval(autocall);
            }



        });




    });

    // [2] 접속 시 0번 페이지 효과를 위해 강제 실행
    $(document).trigger('mousewheel');

    // [3] 무한 흘러가는 슬라이드 함수 (Brand 2용)
    function flow() {
        moveNum++;

        var slideWrap = $(".slide-wrap");
        var boxWidth = $(".slide-box").first().outerWidth(true);

        if (moveNum > boxWidth) {
            // 첫 번째 박스를 맨 뒤로 보내고 위치 초기화
            slideWrap.append($(".slide-box").first()).css('left', 0);
            moveNum = 0;
        } else {
            // 왼쪽으로 이동
            slideWrap.css({ left: -moveNum });
        }
    }

    // [4] 슬라이드 박스 마우스 호버 (캡션 및 정지)
    $(".slide-box").hover(function () {
        // [1] 마우스를 올렸을 때: 무조건 멈춤!
        clearInterval(autocall);

    }, function () {
        // [2] 마우스를 뗐을 때: Brand 2 페이지일 때만 다시 시작!
        if (pageCount === 1) {
            //  중복 방지를 위해 지우고 시작하는 게 안전
            clearInterval(autocall);
            autocall = setInterval(flow, 20);
        }
    });



});