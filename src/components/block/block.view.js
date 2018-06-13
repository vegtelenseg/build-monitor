import React from 'react';

export default class Block extends React.Component {
    render() {
        const { serverName, serverStatus, previousHealthStatus, onClick } = this.props;
        let currentStatus = serverStatus === 'UP' ? 'pass' : serverStatus === 'DOWN' ? 'fail' :'other'
        return (
            <div className={'block ' + `${currentStatus}`}>
                <div className="server-name">{`Server Name: ${serverName}`}</div>
                <div className="server status">{`Server Status: ${serverStatus}`}</div>
                <input type="submit" value="Previous Health Status" onClick={onClick} />
                <div>
                    {previousHealthStatus
                        ? `Previous Health Status: ${previousHealthStatus.serverStatus}`
                        : 'No Previous Health Status'}
                </div>
            </div>
        );
    }
}
