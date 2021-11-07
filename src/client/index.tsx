import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Hello World. Does this work?</div>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
