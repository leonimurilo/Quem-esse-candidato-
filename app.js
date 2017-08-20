(function () {
    "use strict";

    require('dotenv').config();
    const conversationCredentials = {
        username: process.env.CONVERSATION_USERNAME,
        password: process.env.CONVERSATION_PASSWORD,
        version:process.env.CONVERSATION_VERSION,
        workspace_id: process.env.CONVERSATION_WORKSPACE
    };
    const cloudantURL = process.env.CLOUDANT_URL;

    const express = require("express");
    const bodyParser = require("body-parser");
    const dotenv = require("dotenv");
    const app = express();
    const port = process.env.PORT || process.env.VCAP_APP_PORT || 6010;
    const path = require("path");
    const cloudant = require('cloudant')({
        url: cloudantURL,
        plugin: 'promises'
    });
    const watsonConversation = require("./server/helpers/WatsonConversation")(conversationCredentials);

    let deputados = cloudant.db.use("deputado");

    // deputados.list().then(function (data) {
    //     console.log(data);
    // });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname + '/client/public')));

    require('./server/routes/index.js')(app, watsonConversation, deputados);

    app.listen(port, function () {
        console.log("Server is running on port " + port);
    });

}());