/*global app */
/*global $ */
/*global _ */
/*global PageSlider */
"use strict";

$(document).ready(function () {

    ////////////////
    // fix for IE //
    ////////////////
    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    /////////////////////////////////////////
    // Add quote function to RegExp object //
    /////////////////////////////////////////
    RegExp.quote = function (str) {
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    };

    /////////////////////////////
    // on hash change re-route //
    /////////////////////////////
    window.onhashchange = function () {
        app.router.route(location.hash);
    };

    /////////////////////////////////
    // extend underscore.js        //
    // with extra string functions //
    /////////////////////////////////
    _.mixin(_.string.exports());

    //////////////////////////////
    // Create PageSlider Object //
    //////////////////////////////
    app.pageSlider = new PageSlider($('.container'));

    /**
     * Register Routes
     */

    /////////
    // Map //
    /////////
    app.router.register(['/', '#', '#/'], function (urlParts) {
        app.views.mapView.show();
        // app.views.headerView.show();
    });

    /////////
    // Details //
    /////////
    app.router.register(['/details', '#details', '#/details', '#/detailsView'], function (urlParts) {
        app.views.detailsView.show();
        // app.views.headerView.show();
    });

    app.router.register(['/info', '#info', '#/info', '#/infoView'], function (urlParts) {
        app.views.headerView.show();
        // app.views.headerView.show();
    });

    ///////////////////
    // Execute route //
    ///////////////////
    app.router.route(location.hash);
});
