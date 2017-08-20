(function () {
    "use strict";
    // const axios = require("axios");
    // const _ = require("lodash");

    module.exports = function(){
        return {
            handleResponse(rawResponse, msg, res){
                let response = [];

                response.push({"text": rawResponse.response.output.text[0]});

                try{
                    console.log(rawResponse.response);
                    console.log(rawResponse.response.context.nomeCandidato);
                    console.log(rawResponse.response.context.dados);

                }catch(e) {

                }

                if(rawResponse.response.context.dados){
                    response.push(
                        {
                            "attachment": {
                                "type": "image",
                                "payload": {
                                    "url": "https://rd1.com.br/wp-content/uploads/2015/09/tiririca-1.jpg"
                                }
                            }
                        },
                        {
                            "attachment":{
                                "type":"template",
                                "payload":{
                                    "template_type":"generic",
                                    "elements":[
                                        {
                                            "title":"Escândalo de corrupção do metrô",
                                            "image_url":"https://rd1.com.br/wp-content/uploads/2015/09/tiririca-1.jpg",
                                            "subtitle":"Metrôs de São Paulo...",
                                            "buttons":[
                                                {
                                                    "type":"web_url",
                                                    "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
                                                    "title":"Ver mais"
                                                }
                                            ]
                                        },
                                        {
                                            "title":"Bla bla",
                                            "image_url":"https://pbs.twimg.com/profile_images/841704710381924353/lndULjRz.jpg",
                                            "subtitle":"Candssksdjds...",
                                            "buttons":[
                                                {
                                                    "type":"web_url",
                                                    "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
                                                    "title":"Ver mais"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        });
                }

                return res.status(200).send(
                    response
                );

            }
        }
    }
}());