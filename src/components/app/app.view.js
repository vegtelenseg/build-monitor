import React from 'react';
import request from 'request';
import BlockView from '../block/block.view';
import endpoints from '../../endpoints';
class ServerHealthNode extends React.Component {
    constructor(options) {
        super(options);
        this.handle = null;
        this.state = {
            serverName: options.serverName,
            timeout: options.timeout,
            status: 'OTHER',
            previousStatus: {
                status: ''
            }
        };
        this.start = this.start.bind(this);
        this.ping = this.ping.bind(this);
        this.updateBlock = this.updateBlock.bind(this);
        this.start();
    }
    componentWillUnmount() {
        this.stop();
    }
    start() {
        const timeout = this.props.timeout * 60000;
        this.handle = setInterval(() => this.ping(), timeout);
    }
    stop() {
        clearInterval(this.handle);
        this.handle = null;
    }
    ping() {
        request(this.state.serverName, (error, res, body) => {
            const serverName = this.state.serverName;
            if (error) {
                this.updateBlock('OTHER', serverName);
            } else if (res.statusCode === 200) {
                this.updateBlock('UP', serverName);
            } else {
                this.updateBlock('DOWN', serverName);
            }
        });
    }
    updateBlock(status, serverName) {
        if (serverName === this.state.serverName && this.state.status === status) return;
        this.setState(prevState => ({
            ...prevState,
            status,
            previousStatus: {
                status: prevState.status
            }
        }));
    }
    render() {
        const { status, serverName, previousStatus } = this.state;
        return (
            <BlockView
                serverName={serverName}
                serverStatus={status}
                previousHealthStatus={previousStatus.status}
            />
        );
    }
}

export default class AppView extends React.Component {
    constructor() {
        super();
        const timeout = 0.125;
        this.endpoints = endpoints;
        this.state = {
            monitors: []
        };
    }
    componentDidMount() {
        const monitors = [];
        const { endpoints } = this;
        for (let i = 0; i < endpoints.length; i++) {
            const monitor = <ServerHealthNode key={i} {...endpoints[i]} />;
            monitors.push(monitor);
        }
        this.setState({
            monitors
        });
    }
    render() {
        return <div className="block-container">{this.state.monitors}</div>;
    }
}
