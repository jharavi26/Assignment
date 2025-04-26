import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import { Provider } from 'react-redux';
import store from './Redux/App/store.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App/>
  </Provider>
   
  </StrictMode>,
)
