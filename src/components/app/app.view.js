import React from 'react';
import BlockView from '../block/block.view';

export default class App extends React.Component {
    componentDidMount() {
        const { checkHealthStatusThunk, listOfEndPoints } = this.props;
        setInterval(
            () => listOfEndPoints.map((endpoint, idx) => checkHealthStatusThunk(endpoint, idx)),
            5000
        );
    }
    render() {
        return <div className="App">{this.renderBlocks()}</div>;
    }
    renderBlocks() {
        const { blocks, getPreviousHealthStatusAction, listOfEndPoints } = this.props;
        return (
            blocks.length > 0 &&
            blocks.map(block => (
                <BlockView
                    serverName={block.server.serverName}
                    serverStatus={block.server.serverStatus}
                    previousHealthStatus={block.previousHealthStatus}
                    onClick={() => getPreviousHealthStatusAction()}
                />
            ))
        );
    }
}
