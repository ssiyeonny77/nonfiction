$(document).ready(function() {
    var currentIdx = 0; 
    var totalPages = $(".page").length; 
    var isMoving = false; 

    // 초기 실행
    playAnimation(0);

    // 구형 브라우저 호환 휠 이벤트
    $(window).on('mousewheel DOMMouseScroll', function(e) {
        if (isMoving) return; 

        var delta = 0;
        var E = e.originalEvent;

        // 크롬/익스플로러는 wheelDelta, 파이어폭스는 detail을 사용함
        if (E.wheelDelta) {
            delta = E.wheelDelta / 120; // 일반적인 환경
        } else if (E.detail) {
            delta = -E.detail / 3; // 파이어폭스 환경
        }

        // delta가 음수면 아래로, 양수면 위로 이동
        if (delta < 0) {
            if (currentIdx < totalPages - 1) {
                currentIdx++;
                movePage(currentIdx);
            }
        } else {
            if (currentIdx > 0) {
                currentIdx--;
                movePage(currentIdx);
            }
        }
    });

    function movePage(idx) {
        isMoving = true; 
        var targetTop = $(window).height() * idx;

        $("html, body").stop().animate({
            scrollTop: targetTop
        }, 800, function() {
            isMoving = false; 
            playAnimation(idx); 
        });
    }

    function playAnimation(idx) {
        $(".page").removeClass("active");
        var $currentPage = $(".page").eq(idx);
        $currentPage.addClass("active");

        var $header = $("header"); 

    if (idx >= 1) {
        // 2번째 페이지부터 적용할 스타일
        $header.css({
            "background-color": "rgba(255, 255, 255, 0.5)", // 흰색 70% 투명도
         
            "transition": "all 0.5s"                       // 변할 때 부드럽게
        });
    } else {
        // 1번째 페이지(메인)로 돌아오면 다시 원래대로 (보통 투명)
        $header.css({
            "background-color": "transparent",
            "backdrop-filter": "none"
        });
    }

        if ($currentPage.attr("id") === "brand1") {
            // 로고 애니메이션 (백틱 적용)
            $(".brand-logo").css({ "opacity": 0 });
            $(".brand-logo").stop().animate({ "opacity": 1 }, {
                duration: 1500
            });

            // 설명글 애니메이션 (백틱 적용)
            $(".brand-des, .first-title").css({ "opacity": 0, "transform": "translateY(20px)" });
            $(".brand-des, .first-title").each(function(index) {
                $(this).stop().delay(900 + (index * 300)).animate({ "opacity": 1 }, {
                    duration: 600,
                    step: function(now) {
                        var y = 20 - (20 * now); 
                        $(this).css("transform", `translateY(${y}px)`);
                    }
                });
            });
        }
    }
});

/* brand 2 jquery */

$(document).ready(function() {
    var $wrap = $(".slide-wrap");
    var $boxes = $(".slide-box");
    
    // 무한 루프를 위해 복제
    $wrap.append($boxes.clone());

    function startFlow() {
        // 1. 현재 위치값 가져오기 (리셋 상황 대비)
        var currentLeft = parseFloat($wrap.css("left"));
        var oneSetWidth = $boxes.length * $boxes.outerWidth(true);

        // 2. 남은 거리 계산 (끝까지 가기 위해 남은 너비)
        var remainingDistance = oneSetWidth + currentLeft;
        
        // 3. 남은 거리에 비례한 시간 계산 (속도를 일정하게 유지하기 위함)
        // 전체 30초 중 남은 비율만큼만 시간 할당
        var duration = (remainingDistance / oneSetWidth) * 30000;

        // stop(true, true)로 큐를 비우고 애니메이션 실행
        $wrap.stop(true, true).animate({
            "left": `-${oneSetWidth}px`
        }, duration, "linear", function() {
            $(this).css("left", "0");
            startFlow();
        });
    }

    // 초기 실행
    startFlow();

    // 마우스 이벤트 제어
    $wrap.on("mouseenter", function() {
        $(this).stop(true, false); // 위치는 그대로 두고 애니메이션만 정지
    });

    $wrap.on("mouseleave", function() {
        startFlow(); // 멈춘 시점부터 다시 계산해서 시작
    });
});