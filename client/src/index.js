import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Board from './Board.js'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Board />, document.getElementById('root'));

serviceWorker.unregister();
