import React, {Component} from "react";
import {connect} from "react-redux";
import ReactDOM from "react-dom";
import _ from "lodash";

import SpeechBubble from "./SpeechBubble";

class MessageBox extends Component {
    constructor(props){
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    renderMessages(messages){
        return _.map(messages, (message, index) => {
            return (
                <SpeechBubble key={index} content={message.content} right={message.user}/>
            );
        });
    }

    scrollToBottom = () => {
        const messagesBox = ReactDOM.findDOMNode(this.messagesBox);
        console.log(this.messagesBox);
        console.log(messagesBox);
        messagesBox.scrollTop = messagesBox.scrollHeight;
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render(){
        return (
            <div id="message-box"
                 ref={(el) => { this.messagesBox = el; }}>
                <ul>
                    {this.renderMessages(this.props.messages)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({messages}) {
    return {messages}
}

export default connect(mapStateToProps, null)(MessageBox);