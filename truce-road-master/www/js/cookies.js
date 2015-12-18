/*global app */
/*global $ */
/* jshint bitwise: false*/

"use strict";

app.cookies = (function () {
    return {

        /**
         * [getItem description]
         * @param  {[type]} sKey [description]
         * @return {[type]}      [description]
         */
        getItem: function (sKey) {
            if (!sKey || !this.hasItem(sKey)) {
                return null;
            }
            return window.unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },

        /**
         * [setItem description]
         * @param {[type]} sKey    [description]
         * @param {[type]} sValue  [description]
         * @param {[type]} vEnd    [description]
         * @param {[type]} sPath   [description]
         * @param {[type]} sDomain [description]
         * @param {[type]} bSecure [description]
         */
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return;
            }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toGMTString();
                    break;
                }
            }
            document.cookie = window.escape(sKey) + "=" + window.escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        },

        /**
         * [removeItem description]
         * @param  {[type]} sKey  [description]
         * @param  {[type]} sPath [description]
         * @return {[type]}       [description]
         */
        removeItem: function (sKey, sPath) {
            if (!sKey || !this.hasItem(sKey)) {
                return;
            }
            document.cookie = window.escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
        },

        /**
         * [hasItem description]
         * @param  {[type]}  sKey [description]
         * @return {Boolean}      [description]
         */
        hasItem: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },

        /**
         * [keys description]
         * @return {[type]} [description]
         */
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx += 1) {
                aKeys[nIdx] = window.unescape(aKeys[nIdx]);
            }
            return aKeys;
        }
    };
})();
