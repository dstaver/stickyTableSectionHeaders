/*!
 * Sticky Table Section Headers
 *
 * Copyright (c) 2011 Daniel Staver ( daniel@ixd.no / http://www.ixd.no )
 * Loosely based on Sticky Section Headers Copyright (c) 2010 Florian Plank (http://www.polarblau.com/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * USAGE:
 *
 * $('table').stickyTableSectionHeaders({
 *     rowSelector      : 'tr.sticky',
 *     headlineSelector : 'th'
 * });
 */

(function($){
    $.fn.stickyTableSectionHeaders = function(options) {
        var settings = $.extend({
            rowSelector: 'tr.sticky',
            headlineSelector: 'th'
        }, options);

        return $(this).each( function() {
            var table = $(this);

            // Each TH needs hardcoded widths in px, otherwise the sticky header will shrink
            // once the TR element gets position: fixed
            table.find( settings.rowSelector + ' ' + settings.headlineSelector ).each(function(){
                $(this).css({
                    width: $(this).width() + 'px' // Hardcode calculated width
                });
            });

            $(window).scroll( function(e) {
                table.find( settings.rowSelector ).each(function(index) {
                    var tr       = $(this),
                        trTop    = tr.position().top - $(window).scrollTop(),
                        trHeight = tr.outerHeight(),
                        sticky   = $('table#sticky'),
                        found    = sticky.length;

                    // Create the sticky header element once, if it was not already found
                    if( !found ) {
                        console.log('CReate stiCky!');
                        sticky = $('<table id="sticky" />').append($('<tbody />')).append(tr.clone());
                        sticky.hide();
                        sticky.css({
                            position: 'fixed',
                            top: 0,
                            zIndex: 10000
                        });
                        $('body').append(sticky);
                    }

                    if( trTop < 0 ) {
                        sticky.css({
                            top: 0
                        });
                        sticky.show();
                    }
                    else if( index > 0 && trTop >= 0 && trTop <= trHeight ) {
                        sticky.css({
                            top: '-' + ( trHeight - trTop ) + 'px'
                        });
                        sticky.show();
                    }
                    else if( index === 0 ) {
                        sticky.hide();
                    }
                });
            });
        });
    };
})(jQuery);
