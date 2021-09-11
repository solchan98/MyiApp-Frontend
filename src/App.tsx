import React, { useState } from 'react';
import axios from 'axios';


import './App.css';
import Login from './pages/login';
import Main from './pages/main';

import { NavBar } from 'antd-mobile';

import getMainData from './crawling/main';
import getScheduleData from './crawling/schedule';


axios.defaults.headers['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  // 로그인 데이터
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // 메인 페이지 데이터
  const [user, setUser] = useState<object>();
  // 학사 일정 데이터
  const [schedule, setSchedule] = useState<object>();


  const onLoginClick = async () => {
    const data =   {
      "studentId": id,
      "password": password,
    }
    const res = await axios.post("http://*/api/account/login", data);
    
    getMain(res.data);

  }
  
  const getMain = async (key: string) => {
    await getMainData(key)
    .then((result) => {
      setUser(result);
    })
    .catch()
    await getScheduleData()
    .then((result) => {
      setSchedule(result);
      setIsLogin(true);
    })
    .catch()
 
  }

  return (
    <>
        <div>
          <NavBar
            mode="light"
          >MyiApp  </NavBar>
        </div>
        {isLogin 
        ?
        <Main user={user} schedule={schedule}></Main>
        : 
        <Login isLogin={isLogin} id={id} setId={setId} password={password} setPassword={setPassword}  /> }
        {isLogin ? null : <button value="login" onClick={onLoginClick}>로그인</button>}
    </>
  )
}

export default App;
