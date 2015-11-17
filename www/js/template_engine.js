/*global app */
/*global $ */
/*global _ */

"use strict";
app.templateEngine = (function () {

    /**
     * [_createHTML description]
     * @param  {[type]} tpl [description]
     * @return {[type]}     [description]
     */
    function _createHTML(tpl) {
        _.templateSettings.variable = "rc";
        var templateSkel = $('script.' + tpl.name).html();
        var template = _.template(templateSkel);
        var finalHtml = null;
        //don't forget to add again the template in the DOM
        if (tpl.options.addTemplate) {
            templateSkel = '<script type="text/template" class="' + tpl.name + '">' + templateSkel + '</script>';
            finalHtml = template(tpl.data) + templateSkel;
        } else {
            finalHtml = template(tpl.data);
        }

        return finalHtml;
    }

    return {

        /**
         * [createHTML description]
         * @type {[type]}
         */
        createHTML: _createHTML,

        /**
         * [renderTemplates description]
         * @param  {[type]} templateObjects [description]
         * @return {[type]}                  [description]
         */
        renderTemplates: function (templateObjects) {
            _.each(templateObjects, function (tpl) {
                var finalHtml = _createHTML(tpl);
                tpl.container.html(finalHtml);
            });
        }
    };
})();
