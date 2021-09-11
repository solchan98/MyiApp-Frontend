import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import Login from './pages/login';
import Main from './pages/main';

import getMainData from './crawling/main';


axios.defaults.headers['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';


function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");

  const [studentId, setStudentId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [grade, setGrade] = useState<number>(0);
  const [semester, setSemester] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [taken, setTaken] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<string>("");


  const onLoginClick = async () => {
    const data =   {
      "studentId": studentId,
      "password": password
    }
    const res = await axios.post("*/api/account/login", data);
    // console.log(res.data)
    
    getMain(res.data);

  }
  
  const getMain = async (key: string) => {
    await getMainData(key)
    .then((result) => {
      setStudentId(result.studentId);
      setName(result.name);
      setMajor(result.major);
      setGrade(result.grade);
      setSemester(result.semester);
      setStatus(result.status);
      setTaken(result.taken);
      setAverageScore(result.averageScore);
  
      setIsLogin(true);
    })
    .catch()
 
  }


  return (
    <>
        {isLogin 
        ?
        <Main 
        studentId={studentId} name={name} major={major} grade={grade} semester={semester} status={status} taken={taken} averageScore={averageScore}></Main>
        : <Login isLogin={isLogin} studentId={studentId} setStudentId={setStudentId} password={password} setPassword={setPassword}  /> }
        {isLogin ? null : <button value="login" onClick={onLoginClick}>로그인</button>}
    </>
  )
}

export default App;
