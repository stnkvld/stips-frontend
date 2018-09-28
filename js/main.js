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
    });

    $('[data-tab-id="' + $('.active[data-toggle="tab"]').data('target') + '"]').show();

    $('[data-toggle="tab"]').on('click', function() {
        var target = $(this).data('target');
        $('[data-toggle="tab"]').removeClass('active');
        $('[data-role="tab-content"]').hide();
        $('[data-tab-id="' + target + '"]').show();
        $(this).addClass('active');
    });

    $('.tag__remove').on('click', function(e) {
        e.stopPropagation();
        $(this).closest('.tag').detach();
    });
});