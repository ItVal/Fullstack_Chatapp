import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './Styles/commons.css';
import './Styles/channel.css';

import {Store} from './redux/store.js'
import {Provider} from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={Store}>
    <App />
  </Provider>
  // <React.StrictMode>
  //  </React.StrictMode>
)
