import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import QuestionsComponent from './Components/Questions/QuestionsComponent';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <QuestionsComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
