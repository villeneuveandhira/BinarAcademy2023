/* import(s) */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {/* shows the app */}
    <div className='content'>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);