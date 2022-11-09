import React from 'react';
import { Channel } from './Channel';

export class ChannelList extends React.Component {

    render() {
       
        var list = `There is no channels to show`;
        if (this.props.channel) {
            list = this.props.channel.map(c => <channel key="{c.id}" id="{c.id}" name="{c.name}" participants="{c.participants}" />);
            
        }

        
        return (
            <div>
                <div className="channel-list"></div>
                {list}
            </div>
         );
    }}