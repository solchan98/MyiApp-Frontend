import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './App.css';
import Login from './components/login';
import Main from './components/main';

import { NavBar, ActivityIndicator, WingBlank, Grid} from 'antd-mobile';

import getMainData from './crawling/main';
import getScheduleData from './crawling/schedule';

import { HOST } from './host';

import { useCookies } from 'react-cookie';

import Crypto from 'crypto-js';
import TotalScore from './components/total.score';
import getTotalScore from './crawling/total.score';

function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLogging, setIsLogging] = useState<boolean>(false);

  // 로그인 데이터
  const [id, setId] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  // 메인 페이지 데이터
  const [user, setUser] = useState<object>();
  // 통합성적 페이지 데이터
  const [totalScore, setTotalScore] = useState<object>();
  // 학사 일정 데이터
  const [schedule, setSchedule] = useState<object>();
  // 쿠키 (아이디 비번 기억하기)
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId', 'rememberPassword', 'rememberLogin']);
  const [rememberLogin, setRememberLogin] = useState<boolean>(true);
  // 현재 컴포넌트
  const [curComponent, setCurComponent] = useState<string>('');
  // Login을 위한 데이터
  const data =   {
    "studentId": id,
    "password": password,
  }

  // 상태 변화 감지하여 작동
  useEffect(() => {
    if(cookies.rememberId !== undefined && cookies.rememberPassword !== undefined && !isLogin) {
      setId(Crypto.AES.decrypt(cookies.rememberId, "여기 값 env설정 해야해").toString(Crypto.enc.Utf8));
      setPassword(Crypto.AES.decrypt(cookies.rememberPassword, "여기 값 env설정 해야해").toString(Crypto.enc.Utf8));
      setRememberLogin(true);
    }
  }, [cookies.rememberId, cookies.rememberLogin, cookies.rememberPassword, isLogin, rememberLogin, setId]);

  const onLoginClick = async () => {
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
      if(res.data !== 'error') {
        getMain(res.data)
        .then(() => {
          setCurComponent("main"); // 보여줄 컴포넌트 main으로 수정
        })
      } else {
        console.log("Error/ Server Error"); 
        setIsLogging(false);
      }
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

  // Grid 4개 중 어느 하나라도 클릭된 경우,
  const onGridClick = (e: any) => {
    setIsLogging(true); // Loging Indicator start
    axios.post(`http://${HOST}/api/account/login`, data)
    .then(async (res) => { 
      if(e.text === '통합성적'){ // 통합 성적이 클릭된 경우,
        await getTotalScore(res.data)
        .then((result) => { setTotalScore(result); setCurComponent("totalScore");})
        .catch()
      } else if(e.text === '학기성적') {

      } else if(e.text === '시간표') {

      } else if(e.text === '졸업학점') {

      }
      setIsLogging(false); // Loging Indicator stop
     })
    .catch((err) => {
      console.log(err);
      setIsLogging(false); // Loging Indicator stop
    })
  }
  return (
    <>
        <div>
          <NavBar
            mode="light"
            style={{marginBottom: '5px'}}
            onClick={()=> {setCurComponent('main')}}
          >MyiApp</NavBar>
          {isLogin ? <WingBlank>
                <Grid 
                itemStyle={{height:'50px'}}
                data={[{icon:"" ,text: "학기성적"},{icon:"" ,text: "통합성적"}, {icon:"" , text: "시간표"}, {icon:"" , text: "졸업학점"} ]} 
                activeStyle={false}
                onClick={onGridClick}/>
            </WingBlank> : null}
        </div>
        {isLogin
        ?
        curComponent === 'main' 
          ? <Main user={user} schedule={schedule} setCurComponent={setCurComponent} setIsLogging={setIsLogging}></Main>
          : curComponent === 'totalScore' ? <TotalScore totalScore={totalScore} ></TotalScore> : null
        : 
        <Login isLogin={isLogin} id={id ? id : ''} setId={setId} password={password ? password : ''} setPassword={setPassword} rememberLogin={rememberLogin} setRememberLogin={setRememberLogin} setCookie={setCookie} removeCookie={removeCookie}  /> }
        {isLogin ? null : <button value="login" onClick={onLoginClick}>로그인</button>}
        <ActivityIndicator
                toast
                text="Lodding..."
                animating={isLogging}
        />
        {/*isLogin && curComponent === 'semesterScore' ? <Main user={user} schedule={schedule}></Main> : null*/}
        {/*isLogin && curComponent === 'schedule' ? <Main user={user} schedule={schedule}></Main> : null}
        {isLogin && curComponent === 'graduration' ? <Main user={user} schedule={schedule}></Main> : null} */}
    </>
  )
}
export default App;