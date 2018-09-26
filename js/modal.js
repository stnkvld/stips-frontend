$(function() {
    var ESC_KEY_CODE = 27;

    $(document).on('click', '[data-modal]', function() {
        var $link = $(this),
            modalSelector = $link.data('modal'),
            $modal = $(modalSelector);

        if (!$modal.length) return;
        var $modalClone = $modal.clone();

        var $overlay = $('.modal-overlay');
        if (!$overlay.length) {
            $overlay = $('<div class="modal-overlay" />');
            $overlay.appendTo('body');
        }

        $overlay.addClass('modal-overlay_state_shown');
        $modalClone.addClass('modal_state_shown');

        $overlay.html($modalClone);
        $('body').addClass('no-scroll');
    }).on('click', '.modal-overlay', function(e) {
        if (e.target !== this) return;
        hideAllModals();
    }).on('keydown', function(e) {
        if (e.keyCode !== ESC_KEY_CODE) return;
        hideAllModals();
    });
}());

function hideAllModals() {
    $('.modal').removeClass('modal_state_shown');
    $('.modal-overlay').removeClass('modal-overlay_state_shown').html('');
    $('body').removeClass('no-scroll');
}