import React, { useState, useCallback } from 'react';

type LoginProps = {
    isLogin: boolean;
    password: string;
    setPassword: any;
    studentId: number;
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
            <input name='studentId' value={studentId} onChange={onChangeStudentNumber} />
            <input name='password' value={password} onChange={onChangePassword} type="password"/>
            {`\nYou need to login`}
        </div>
    );
  }

Login.defaultProps = {
    studentId: "123",
    password: "!23"
}

export default Login;