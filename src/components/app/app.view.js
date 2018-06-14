import React from 'react';
import request from 'request';
import BlockView from '../block/block.view';

class ServerHealthNode extends React.Component {
    constructor(options) {
        super(options);
        this.handle = null;
        this.state = {
            serverName: options.serverName,
            timeout: options.timeout,
            status: 'OTHER',
            previousState: {
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
        request(
            this.state.serverName,
            function(error, res, body) {
                if (error) {
                    this.updateBlock('OTHER');
                } else if (res.statusCode === 200) {
                    this.updateBlock('UP');
                } else {
                    this.updateBlock('DOWN');
                }
            }.bind(this)
        ).on('error', () => this.updateBlock('OTHER'));
    }
    updateBlock(status) {
        const time = Date.now();
        this.setState(prevState => {
            return {
                ...prevState,
                time,
                status,
                previousState: prevState
            };
        });
    }
    render() {
        const { status, serverName, previousState } = this.state;
        return (
            <BlockView
                serverName={serverName}
                serverStatus={status}
                previousHealthStatus={previousState.status}
            />
        );
    }
}

export default class AppView extends React.Component {
    constructor() {
        super();
        const timeout = 0.125;
        this.endpoints = [
            {
                url: 'https://cognition.dev.stackworx.cloud/api/status',
                timeout
            },
            {
                url: 'https://ord.dev.stackworx.io/health',
                timeout
            },
            {
                url: 'https://api.durf.dev.stackworx.io/health',
                timeout
            },
            {
                url: 'https://prima.run/health',
                timeout
            },
            {
                url: 'https://stackworx.io/',
                timeout
            },
            {
                url: 'https://stackworx.io/',
                timeout
            }
        ];
        this.state = {
            monitors: []
        };
    }
    componentDidMount() {
        const monitors = [];
        const { endpoints } = this;
        for (let i = 0; i < endpoints.length; i++) {
            const monitor = <ServerHealthNode serverName={endpoints[i].url} timeout={endpoints[i].timeout} />;
            monitors.push(monitor);
        }
        this.setState({
            monitors
        });
    }
    render() {
        return <div>{this.state.monitors}</div>;
    }
}
