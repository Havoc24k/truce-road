/**
 * APP config
 */

var app = window.app || {};
app.core = window.app.core || {};
app.models = window.app.models || {};
app.views = window.app.views || {};
app.api = window.app.api || {};
app.utils = window.app.utils || {};
app.registry = window.app.registry || {};
app.router = window.app.router || {};
app.cookies = window.app.cookies || {};
app.pageSlider = window.app.pageSlider || {};

/**
 * App configuration
 */
app.config = {
    debug: false,
    rpcProxy: 'rpc_proxy.php'
};

/**
 * [bindEvents description]
 * @return {[type]} [description]
 */
app.bindEvents = function() {
    document.addEventListener('deviceready', app.onDeviceReady, false);
};

/**
 * [onDeviceReady description]
 * @return {[type]} [description]
 */
app.onDeviceReady = function() {
    app.receivedEvent('deviceready');

    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 1000);
};

/**
 * [receivedEvent description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
app.receivedEvent = function(id) {
    var parentElement = document.getElementById(id);
    window.console.log('Received Event: ' + id);
};


/**
 * [initialize description]
 * @return {[type]} [description]
 */
app.initialize = function() {
    app.bindEvents();
};

