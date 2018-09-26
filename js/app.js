var stopPageLoad = 0;

$(function() {

    /* Р’С‹РєР»СЋС‡РµРЅРёРµ РЅРѕС‚РёС„РёРєР°С†РёРё */
    $('.alert-close').click(function(){
        var parent = $(this).parents('.alert');
        var notifyId = parent.data('notify-id');
        $.get("/app/user/hide-notification",{'id': notifyId});
        parent.fadeOut(300);
    });

    /* РђРґР°РїС‚РёРІ РґР»СЏ РіСЂР°С„РёРєРѕРІ */
    $(window).resize(function() {
        if($(window).innerWidth()<=768){
            $(".highcharts-container ").innerWidth($(window).innerWidth()-64)
        }
        else {
            charWidth=$(window).innerWidth()-$('.dashboard-content__account').innerWidth()-$('.dashboard-content__exchange').innerWidth()-124
            console.log(charWidth)
            $(".highcharts-container ").innerWidth(charWidth)
        }
    })

    $(document).on('click', '[data-nav-toggle]', function() {
        var $this = $(this),
            targetSelector = $this.data('target');

        if (!targetSelector) return;

        $(targetSelector).toggle();
    });

    /* РњРµРЅСЋ РґР»СЏ Р°РґРјРёРЅРєРё */
    $(document).on('click', '[data-nav-toggle-admin]', function() {
        var $this = $(this),
            targetSelector = $this.data('target');

        if (!targetSelector) return;

        if( $(targetSelector).hasClass("active") ){
            $(targetSelector).removeClass('active')
            $(targetSelector).css("height","66px")
        }else{
            $(targetSelector).addClass('active')
            $(targetSelector).css("height","auto")

        }
    });

    /* РЎРµСЂРІРёСЃРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё */
    $(document).on('click', '.sistem__settings tr td', function() {

        if(!$('body').hasClass("block")&&!$(this).hasClass('action-column')){
            $('body').addClass("block")

            s = "";
            s += "<input class='form-control' value='"+$(this).html()+"'>"
            s += "<div class='btn btn_size_small btn_sett btn_cancel btn_type_outline'>x</div>"
            s += "<div class='btn btn_size_small btn_sett btn_type_success'>&#10004;</div>"
            $(this).html(s)
        }

    });
    $(document).on('click', '.sistem__settings tr td .btn_sett', function() {

        _csrf = $("._csrf").val()

        td = $(this).parent("td")
        parent = $(this).parents("tr")
        key  = parent.data("key")
        value = $(this).siblings(".form-control").val()

        if($(this).hasClass("btn_cancel")) {
            td.html(value)
            $('body').removeClass("block")
            return false;
        }else{
            switch(td.index()) {
                case 0:
                    $.post( "/admin/settings/set-key",{
                        oldKey:key,
                        key: value,
                        _csrf:_csrf
                    }, function( data ) {
                        console.log(data)
                    });
                    parent.data("key",value)
                break

                case 1:
                    $.post( "/admin/settings/set-value",{
                        key:key,
                        value: value,
                        _csrf:_csrf
                    }, function( data ) {
                        console.log(data)
                    });
                break
            }
            td.html(value)
            $('body').removeClass("block")
            return false;
        }
        // 
    })

    $('[data-qrcode]').each(function() {
        var $this = $(this),
            typeNumber = 4,
            errorCorrectionLevel = 'L',
            cellSize = 10;

        var instance = qrcode(typeNumber, errorCorrectionLevel);
        instance.addData($this.data('qrcode'));
        instance.make();

        $this.html(instance.createImgTag(cellSize));
    });

    new Clipboard('.btn-copy');

    $.getJSON('https://stips20.io/get/all?type=1m&extracurrency=BTC&lastdateupdate=false', (res) => {
        // Initialize index value chart
        const indexValueChartElement = $('.index-value-chart:first')[0];
        if (undefined !== indexValueChartElement) {
            Highcharts.chart(indexValueChartElement, {
                colors: ['#b58a1b'],
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    gridLineWidth: 0
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, 'rgba(181, 138, 27, .5)'],
                                [1, 'rgba(181, 138, 27, .25)']
                            ]
                        },
                        marker: {
                            radius: 0
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                    type: 'area',
                    name: graphicValueName,
                    data: res.data.index
                }],
                credits: {
                    enabled: false
                }
            });
        }

        // Set index widget values
        $('.index-widget__item_name_value .index-widget__item-value').text(
            numeral(+res.data.indexTitle).format('0.00')
        );
        $('.index-widget__item_name_value .index-widget__item-label').text(
            `${res.data.indexPercent24h}% IN 24H`
        );
        $('.index-widget__item_name_total-market-cap .index-widget__item-value').text(
            numeral(+res.data.totalMarketCapTitle).format('$ 0.000a')
        );
        $('.index-widget__item_name_second-currency-market-cap .index-widget__item-value').text(
            numeral(+res.data.secondCurrencyMarketCapTitle).format('$ 0.000a')
        );

        // Hide loading
        $('.index-widget_loading').removeClass('index-widget_loading');
    });


    // Dropdowns
    $('.dropdown-menu__label').on('click', function (e) {
        e.stopPropagation();
        hideAllDropdownMenus();
        toggleDropdownMenu(e.target.parentElement);
    });

    $(document)
        .on('click', hideAllDropdownMenus)
        .on('keydown', function (e) {
            if (e.keyCode !== 27) return;
            hideAllDropdownMenus();
        });

    if($("div").is(".ajaxPager")){

        var page, maxPage, pageRoute, pageOpen;
        page = getThisPage();
        pageOpen = page.page;

        maxPage = getMaxPage();
        pageRoute = getPageRoute();

        $('.pagination').hide();
        $(document).scroll(function(){
            if(inWindow(".ajaxPager")){
                pageOpen = loadNextPage(pageOpen, page.perPage, maxPage, pageRoute);
            }
        });
    }

}());

function inWindow(elem) {
    var elemTop = $(elem).position().top;
    var screenHeight = $(window).height();
    var windowTop = $(document).scrollTop();
    var windowBottom = windowTop + screenHeight;

    if(elemTop <= windowBottom){
        return true;
    }

    return false;
}

function loadNextPage(page, perPage, maxPage, pageRoute) {

    if (stopPageLoad) {
        return page;
    }

    var next = parseInt(page) + 1;

    stopPageLoad = 1;

    if (next <= maxPage) {

        $(".pagination").before($("<div class='animateLoadingPage'><img src='/images/loading.gif'></div>"));

        $.get(pageRoute + '?page=' + next + '&per-page=' + perPage, function (html) {
            stopPageLoad = 0;
            $('.animateLoadingPage').remove();
            $(".pagination").before(html);
        });

        return next;
    }

    return page
}

function getThisPage(){
    var pg = location.href.split('page=');
    var ppg = location.href.split('per-page=');

    if(typeof pg[1] === "undefined"){
        return {
            page: 1,
            perPage: 5
        }
    }

    var pg2 = pg[1].split('&');
    var ppg2 = ppg[1].split('&');

    var page = pg2[0];
    var perPage = ppg2[0];

    return {
        page: page,
        perPage: perPage
    }
}

function getMaxPage(){
    var max = 1;
    $(".pagination li").map(function(){
        if(!$(this).hasClass('next')){
            max = $(this).find('a').data('page')+1;
        }
    });

    return max;
}

function getPageRoute(){
    return location.href.split('page=')[0];
}

function toggleDropdownMenu(element) {
    $(element).toggleClass('dropdown-menu_state_shown');
}

function hideAllDropdownMenus() {
    $('.dropdown-menu').removeClass('dropdown-menu_state_shown');
}