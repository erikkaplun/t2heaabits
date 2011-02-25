$(function() {

    var SLIDE_WIDTH = 400;

    var activeSlide = $('#slide-1');
    var passiveSlide = $('#slide-2');

    // tee aktiivne slaid nähtavaks:
    activeSlide.css("left", 0);


    function moveRight() {
        // Jätame pasiivse slaidi varjatuks,
        // aga paneme ta kohe aknaraamist vasakule:
        passiveSlide.css("left", -SLIDE_WIDTH);

        // Liigutame aktiivse täispikkuse võrra paremale, nii et ta kaob lõpuks ära
        activeSlide.animate({"left": SLIDE_WIDTH});
        // Liigutame passiivse täispikkuse võrra paremale, nii et ta ilmub lõpuks
        // täpselt raami keskele nähtavaks.
        passiveSlide.animate({"left": 0});

        swapActiveAndPassive();
    }

    function swapActiveAndPassive() {
        // Vahetame aktiivse ja passiivse slaidi omavahel:
        var tmp = passiveSlide;
        passiveSlide = activeSlide;
        activeSlide = tmp;
    }

    function nextSlide() {
        moveRight();
    }

    function prevSlide() {
        alert('sa vajutasid previous');
    }

    $('#button-next').click(nextSlide);
    $('#button-prev').click(prevSlide);
});
