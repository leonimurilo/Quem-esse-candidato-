(function () {
    "use strict";

    const util = require("util");

    module.exports = function (app, watsonConversation) {

        app.get("/api/test", function (req, res) {
            res.status(200).send("Test working");
        });

        app.post("/askWatson", function (req, res) {
            let msg = req.query.message;
            let context = req.body.context || {};
            console.log("Message:", msg);
            if(!msg)
                return res.status(422).send({status:422, error: "message argument is missing."});

            // must return response.output.text and response.context
            watsonConversation.sendMessage({
                text:msg,
                context
            }).then(function (data) {
                // console.log(util.inspect(data.response, {showHidden: false, depth: null}));
                // console.log("\n===================================================\n");

                let response = [
                    {"text": msg}
                ];

                res.status(200).send(response);
            }).catch(function (err) {
                console.log("ERROR: ",err);
            });

        });

    };

}());