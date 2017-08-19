import {SEND_MESSAGE, SHOW_USER_MESSAGE} from "../actions/types";
import _ from "lodash";

export default function (state = [], action) {
    switch(action.type){
        case SEND_MESSAGE: {
            let newState = _.map(state, _.clone);
            console.log("action", action);
            action.payload.forEach(message => {
                newState.push({
                    user: false,
                    content: message
                });
            });

            return newState;
        }

        case SHOW_USER_MESSAGE: {
            let newState = _.map(state, _.clone);
            newState.push({
                user: true,
                content: action.payload
            });

            return newState;
        }

        default: return state;
    }
}