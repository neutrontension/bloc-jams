// #5 dom selector that gets .point elements no longer needed because of #7
 var animatePoints = function() {

   var revealPoint = function() {
       // #7
       $(this).css({
           opacity: 1,
           transform: 'scaleX(1) translateY(0)'
       });
    };
    // #6 
    $.each($('.point'), revealPoint);
};

$(window).load(function() {
    // #1 Object's height. Since we pass no arguments to the function, we get the height
    if ($(window).height() > 950) {
        animatePoints();
    }

    // #2 Searches for .selling-points and sets object height
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    // #3 Scroll is an event listener that takes a function as an argument
    $(window).scroll(function(event) {
        // #4 Animates points when scroll occurs
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
    });
});
