/* woody_perfume_santalcream.js */
$(document).ready(function() {
    
    // [기능 1] 썸네일(.thumb) 클릭 시 메인 이미지(#main-img) 변경
    $('.slider .thumb').click(function() {
        var newSrc = $(this).attr('src');
        $('#main-img').attr('src', newSrc);
        
        // 썸네일 강조 표시(on) 관리
        $('.slider .thumb').removeClass('on');
        $(this).addClass('on');
    });

    // [기능 2] 사이즈 버튼(30ml, 50ml, 100ml) 클릭 시 이미지 세트 교체
    $('.size-numb span').click(function() {
        var size = $(this).text().trim(); // 클릭한 버튼의 텍스트 가져오기
        
        // 사이즈 버튼 디자인 강조(on)
        $('.size-numb span').removeClass('on');
        $(this).addClass('on');

        // 각 사이즈에 들어갈 이미지 3개씩을 배열로 준비 (파일명 확인 필수!)
        var imgList = [];
        
        if (size === '30ml') {
            imgList = [
                'img/woody-perfume/santalperfume30ml.jpeg', 
                'img/woody-perfume/santalcreamperfume30mlcover.jpg', 
                'img/woody-perfume/woodytree.jpg'
            ];
        } else if (size === '50ml') {
            imgList = [
                'img/woody-perfume/santalperfume50ml.jpg', 
                'img/woody-perfume/santalperfume50mlcover.jpg', 
                'img/woody-perfume/woodytree.jpg'
            ];
        } else if (size === '100ml') {
            imgList = [
                'img/woody-perfume/santalperfume100ml.jpeg', 
                'img/woody-perfume/santalperfume100mlcover.jpg', 
                'img/woody-perfume/woodytree.jpg'
            ];
        }

        // 배열에 담긴 주소를 순서대로 썸네일(slider .thumb)에 뿌려주기
        $('.slider .thumb').each(function(index) {
            $(this).attr('src', imgList[index]);
        });

        // 사이즈가 바뀔 때 메인 이미지도 해당 사이즈의 첫 번째 사진으로 자동 변경
        // 위에서 만든 [기능 1]을 강제로 실행시키는 것과 같습니다.
        $('.slider .thumb').eq(0).trigger('click');
    });
});

