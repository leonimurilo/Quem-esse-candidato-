(function () {
    "use strict";

    const ai = require('./partials/ai.js');

    module.exports = function (app, watsonConversation, deputados, noticias) {
        ai(app, watsonConversation, deputados, noticias);

        app.get("/*", function (req, res) {
            res.status(200).sendFile('index.html', { root: './client/public'});
        });

    };
}());