import React, { useState } from 'react';

import './App.css';
import Login from './pages/login';
import Main from './pages/main';
const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);


  return isLogin ? <Main /> : <Login isLogin={isLogin}/>;
}

export default App;
