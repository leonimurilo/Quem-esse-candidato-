(function () {

    // const axios = require("axios");
    // const _ = require("lodash");

    module.exports = function(){
        return {
            handleResponse(rawResponse, res){


                return res.status(200).send(
                    "Placeholder"
                );

            }
        }
    }
}());