import {UPDATE_CONVERSATION_CONTEXT} from "../actions/types";

export default function(state = {}, action){
    switch(action.type){
        case UPDATE_CONVERSATION_CONTEXT:
            return action.payload;
        default: return state;
    }
}