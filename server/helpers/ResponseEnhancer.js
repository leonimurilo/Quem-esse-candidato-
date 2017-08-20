(function () {
    "use strict";
    // const axios = require("axios");
    // const _ = require("lodash");

    module.exports = function(){
        return {
            handleResponse(rawResponse, msg, res){
                let response;



                if(msg === "img"){
                    response = [
                        {
                            "attachment": {
                                "type": "image",
                                "payload": {
                                    "url": "https://pbs.twimg.com/profile_images/841704710381924353/lndULjRz.jpg"
                                }
                            }
                        }
                    ];
                } else if(msg === "gallery"){
                    response = [    {
                        "attachment":{
                            "type":"template",
                            "payload":{
                                "template_type":"generic",
                                "elements":[
                                    {
                                        "title":"Escândalo de corrupção do metrô",
                                        "image_url":"http://www.metro.sp.gov.br/images/home/foto-trem.jpg",
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
                    }];
                } else {

                    response = [{"text": rawResponse.response.output.text[0]}];

                }

                return res.status(200).send(
                    response
                );

            }
        }
    }
}());