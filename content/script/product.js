$(document).ready(function () {
    $('.theme-item').each(function () {
        var $container = $(this).find('.container');
        var $items = $container.find('li');
        var count = $items.length; // 현재 4개
        
        var currentIndex = 0; // 현재 인덱스
        var stat = 0;         // 광클 방지

        // 한 칸 이동 거리 계산 (창문 기준 30% + 5% = 35%)
        // 이 35%라는 수치는 창문 너비에 대한 비중입니다.
        
        function moveNext() {
            if (stat === 0 && currentIndex < count - 3) { // 3개는 보여야 하므로
                stat = 1;
                currentIndex++;
                // % 단위로 이동 (창문 기준 35%씩 왼쪽으로)
                $container.stop().animate({ left: -(currentIndex * 35) + '%' }, 600, function() {
                    stat = 0;
                });
            }
        }

        function movePrev() {
            if (stat === 0 && currentIndex > 0) {
                stat = 1;
                currentIndex--;
                $container.stop().animate({ left: -(currentIndex * 35) + '%' }, 600, function() {
                    stat = 0;
                });
            }
        }

        // 버튼 클릭 이벤트 (버튼 ID나 클래스에 맞게 조절하세요)
        $(this).find('.btn-next').click(function(e) {
            e.preventDefault();
            moveNext();
        });

        $(this).find('.btn-prev').click(function(e) {
            e.preventDefault();
            movePrev();
        });
    });
});