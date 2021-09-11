import React, { useCallback } from 'react';

type LoginProps = {
    isLogin: boolean;
    password: string;
    setPassword: any;
    id: string;
    setId: any;
}

const Login = ({ isLogin, id, setId ,password, setPassword}: LoginProps ) => {

    const onChangeStudentNumber = useCallback((e) => {
        setId(e.target.value)
    }, [setId]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [setPassword]);
    return (
        <div>
            <input name='studentId' value={id} placeholder="학번을 입력하세요" onChange={onChangeStudentNumber} />
            <input name='password' value={password} placeholder="비밀번호를 입력하세요" onChange={onChangePassword} type="password"/>
        </div>
    );
  }

export default Login;