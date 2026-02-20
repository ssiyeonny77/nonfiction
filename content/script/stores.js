//stores.js

$(document).ready(function() {
    // 탭 메뉴의 리스트 아이템(li) 안의 링크(a)를 클릭했을 때
    $('.tabmenu ul li a').click(function(e) {
        e.preventDefault(); // 클릭 시 페이지 상단으로 튕기는 현상 방지

        // 1. 클릭한 항목의 부모(li)에만 'on' 클래스 부여
        $(this).parent('li').addClass('on').siblings().removeClass('on');

        // 2. 클릭한 a태그의 href 값(예: #store1)을 가져와서 변수에 저장
        var targetContent = $(this).attr('href');

        // 3. 모든 컨텐츠 박스를 숨기고, 선택된 ID를 가진 박스만 보여줌
        // fadeIn을 사용하면 논픽션 브랜드에 어울리는 부드러운 전환 효과가 납니다.
        $('.content-box > div').removeClass('active').hide();
        $(targetContent).addClass('active').fadeIn(500);
    });
});