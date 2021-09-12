import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './App.css';
import Login from './components/login';
import Main from './components/main';

import { NavBar, ActivityIndicator} from 'antd-mobile';

import getMainData from './crawling/main';
import getScheduleData from './crawling/schedule';

import { HOST } from './host';

import { useCookies } from 'react-cookie';

import Crypto from 'crypto-js';

axios.defaults.headers['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLogging, setIsLogging] = useState<boolean>(false);

  // 로그인 데이터
  const [id, setId] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  // 메인 페이지 데이터
  const [user, setUser] = useState<object>();
  // 학사 일정 데이터
  const [schedule, setSchedule] = useState<object>();
  // 쿠키 (아이디 비번 기억하기)
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId', 'rememberPassword', 'rememberLogin']);
  const [rememberLogin, setRememberLogin] = useState<boolean>(true);
  // 현재 컴포넌트
  const [curComponent, setCurComponent] = useState<string>('');

  // 상태 변화 감지하여 작동
  useEffect(() => {
    if(cookies.rememberId !== undefined && cookies.rememberPassword !== undefined && !isLogin) {
      setId(Crypto.AES.decrypt(cookies.rememberId, "여기 값 env설정 해야해").toString(Crypto.enc.Utf8));
      setPassword(Crypto.AES.decrypt(cookies.rememberPassword, "여기 값 env설정 해야해").toString(Crypto.enc.Utf8));
      setRememberLogin(true);
    }
  }, [cookies.rememberId, cookies.rememberLogin, cookies.rememberPassword, isLogin, rememberLogin, setId]);

  const onLoginClick = async () => {
    const data =   {
      "studentId": id,
      "password": password,
    }
    setIsLogging(true);
    // Cookie save or remove
    if(rememberLogin) {
      const encodId = await Crypto.AES.encrypt(id ? id : '', "여기 값 env설정 해야해").toString();
      const encodPassword = await Crypto.AES.encrypt(password ? password : '', "여기 값 env설정 해야해").toString();
      setCookie('rememberId', encodId, {maxAge: 360000});
      setCookie('rememberPassword', encodPassword, {maxAge: 360000});
    }
    // const res = await /
    axios.post(`http://${HOST}/api/account/login`, data)
    .then((res) => { 
      getMain(res.data);
      setCurComponent("main"); // 보여줄 컴포넌트 main으로 수정
     })
    .catch((err) => {
      console.log(err);
      setIsLogging(false);
    })
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
    setIsLogging(false);
  }
  return (
    <>
        <div>
          <NavBar
            mode="light"
            style={{marginBottom: '5px'}}
          >MyiApp</NavBar>
        </div>
        {isLogin && curComponent === 'main'
        ?
        <Main user={user} schedule={schedule}></Main>
        : 
        <Login isLogin={isLogin} id={id ? id : ''} setId={setId} password={password ? password : ''} setPassword={setPassword} rememberLogin={rememberLogin} setRememberLogin={setRememberLogin} setCookie={setCookie} removeCookie={removeCookie}  /> }
        {isLogin ? null : <button value="login" onClick={onLoginClick}>로그인</button>}
        <ActivityIndicator
                toast
                text="Logging..."
                animating={isLogging}
        />
        {isLogin && curComponent === 'semesterScore' ? <Main user={user} schedule={schedule}></Main> : null}
        {/* {isLogin && curComponent === 'totalScore' ? <Main user={user} schedule={schedule}></Main> : null}
        {isLogin && curComponent === 'schedule' ? <Main user={user} schedule={schedule}></Main> : null}
        {isLogin && curComponent === 'graduration' ? <Main user={user} schedule={schedule}></Main> : null} */}
    </>
  )
}

export default App;
