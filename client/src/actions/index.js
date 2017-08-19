import Axios from "axios";
import {
    SEND_MESSAGE,
    SHOW_USER_MESSAGE,
    UPDATE_CONVERSATION_CONTEXT,
    SWITCH_USER_INPUT
} from "./types";

export function sendMessage(message, context) {
    const requestPromise = Axios.post("/api/message",
        {
            message,
            context
        });

    // Redux Thunk allows returning functions
    return (dispatch) => {
        dispatch(
            {
                type: SHOW_USER_MESSAGE,
                payload: message
            }
        );

        dispatch(
            {
                type: SWITCH_USER_INPUT,
                payload: {allow: false}
            }
        );

        requestPromise.then(({data}) => {
            console.log("axio data:", data);
            dispatch(
                {
                    type: SEND_MESSAGE,
                    payload: data.output || data
                }
            );

            // dispatch(
            //     {
            //         type: UPDATE_CONVERSATION_CONTEXT,
            //         payload: data.context
            //     }
            // );

            dispatch(
                {
                    type: SWITCH_USER_INPUT,
                    payload: {allow: true}
                }
            );

        }).catch(err => {
            console.log(err);
        });
    }
}
