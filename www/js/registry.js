/*global app */
/*global $ */
/*global _ */

"use strict";
app.registry = (function () {
    var selectedIndex = 0;
    return {

        setSelectedIndex: function(index) {
            if(index > app.utils.getDetails().length-1){
                selectedIndex = null;
            }
            else{
                selectedIndex = index;
            }
        },
        getSelectedIndex: function() {
            return selectedIndex;
        }
    };
})();
