import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  //<React.StrictMode> antd.mobile Component 중 modal을 쓰면 오류를 뱉어냄.. 난 해결할 맘 없어서 StrictMode 안쓰기로..
    <App />,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

