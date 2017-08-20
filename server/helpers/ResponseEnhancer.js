(function () {
    "use strict";
    // const _ = require("lodash");

    // console.log(new Image("https://rd1.com.br/wp-content/uploads/2015/09/tiririca-1.jpg").attachment.payload);
    class Image {
        constructor(url) {
            this.attachment = {
                "type": "image",
                "payload": {
                    "url": url
                }
            }
        }
    }

    class Gallery {
        constructor(elements) {
            this.attachment = {
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "elements": elements
                }
            }

        }
    }

    class Text {
        constructor(text) {
            this.text = text
        }
    }

    module.exports = function(){
        return {
            handleResponse(rawResponse, msg, res, deputados){
                let response = [];
                let name = rawResponse.context.nomeCandidato;
                let data = rawResponse.context.dados;
                response.push(new Text(rawResponse.output.text[0]));

                if(name && data){
                    let query = {
                        selector: {
                            "Nome Parlamentar": name.toUpperCase()
                        },
                        fields: [
                            "Partido",
                            "UF",
                            "Correio Eletrônico"
                        ]
                    };

                    deputados.find(query).then(function ({docs}) {

                        let text = "Dados do deputado:\n\n"+ docs[0]["Partido"] + "\n" + docs[0]["UF"] + "\n" + docs[0]["Correio Eletrônico"];

                        response.push(new Text(text));

                        return res.json(
                            response
                        );

                    }).catch(function (err) {
                        console.log(err);
                    });
                } else {
                    return res.json(response);
                }


            }
        }
    }
}());