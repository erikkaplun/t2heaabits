$(function() {

    var activeSlide = $('#slide-1');
    var passiveSlide = $('#slide-2');

    /* tee aktiivne slaid nähtavaks */
    activeSlide.css("left", 0);


    function nextSlide() {
        alert('sa vajutasid next');
    }

    function prevSlide() {
        alert('sa vajutasid previous');
    }

    $('#button-next').click(nextSlide);
    $('#button-prev').click(prevSlide);
});
