import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const mountNode = document.getElementById('root');
ReactDOM.render(<App/>, mountNode);