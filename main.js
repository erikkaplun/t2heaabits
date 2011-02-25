$(function() {

    function nextSlide() {
        alert('sa vajutasid next');
    }

    function prevSlide() {
        alert('sa vajutasid previous');
    }

    $('#button-next').click(nextSlide);
    $('#button-prev').click(prevSlide);
});
