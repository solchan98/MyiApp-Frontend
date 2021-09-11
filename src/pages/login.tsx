import React, { useState, useCallback } from 'react';

type LoginProps = {
    isLogin: boolean;
    password: string;
    setPassword: any;
    studentId: string;
    setStudentId: any;
}

const Login = ({ isLogin, studentId, setStudentId,password, setPassword}: LoginProps ) => {

    const onChangeStudentNumber = useCallback((e) => {
        setStudentId(e.target.value)
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, []);
    return (
        <div>
            <input name='studentId' value={studentId} placeholder="학번을 입력하세요" onChange={onChangeStudentNumber} />
            <input name='password' value={password} placeholder="비밀번호를 입력하세요" onChange={onChangePassword} type="password"/>
        </div>
    );
  }

export default Login;