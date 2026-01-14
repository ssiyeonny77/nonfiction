$(document).ready(function() {
    var currentSlide = 0;
    var totalSlides = $('.slider-track .slide').length;
    var $sliderTrack = $('.slider-track');
    
    // 다음 슬라이드로 이동
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            moveSlide();
        }
    }
    
    // 이전 슬라이드로 이동
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            moveSlide();
        }
    }
    
    // 슬라이드 이동 함수
    function moveSlide() {
        var translateX = -(currentSlide * 100); // 각 슬라이드가 100%씩 이동
        $sliderTrack.css('transform', 'translateX(' + translateX + '%)');
    }
    
    // 버튼 클릭 이벤트 (버튼이 있다면)
    $('.slider-prev').on('click', prevSlide);
    $('.slider-next').on('click', nextSlide);
    
    // 초기화
    moveSlide();
});
