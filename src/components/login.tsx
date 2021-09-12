import React, { useCallback } from 'react';
import { Checkbox } from 'antd-mobile';

type LoginProps = {
    isLogin: boolean;
    password: string;
    setPassword: any;
    id: string;
    setId: any;
    rememberLogin: boolean;
    setRememberLogin: any;
    setCookie: any;
    removeCookie: any;
}

const Login = ({ isLogin, id, setId ,password, setPassword, rememberLogin, setRememberLogin, setCookie, removeCookie}: LoginProps ) => {

    const onChangeStudentNumber = useCallback((e) => {
        setId(e.target.value)
    }, [setId]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [setPassword]);

    const onChangeRemember = useCallback((e) => {
        if(rememberLogin) {
            removeCookie('rememberId');
            removeCookie('rememberPassword');
            setRememberLogin(false)
        } else {
            setRememberLogin(true)
        }
    }, [rememberLogin, removeCookie, setRememberLogin]);
    return (
        <div>
            <input name='studentId' value={id} placeholder="학번을 입력하세요" onChange={onChangeStudentNumber} />
            <input name='password' value={password} placeholder="비밀번호를 입력하세요" onChange={onChangePassword} type="password"/>
            <Checkbox.CheckboxItem defaultChecked onChange={onChangeRemember}>로그인 기억하기</Checkbox.CheckboxItem>
        </div>
    );
  }

export default Login;