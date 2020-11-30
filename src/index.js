import React from 'react';
import ReactDOM from 'react-dom';
import Router from './pages/Router';
import 'bootstrap/dist/css/bootstrap.min.css';

// // CSS Home Page
// import './assets/style/style.css'
// import './assets/style/home.css'
import './assets/style/category.css'
// import './assets/style/new.css'

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);