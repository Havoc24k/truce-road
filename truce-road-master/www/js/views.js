/*global app */
/*global _ */

/**
 * Views parent class
 */

"use strict";
app.views = (function () {
    return {

        /**
         * Destroy all views
         */
        hideAll: function () {
            _.each(this, function (view) {
                if (typeof view.hide === 'function') {
                    view.hide();
                }
            });
        }
    };
})();
