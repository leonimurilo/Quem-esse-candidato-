(function () {
    "use strict";

    const ResponseEnhancer = require("../../helpers/ResponseEnhancer")();

    module.exports = function (app, watsonConversation) {

        app.get("/api/test", function (req, res) {
            res.status(200).send("Test working");
        });

        app.post("/askWatson", function (req, res) {
            let msg = req.body.message;
            let context = req.body.context || {};

            console.log("Message:", msg);
            console.log("First name:",req.body["first name"]);

            if(!msg)
                return res.status(422).send({status:422, error: "message argument is missing."});

            // must return response.output.text and response.context
            watsonConversation.sendMessage({
                text:msg,
                context
            }).then(function (data) {

                ResponseEnhancer.handleResponse(data, msg, res);
            }).catch(function (err) {
                console.log("ERROR: ",err);
            });

        });

    };

}());