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

            var tableBottom = 0;

            // Holds the table row currently used as a source for sticky header.
            var currentStickyTr = null;

            // Each TH needs hardcoded widths in px, otherwise the sticky header will shrink
            // once the TR element gets position: fixed
            table.find( settings.rowSelector + ' ' + settings.headlineSelector ).each(function(){
                $(this).css({
                    width: $(this).width() + 'px' // Hardcode calculated width
                });
            });

            // Sticky table, a clone of the header row wrapped in a table
            var sticky = $('<table id="sticky" />').append($('<tbody /><tr />')).hide().css({
                position: 'fixed',
                top: 0,
                zIndex: 10000
            });
            $('body').append(sticky);

            $(window).scroll( function(e) {
                // Y position of table bottom relative to window
                tableBottom = table.position().top + table.outerHeight() - $(window).scrollTop();

                // Loop through each table header row
                table.find( settings.rowSelector ).each(function(index) {
                    var tr = $(this);

                    // Y position of row relative to window
                    var trTop = tr.position().top - $(window).scrollTop();

                    // Total height of row including borders and padding
                    var trHeight = tr.outerHeight();

                    // Never show sticky if the first header row is positioned inside the window
                    // or the whole table is positioned out of the window
                    if(( trTop >= 0 && index === 0 ) || tableBottom < 0 ) {
                        sticky.hide();
                    }

                    // The current header row is somewhere out of the window
                    // and the table is at least partially visible, enough to show a full header row
                    else if( trTop < 0 && tableBottom > trHeight ) {
                        currentStickyTr = tr;
                        sticky.css({
                            top: 0
                        });
                        sticky.show();
                    }

                    // A new header row is pushing the previous one out
                    else if( index > 0 && trTop >= 0 && trTop <= trHeight ) {
                        sticky.css({
                            top: '-' + ( trHeight - trTop ) + 'px'
                        });
                        sticky.show();
                    }

                    // Table bottom pushes sticky header out of window
                    else if( tableBottom >= 0 && tableBottom <= trHeight ) {
                        sticky.css({
                            top: tableBottom - trHeight + 'px'
                        });
                        sticky.show();
                    }
                });

                if( currentStickyTr ) {
                    sticky.find('tr').replaceWith( currentStickyTr.clone() );
                }
            });
        });
    };
})(jQuery);
