// fragrance.js





$(document).ready(function () {
    // 1. 헤더 설정
    $('header').css({
        'position': 'static',
        'top': '0'
    }); 


    
    
    // 2. 슬라이드 제어를 위한 변수들
    var track = $('#box1 .slider-track');
    var nextBtn = $('#box1 .next');
    var prevBtn = $('#box1 .prev');
    var currentIndex = 0; 
    var slideCount = 3; 
    var moveStep = 100 / slideCount;

    // [추가] 처음 실행 시 버튼 상태 초기화 (첫 페이지니까 Prev 숨김)
    updateBtn();

    // NEXT 버튼 클릭
    nextBtn.click(function (e) {
        e.preventDefault();
        if (currentIndex < slideCount - 1) {
            currentIndex++;
            moveSlide(); // 이동 함수 호출
        }
    });

    // PREV 버튼 클릭
    prevBtn.click(function (e) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            moveSlide(); // 이동 함수 호출
        }
    });

    // [추가] 슬라이드 이동과 버튼 체크를 동시에 하는 함수
    function moveSlide() {
        track.css({
            'transform': `translateX(-${currentIndex * moveStep}%)`,
            'transition': '0.5s'
        });
        updateBtn(); // 이동할 때마다 버튼 상태 확인
    }

    // [추가] 버튼 상태 업데이트 함수
    function updateBtn() {
        // 첫 번째 페이지면 Prev 숨김, 아니면 보임
        if (currentIndex === 0) { prevBtn.hide(); } 
        else { prevBtn.show(); }

        // 마지막 페이지면 Next 숨김, 아니면 보임
        if (currentIndex === slideCount - 1) { nextBtn.hide(); } 
        else { nextBtn.show(); }
    }

    // 3. 탭메뉴 클릭 이벤트
    $('.tabmenu a').on('click', function (evt) {
        evt.preventDefault();
        var idx = $(this).parent().index();
        tabtab(idx);
        
        // [팁] 탭을 바꿀 때 슬라이드를 첫 번째(0)로 리셋하고 싶다면 추가
        currentIndex = 0;
        moveSlide();
    });


    
});

$(window).on('scroll', function() {
    var scTop = $(window).scrollTop();
    var winHeight = $(window).height();
    var gap = winHeight * 0.8; 

    $('.all-box > div:visible .frag-item').each(function() { 
        var itemPos = $(this).offset().top - gap;

        // 1. 스크롤 위치에 왔고 + 아직 사진이 안 나온 상태라면
        if (scTop > itemPos && $(this).find('.frag-imgbox').css('display') == 'none') {
            
            var targetImg = $(this).find('.frag-imgbox');
            var targetText = $(this).find('.frag-textbox');

            // 2. 다른 애니메이션이 이미 돌아가고 있는지 확인하지 않고
            // 그냥 순서대로 실행되게 하려면 'return false'를 써서 하나씩만 처리합니다.
            
            targetImg.fadeIn(500, function() {
                // 사진 다 나오면 0.2초 쉬고 글자 나옴
                targetText.delay(200).fadeIn(500);
            });

            // [핵심] 이 return false가 있어야 1번이 처리되는 동안 
            // 2번이 동시에 튀어나오는 걸 막아줍니다.
            return false; 
        }
    });
});



function tabtab(num) {
    $('.tabmenu li').eq(num).addClass('on').siblings().removeClass('on');
    
    // 탭 바뀔 때 모든 사진과 글자를 다시 숨김 (초기화)
    $('.frag-item .frag-imgbox').hide();
    $('.frag-item .frag-textbox').hide();

    $('.all-box > div').hide().eq(num).fadeIn(600, function() {
        // 내용이 나타난 후 다시 스크롤 체크해서 애니메이션 시작
        $(window).trigger('scroll');
    });
}

// 탭메뉴 함수
/* function tabtab(num) {
    $('.tabmenu li').eq(num).addClass('on').siblings().removeClass('on');
    $('.all-box > div').hide().eq(num).fadeIn(600);
}
 */




