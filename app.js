(function () {
    "use strict";

    require('dotenv').config();
    const conversationCredentials = {
        username: process.env.CONVERSATION_USERNAME,
        password: process.env.CONVERSATION_PASSWORD,
        version:process.env.CONVERSATION_VERSION,
        workspace_id: process.env.CONVERSATION_WORKSPACE
    };

    const express = require("express");
    const bodyParser = require("body-parser");
    const dotenv = require("dotenv");
    const app = express();
    const port = process.env.PORT || process.env.VCAP_APP_PORT || 6010;
    const path = require("path");
    const watsonConversation = require("./server/helpers/WatsonConversation")(conversationCredentials);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname + '/client/public')));

    require('./server/routes/index.js')(app, watsonConversation);

    app.listen(port, function () {
        console.log("Server is running on port " + port);
    });

}());