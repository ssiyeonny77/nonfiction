$(document).ready(function() {
    
       $('.slider .thumb').click(function() {
        var newSrc = $(this).attr('src');
        $('#main-img').attr('src', newSrc);
        
        // 썸네일 강조 표시(on) 관리
        $('.slider .thumb').removeClass('on');
        $(this).addClass('on');
    });


    // [기능 2] 하단 무한 Fade 슬라이드
    function fadeSlide() {
        var curr = $('.viewer .viewer-slide.active');
        var next = curr.next('.viewer-slide');

        if (next.length === 0) {
            next = $('.viewer .viewer-slide').first();
        }

        // 핵심 로직: 
        // 1. 다음 사진(next)을 현재 사진(curr) 바로 아래 레이어로 배치하고 일단 보이기(show)
        next.css({ 'z-index': 1, 'display': 'block' });

        // 2. 현재 사진(curr)을 1.5초 동안 서서히 투명하게 만들어서 사라지게 함
        // 그러면 아래에 대기하던 next가 자연스럽게 드러남
        curr.stop().animate({ 'opacity': 0 }, 1500, function() {
            // 3. 애니메이션이 끝난 후 정리
            curr.removeClass('active').css({ 'display': 'none', 'opacity': 1, 'z-index': 1 });
            next.addClass('active').css({ 'z-index': 2 });
        });
    }

    // 4초마다 실행
    var autoCall = setInterval(fadeSlide, 5000);

});