import {SWITCH_USER_INPUT} from "../actions/types";

export default function (state = true, action) {
    switch(action.type){
        case SWITCH_USER_INPUT: {
            return action.payload.allow;
        }
        default: return state;
    }
}