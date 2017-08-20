(function () {
    "use strict";
    const _ = require("lodash");
    const candidateFields = [
        {name: "Partido", icon: "💼", textListed: true},
        {name: "UF", icon: "🌎", textListed: true},
        {name: "Correio Eletrônico", icon: "📬", textListed: true},
        {name: "image", icon: "", textListed: false}
    ];

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
    } //👤💼

    class Text {
        constructor(text) {
            this.text = text
        }
    }

    function buildCandidateInfo(info) {
        let r = ["👤 Dados do deputado:"];
        candidateFields.forEach(function (field) {
            if(field.textListed)
                r.push(field.icon + " " + field.name + ": " + info[field.name]);
        });

        return r.join("\n");
    }

    module.exports = function(){
        return {
            handleResponse(rawResponse, msg, res, deputados, noticias){
                let response = [];
                let name = rawResponse.context.nomeCandidato;
                if(name)
                    name = name.toUpperCase();
                let data = rawResponse.context.dados;
                response.push(new Text(rawResponse.output.text[0]));

                if(name && data){
                    let query = {
                        selector: {
                            "Nome Parlamentar": name
                        },
                        fields: _.map(candidateFields.map(function (field) {
                            return field.name;
                        }))
                    };

                    deputados.find(query).then(function ({docs}) {
                        response.push(new Image(docs[0].image));

                        let text = buildCandidateInfo(docs[0]);
                        response.push(new Text(text));

                        noticias.find({
                            "selector": {
                                "candidatos": {
                                    "$elemMatch": {
                                        "nome":  name
                                    }
                                }
                            },
                            fields: [
                                "title",
                                "image_url",
                                "subtitle",
                                "buttons"
                            ],
                            "sort": [
                                {
                                    "_id": "asc"
                                }
                            ]
                        }).then(function ({docs}) {
                            response.push(new Text(" 📰 Notícias recentes: "));
                            let elements = [];
                            docs.forEach(function (doc) {
                                elements.push(doc);
                            });
                            let gallery = new Gallery(elements);
                            response.push(gallery);
                            return res.json(
                                response
                            );
                        });

                    }).catch(function (err) {
                        console.log(err);
                        return res.json(
                            response
                        );
                    });
                } else {
                    return res.json(response);
                }


            }
        }
    }
}());