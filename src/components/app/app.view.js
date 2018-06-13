import React from 'react';
import BlockView from '../block/block.view';

export default class App extends React.Component {
    componentDidMount() {
        const { checkHealthStatusThunk, listOfEndPoints } = this.props;
        setTimeout(() => {
            listOfEndPoints.map((endpoint, idx) => checkHealthStatusThunk(endpoint, idx)).join('');
        }, 3000);
    }
    render() {
        const { getPreviousHealthStatusAction, block } = this.props;
        return (
            <div className="App">
                <BlockView
                    serverName={block.server.serverName}
                    serverStatus={block.server.serverStatus}
                    previousHealthStatus={block.previousHealthStatus}
                    onClick={() => getPreviousHealthStatusAction()}
                />
            </div>
        );
    }
}
