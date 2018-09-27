$(function() {
    var navToggleBtn = $('.nav-toggle-button');
    var overlay = $('.overlay');

    overlay.on('click', function() {
        navToggleBtn.trigger('click');
    });

    $('.accordion').on('click', function(e) {
        if ( !$(e.target).hasClass('accordion__content') &&
              $(e.target).parents('.accordion__content').length == 0 )
            $(this).toggleClass('collapsed');
    });

    $('.record__modify-data-value-remove').on('click', function(e) {
        var siblingInput = $(this).siblings('input');
        siblingInput.val('');
        siblingInput.trigger('focus');
    })
});