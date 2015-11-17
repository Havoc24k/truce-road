/**
 * API
 */

app.api = (function () {

    /**
     * [rpc description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function rpc(data) {
        var deferred = $.Deferred();

        data.parameters.authToken = app.cookies.getItem('authToken');

        $.ajax({
            url: app.config.rpcProxy,
            type: "POST",
            data: data,
            success: function (response) {
                try{
                    response = JSON.parse(response);
                    deferred.resolve(response);
                } catch(e) {
                    window.console.log(e);
                }
            },
            error: function (response) {
                window.console.log(response);
            }
        });

        return deferred.promise();
    }

    return {

        /**
         * [userLogin description]
         * @param  {[type]} username [description]
         * @param  {[type]} password [description]
         * @return {[type]}          [description]
         */
        userLogin: function (username, password) {
            var data = {
                'method': 'userLogin',
                'parameters': {
                    'username': username,
                    'password': password
                }
            };

            return rpc(data).pipe(function (res) {
                app.cookies.setItem('authToken', res.result.authToken);
                return res;
            });
        }
    };
})();
