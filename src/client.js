import React from 'react';
import { Provider } from 'react-redux';
window.React = React; // enable debugger



const reactRoot = window.document.getElementById('wrapper');

React.render(
<App />, reactRoot);
