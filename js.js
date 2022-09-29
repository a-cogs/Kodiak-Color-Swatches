const ready = (elem, callback) => {
    let loaded = setInterval(() => {
        if ( document.querySelectorAll(elem).length ) {
            clearInterval(loaded);
            callback();
        }
    }, 100);
}

ready('#SingleOptionSelector-0', () => {
    const $ = jQuery;

    // GATHER AVAILABLE COLORS
    const colors = [];
    $('#SingleOptionSelector-0 > option').each(function(e){
        if ( !$(this).html().toLowerCase().startsWith('pick') ) {
            colors.push( $(this).val() );
        }
    });

    // REVERT TO FIRST COLOR OPTION
    $('#SingleOptionSelector-0').val(colors[0]).change();

    // CREATE SWATCH LIBRARY
    // Title and base components
    $('#Quantity-product').before(`<div id=da-colors><div class=da-inner><p>Color: <span>${colors[0]}</span><div class=da-swatches></div></div></div>`);

    // Fill with swatches
    colors.forEach((color, i) => {
        let opt = $(`option[value="${color}"]`),
            img = ( color == 'Midnight Black' ) ? 'Black' : color.replace(/ /g, '+');

        if ( img.includes('*') ) {
            img = img.substring(0, img.indexOf('*') - 1);
        }
        
        if ( !opt.text().toLowerCase().includes('out') ) {
            $('.da-swatches').append(`
                <button data-color="${color}" aria-selected="${( i == 0 ) ? 'true' : 'false'}" class="${( i == 0 ) ? 'da-active' : ''}">
                    <img src="https://static.disruptive.co/kodiak-leather/color-selection/${img}.png" alt="${color}">
                </button>
            `);
        }
    });

    // SWATCH CLICK FUNCTION
    $('#da-colors button').click(function(e){
        e.preventDefault();
        let $that = $(this);

        if ( !$that.hasClass('da-active') ) {
            // Force the color change and adjust color text
            let selection = $that.data('color');
            $('#SingleOptionSelector-0').val(selection).change();
            $('#da-colors p span').html(selection);

            // Adjust button active settings
            $('.da-active').attr({
                'aria-selected': 'false',
                'class': ''
            });
            $that.attr({
                'aria-selected': 'true',
                'class': 'da-active'
            });
        }
    });

    // SHOW WARRANTY INFO
    var component = document.querySelector('#extend-offer');
    var variantId = Extend.URLSearchParams('variant');

    if (variantId) {
        component.style = '';
        Extend.setActiveProduct('#extend-offer', variantId);
        window.dispatchEvent(new Event('resize'));
    }
});