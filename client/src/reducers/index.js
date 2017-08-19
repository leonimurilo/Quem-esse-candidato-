import {combineReducers} from "redux";
import MessagesReducer from "./Messages";
import ConversationContextReducer from "./ConversationContext";
import ChatInputControl from "./ChatInputControl";

const rootReducer = combineReducers({
    messages: MessagesReducer,
    // conversationContext: ConversationContextReducer,
    allowInput: ChatInputControl
});

export default rootReducer;