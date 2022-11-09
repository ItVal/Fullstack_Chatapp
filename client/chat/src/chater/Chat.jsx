import React from 'react';
import { ChannelList } from './ChannelList';
import { MessagesPanel } from './MessagesPanel';
import './chat.scss';
import '../App.css';

export class Chat extends React.Component {
  


        state = {
            channels: [{ id: 1, name: 'first', participants: 10 }]
        }

        componentDidMount() {
            this.loadChannels();
        }
        
        loadChannels = async () => {    fetch('http://localhost:2080/getChannels').then(async response => {
                let data = await response.json();
                    this.setState({ channels: data.channels });
            })
        }

      
        handleChannelSelect = id => {
            this.socket.emit('channel-join', id, ack => {
            });
        } 

        configureSocket = () => {

            var socket = socketClient(SERVER);
            socket.on('connection', () => {
              if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
              }
            });
          
            socket.on('channel', channel => {
              
              let channels = this.state.channels;
                channels.forEach(c => {
                  if (c.id === channel.id) {
                    c.participants = channel.participants;
                  }
            });
          
            this.setState({ channels });});
          
          socket.on('message', message => {
            let channels = this.state.channels
              channels.forEach(c => {
                if (c.id === message.channel_id) {
                  if (!c.messages) {
                    c.messages = [message];
                  } else {
                    c.messages.push(message);
                  }
                }
              });
              this.setState({ channels });
            });
            this.socket = socket;}
          handleSendMessage = (channel_id, text) => {
            this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });}


        render() {
            return (
                <div className="chat-app">
                    <ChannelList channels="{this.state.channels}" onSelectChannel="{this.handleChannelSelect}" />
                    <MessagesPanel onSendMessage="{this.handleSendMessage}" channel="{this.state.channel}" />
                </div>
            );
        }}
