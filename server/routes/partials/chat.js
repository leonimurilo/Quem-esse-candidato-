(function () {
    "use strict";

    const util = require("util");

    module.exports = function (app, watsonConversation) {

        app.get("/api/test", function (req, res) {
            res.status(200).send("Test working");
        });

        app.post("/api/message", function (req, res) {
            let msg = req.body.message;
            let context = req.body.context || {};
            if(!msg)
                return res.status(422).send({status:422, error: "message argument is missing."});


            // must return response.output.text and response.context
            watsonConversation.sendMessage({
                text:msg,
                context
            }).then(function (data) {
                // console.log(util.inspect(data.response, {showHidden: false, depth: null}));
                // console.log("\n===================================================\n");
                res.status(200).send("HELLO");
            }).catch(function (err) {
                console.log("ERROR: ",err);
            });

        });

    };

}());