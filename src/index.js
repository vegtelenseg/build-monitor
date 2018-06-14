import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppView from './components/app/app.view';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppView />, document.getElementById('root'));
registerServiceWorker();
