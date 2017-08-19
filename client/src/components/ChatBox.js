import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendMessage} from "../actions/index"
import MessageBox from "./MessageBox";

class ChatBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: ""
        };
    }

    onInputChange(event){
        this.setState({message: event.target.value})
    }

    onFormSubmit(event){
        event.preventDefault();
        if(this.props.allowInput){
            console.log("state message: ", this.state.message);
            this.props.sendMessage(this.state.message, this.props.context);
            this.setState({message: ""});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.allowInput) {
            this.textInput.focus();
        }
    }

    render(){
        return (
            <div id="chat-box">
                <MessageBox/>
                <form onSubmit={this.onFormSubmit.bind(this)}
                      className="input-box"
                      disabled={(this.state.message==="")}>
                    <input placeholder="Type your message here"
                           value={this.state.message}
                           onChange={this.onInputChange.bind(this)}
                           disabled={!this.props.allowInput}
                           autoFocus
                           ref={input => this.textInput = input}
                    />
                    <button type="submit"
                            disabled={!this.props.allowInput || (this.state.message==="")}>
                        <img src="assets/send.svg"/>
                    </button>

                </form>
            </div>
        );
    }
}

function mapStateToProps({conversationContext, allowInput}){
    return {
        context: conversationContext,
        allowInput
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({sendMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);