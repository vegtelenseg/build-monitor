import React from 'react';

export default class BlockView extends React.PureComponent {
    state = {
        isVisible: false
    };
    render() {
        const { serverName, serverStatus, previousHealthStatus } = this.props;
        let currentStatus =
            serverStatus === 'UP' ? 'pass' : serverStatus === 'DOWN' ? 'fail' : 'other';
        return (
            <div className={`block ${currentStatus}`} onClick={() => this.renderPrevHealthStatus()}>
                <div className="server-name">{`Server Name: ${serverName}`}</div>
                <div className="server-status">{`Server Status: ${serverStatus}`}</div>
                <div className="previous-server-status">
                    {previousHealthStatus && this.state.isVisible
                        ? `Previous Health Status: ${previousHealthStatus}`
                        : 'No Previous Health Status'}
                </div>
            </div>
        );
    }
    renderPrevHealthStatus() {
        this.setState(prevState => {
            return {
                isVisible: true
            };
        });
    }
}
