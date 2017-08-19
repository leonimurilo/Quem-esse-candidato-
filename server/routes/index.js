(function () {
    "use strict";

    const ai = require('./partials/ai.js');

    module.exports = function (app, watsonConversation) {
        ai(app, watsonConversation);

        app.get("/*", function (req, res) {
            res.status(200).sendFile('index.html', { root: './client/public'});
        });

    };
}());