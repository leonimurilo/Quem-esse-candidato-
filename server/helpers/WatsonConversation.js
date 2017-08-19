/**
 * Created by leonim on 30/06/2017.
 */
(function(){

    const WatsonConversation = require('watson-developer-cloud/conversation/v1');

    module.exports = function (credentials) {
        if(!credentials){
            throw new Error("No credentials received.");
        }

        if(!credentials.username || !credentials.password || !credentials.version){
            throw new Error("The credentials doesn't have all the required properties.");
        }

        let module = {};
        const watsonConversation = new WatsonConversation({
            username: credentials.username,
            password: credentials.password,
            version_date: credentials.version
        });

        const defaultWorkspaceId = credentials.workspace_id;

        /**
         * Send a text to a watson conversation workspace and returns its response after receiving it
         * @param opt.text The message to be sent.
         * @param opt.context The context of the conversation.
         * @param opt.workspaceId The workspace to be used.
         */
        module.sendMessage = function (opt) {
            return new Promise(function (resolve, reject) {
                watsonConversation.message({
                    input: { text: opt.text },
                    context: opt.context,
                    workspace_id: opt.workspaceId || defaultWorkspaceId
                }, function(err, data) {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    } else {
                        // console.log(JSON.stringify(data, null, 2));
                        return resolve({
                            response: data,
                            timestamp: Date.now()
                        });
                    }
                });
            });
        };

        return module;

    };

}());