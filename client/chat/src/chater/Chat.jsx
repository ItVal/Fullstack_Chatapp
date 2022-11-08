import React from 'react';
import { ChannelList } from './ChannelList';
import { MessagesPanel } from './MessagesPanel';
import './chat.scss';

export class Chat extends React.Component {

        state = {
            channels: [{ id: 1, name: 'first', participants: 10 }]
        }
        render() {
            return (
                <div className="chat-app">
                    <ChannelList channels="{this.state.channels}" />
                    <MessagesPanel />
                </div>
            );
        }}
