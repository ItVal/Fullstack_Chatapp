import React from 'react';
import { Message } from './Message';
export class MessagesPanel extends React.Component {
    render() {

        let list = <div className="no-content-message">There is no messages to show</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key="{m.id}" id="{m.id}" sendername="{m.senderName}" text="{m.text}" />);
        }

        return (
            <div className="messages-panel">
                <div className="meesages-list">{list}
                <div className="messages-input">

                    <input type="text" />
                    <button>Send</button>

                </div>
            </div>
        </div>
    );
}}