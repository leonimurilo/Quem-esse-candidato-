(function () {
    "use strict";
    const _ = require("lodash");
    const candidateFields = [
        {name: "Partido", icon: "💼", textListed: true},
        {name: "UF", icon: "🌎", textListed: true},
        {name: "Correio Eletrônico", icon: "📬", textListed: true},
        {name: "image", icon: "", textListed: false},
        {name: "report", icon: "", textListed: false}
    ];

    const reportFields = [
        {name: "Valor da última campanha", icon: "💵"},
        {name: "Valor total de bens declarados", icon: "🏠"},
        {name: "Votos recebidos", icon: "📠"},
        {name: "Número de Proposições", icon: "📋"},
        {name: "Número de PECs", icon: "💡"},
        {name: "Processos contra o candidato", icon: "📂"},
        {name: "Despesas - Cota Parlamentar", icon: "💳"},
        {name: "Ranking Dep. do Atlas Político", icon: "📈"},
        {name: "Posicionamento Ideológico", icon: "🙋"},
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
    }

    class Text {
        constructor(text) {
            this.text = text
        }
    }

    function buildReport(report) {
        let r = ["📊 Relatório: "];
        reportFields.forEach(function (field) {
            if(Array.isArray(report[field.name])){
                let text = field.icon+ " " + field.name + ":\n        - " + report[field.name].join("\n        - ");
                r.push(text);
            }else{
                r.push(field.icon+ " " + field.name + ": " + report[field.name]);
            }
        });

        console.log(r);
        return r.join("\n");
    }

    function buildInfo(info) {
        let r = ["👤 Dados do deputado \n"];
        candidateFields.forEach(function (field) {
            if(field.textListed && info[field.name])
                r.push(field.icon + " " + field.name + ": " + info[field.name]);
        });

        return r.join("\n");
    }

    module.exports = function(){
        return {
            handleResponse(rawResponse, msg, res, deputados, noticias){

                try {
                    let bubbles = [];
                    let name = rawResponse.context.nomeCandidato;

                    if(name)
                        name = name.toUpperCase();
                    let data = rawResponse.context.dados


                    bubbles.push(new Text(rawResponse.output.text[0]));

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

                            if(docs[0].image)
                                bubbles.push(new Image(docs[0].image));
                            bubbles.push(new Text(buildInfo(docs[0])));

                            if(docs[0].report)
                                bubbles.push(new Text(buildReport(docs[0].report)));

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
                                    ]
                                }
                            ).then(function ({docs}) {
                                let elements = [];
                                docs.forEach(function (doc) {
                                    elements.push(doc);
                                });
                                console.log(elements);
                                if(elements.length > 0){
                                    bubbles.push(new Text(" 📰 Notícias recentes: "));
                                    let gallery = new Gallery(elements);
                                    bubbles.push(gallery);
                                }
                                return res.json(
                                    bubbles
                                );
                            });

                        }).catch(function (err) {
                            console.log(err);
                            return res.json(
                                bubbles
                            );
                        });
                    } else {
                        return res.json(bubbles);
                    }
                }catch(e){
                    console.log(err);
                }
            }
        }
    }
}());