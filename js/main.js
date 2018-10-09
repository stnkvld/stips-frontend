$(function() {
    var sidebar = $('.sidebar');
    var navBtn = $('.nav-toggle-button');
    var overlay = $('.overlay');
    var btnAddCategory = $('[data-tab-id="characteristics"] .btn--add-category');

    navBtn.on('click', function() {
        overlay.show();
    });  

    overlay.on('click', function() {
        sidebar.removeClass('active');
        overlay.hide();
        $('.modal').hide();
    });

    $('.accordion:not(.in-trash)').on('click', function(e) {
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

    $('.accordion .btn--move-to-trash').on('click', function() {
        $(this).closest('.accordion').addClass('in-trash');
    });

    $('.ios7-switch input[type="checkbox"]').on('change', function() {
        var switchContainer = $(this).closest('.ios7-switch');
        switchContainer.siblings('.ios7-switch-wrapper__label-right').toggleClass('active');
        switchContainer.siblings('.ios7-switch-wrapper__label-left').toggleClass('active');
    });

    btnAddCategory.on('click', function() {
        $('.overlay').show();
        $('.modal--add-category').show();
    });

    $('.modal__close').on('click', function() {
        overlay.trigger('click');
    });
});