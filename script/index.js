$(window).on('scroll', function () {
    var scTop = $(window).scrollTop();
    var mainHeight = $('main').outerHeight();

    // 1. 배경색 설정 (내려왔을 때: 핑크베이지 / 올라갔을 때: 같은 색의 투명)
    var bgVisible = "rgba(253, 248, 247, 0.9)";
    var bgInvisible = "rgba(253, 248, 247, 0)";

    // 2. 보더색 설정 (올라갔을 때: 화이트보더 / 내려갔을 때: 같은 색의 투명)
    var borderVisible = "1px solid rgba(255, 255, 255, 0.8)";
    var borderInvisible = "1px solid rgba(255, 255, 255, 0)";

    /* if (scrollTop > mainHeight - 100) {
        // [내려갔을 때] 배경색은 나타나고, 보더는 투명해짐
        $('header').css({
            'background-color': bgVisible,
            'border-bottom': borderInvisible
        });
    } else {
        // [올라왔을 때] 배경색은 투명해지고, 보더는 나타남
        $('header').css({
            'background-color': bgInvisible,
            'border-bottom': borderVisible
        });
    } */

    if (scTop > mainHeight - 100) {
        $('header').addClass('on');
    } else {
        $('header').removeClass('on');
    }
});

