import React from 'react';
import { Channel } from './Channel';
export class ChannelList extends React.Component {

    render() {
        let list = `There is no channels to show`;
        if (this.props.Channel) {
            list = this.props.Channel.map(c => <Channel key="{c.id}" id="{c.id}" name="{c.name}" participants="{c.participants}" />);
        }

        
        return (
            <div classname="channel-list">
                {list}
             </div>
            );
        }}