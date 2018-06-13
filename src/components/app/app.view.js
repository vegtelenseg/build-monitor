import React from 'react';
import BlockView from '../block/block.view';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            listOfEndPoints: [
                'https://cognition.dev.stackworx.cloud/api/status',
                'https://ord.dev.stackworx.io/health',
                'https://api.durf.dev.stackworx.io/health',
                'https://prima.run/health',
                'https://stackworx.io/',
                'https://stackworx.io/'
            ]
        };
    }
    render() {
        return (
            <div className="App">
                <BlockView />
            </div>
        );
    }
}
