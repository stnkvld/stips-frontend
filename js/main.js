$(function() {
    var navToggleBtn = $('.nav-toggle-button');
    var overlay = $('.overlay');

    overlay.on('click', function() {
        navToggleBtn.trigger('click');
    });
});