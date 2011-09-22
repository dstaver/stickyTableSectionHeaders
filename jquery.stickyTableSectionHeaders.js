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
 *     section.rowSelector      : 'tr.sticky',
 * });
 */
(function($){
    $.fn.stickyTableSectionHeaders = function(options) {
        var settings = $.extend({
            head: {
                sticky       : true, // Enable sticky header
                rowSelector  : 'thead tr', // Selector to find the header row withing the table element
                yOffset      : 0
            },
            section: {
                sticky       : true,
                rowSelector  : 'tr.sticky',
                yOffset      : -4
            }
        }, options);

        return $(this).each( function() {
            var table                     = $(this),
                tableBottom               = getBottomPosition(table), // Y position of table bottom relative to window
                stickyHeaderSource        = null, // Holds the table row currently used as a source for sticky header.
                stickySectionHeaderSource = null, // Holds the table row currently used as a source for sticky section header.
                sectionYOffset            = 0;

            fixWidths( table ); // Hardcode PX widths on all header cells

            if( settings.head.sticky ) {
                var stickyHeader   = createSticky( table, '<thead><tr></tr></thead>', 10100, 'stickyHeader' );
                stickyHeader.find('tr').replaceWith( table.find(settings.head.rowSelector).clone() );
                sectionYOffset = stickyHeader.outerHeight();
            }

            if( settings.section.sticky ) {
                var stickySectionHeader = createSticky( table, '<tbody><tr></tr></tbody>', 10000, 'stickySectionHeader' );
            }

            $(window).scroll( function(e) {
                // Recalculate Y position of table bottom relative to window
                tableBottom = getBottomPosition(table);

                if( settings.head.sticky ) {
                    table.find( settings.head.rowSelector ).each(function(index) {
                        var tr       = $(this),
                            trTop    = tr.offset().top - $(window).scrollTop(), // Y position of row relative to window
                            trHeight = tr.outerHeight(); // Total height of row including borders and padding

                        // Never show sticky if the header row is positioned inside the window or the whole table is positioned out of the window
                        if(( trTop >= 0 && index === 0 ) || tableBottom < 0 ) {
                            // console.log('hide');
                            stickyHeader.hide();
                        }

                        // The current header row is somewhere out of the window and the table is at least partially visible, enough to show a full header row
                        else if( trTop < 0 && tableBottom > trHeight ) {
                            // console.log('stick');
                            stickyHeader.css({
                                top: 0
                            });
                            stickyHeader.show();
                        }

                        // Table bottom pushes sticky header out of window
                        else if( tableBottom >= 0 && tableBottom <= trHeight ) {
                            // console.log('push');
                            stickyHeader.css({
                                top: tableBottom - trHeight + 'px'
                            });
                            stickyHeader.show();
                        }
                    });
                }

                if( settings.section.sticky ) {
                    table.find( settings.section.rowSelector ).each(function(index) {
                        var tr       = $(this),
                            trTop    = tr.offset().top - $(window).scrollTop(), // Y position of row relative to window
                            trHeight = tr.outerHeight(); // Total height of row including borders and padding

                        // Never show sticky if the first header row is positioned inside the window or the whole table is positioned out of the window
                        if(( trTop >= sectionYOffset && index === 0 ) || tableBottom < sectionYOffset ) {
                            // console.log('hide');
                            stickySectionHeader.hide();
                        }

                        // The current header row is somewhere out of the window and the table is at least partially visible, enough to show a full header row
                        else if( trTop < sectionYOffset && tableBottom > trHeight + sectionYOffset ) {
                            // console.log('stick');
                            stickySectionHeaderSource = tr;
                            stickySectionHeader.css({
                                top: settings.section.yOffset + sectionYOffset + 'px'
                            });
                            stickySectionHeader.show();
                        }

                        // A new header row is pushing the previous one out
                        else if( index > 0 && trTop >= 0 && trTop <= trHeight + sectionYOffset ) {
                            // console.log('push');
                            stickySectionHeader.css({
                                top: settings.section.yOffset + trTop - trHeight + 'px'
                            });
                            stickySectionHeader.show();
                        }

                        // Table bottom pushes sticky header out of window
                        else if( tableBottom >= sectionYOffset && tableBottom <= trHeight + sectionYOffset ) {
                            // console.log('bottom');
                            stickySectionHeader.css({
                                top: settings.section.yOffset + tableBottom - trHeight + 'px'
                            });
                            stickySectionHeader.show();
                        }
                    });

                    // Replace contents of sticky header with contents from the row currently used as a source for the header
                    if( stickySectionHeaderSource ) {
                        stickySectionHeader.find('tr').replaceWith( stickySectionHeaderSource.clone() );
                    }
                }
            });
        });

        // Get bottom position of element relative to window
        function getBottomPosition( el ){
            return el.offset().top + el.outerHeight() - $(window).scrollTop();
        }

        // Get unique ID for element
        var uid = 0;
        function getUID( prefix ){
            uid++;
            return prefix + uid;
        }

        // Create an empty sticky table based on a source table and append it to the DOM
        function createSticky( srcTable, trHTML, zIndex, tableClass ) {
            var sticky = $('<table id="' + getUID('sticky') + '" />').append($(trHTML)).hide().css({
                position: 'fixed',
                display: 'inline',
                top: 0,
                left: srcTable.offset().left + 'px',
                zIndex: zIndex,
                width: srcTable.width()
            });
            sticky.hide();
            sticky.attr( 'class', srcTable.attr('class') + ' ' + tableClass );
            $('body').append(sticky);
            return sticky;
        }

        // Each TH needs hardcoded widths in px, otherwise the sticky header will shrink
        // once the TR element gets position: fixed
        function fixWidths( table ) {
            table.find(
                settings.section.rowSelector + ' th, ' +
                settings.head.rowSelector    + ' th'
            ).each(function(){
                $(this).css({
                    width: $(this).width() + 'px' // Hardcode calculated width
                });
            });
        }
    };
})(jQuery);
