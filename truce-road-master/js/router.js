/*global app*/
/*global _*/

/**
 * Router
 */

"use strict";
app.router = (function () {

    /**
     * Registered routes holder
     * @type {Object}
     */
    var routes = {};

    return {

        /**
         * Execute rute method based on the url
         * @param  {String} url [description]
         */
        route: function (url) {
            var computedRoute;

            // extract URL parameters
            var urlParts = url.substring(2).split('/');

            for (var route in routes) {
                if (routes.hasOwnProperty(route)) {
                    var routeParts = route.substring(2).split('/');
                    if (routeParts[0] === urlParts[0] && routeParts.length === urlParts.length) {
                        if (routeParts[0] === urlParts[0] && routeParts[2] === urlParts[2] && routeParts.length === urlParts.length) {
                            computedRoute = route;
                            break;
                        } else {
                            computedRoute = route;
                            // break;
                        }
                    }
                }
            }

            // execute registered callback
            try {
                routes[computedRoute](urlParts);
                return false;
            } catch (e) {
                window.console.log(e);
                routes['/']();
                return false;
            }
        },

        /**
         * Register call back for provided routes
         * @param  {Array}   urls     [description]
         * @param  {Function} callback [description]
         */
        register: function (urls, callback) {
            for (var i = 0; i < urls.length; i = i + 1) {
                routes[urls[i]] = callback;
            }
            return false;
        }
    };

})();
