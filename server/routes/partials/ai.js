(function () {
    "use strict";

    const ResponseEnhancer = require("../../helpers/ResponseEnhancer")();

    module.exports = function (app, watsonConversation) {

        app.get("/api/test", function (req, res) {
            res.status(200).send("Test working");
        });

        app.post("/askWatson", function (req, res) {
            let msg = req.body.message;
            let firstName = req.body["first name"];
            let context = req.body.context || {firstName};

            console.log("Message:", msg);
            console.log("First name:", firstName);

            if(!msg)
                return res.status(422).send({status:422, error: "message argument is missing."});

            watsonConversation.sendMessage({
                text:msg,
                context
            }).then(function (data) {
                ResponseEnhancer.handleResponse(data, req, res);
            }).catch(function (err) {
                console.log("ERROR: ",err);
            });

        });

    };

}());