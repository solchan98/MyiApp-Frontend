import React, { useCallback } from 'react';
import { Checkbox, InputItem, WingBlank, NoticeBar } from 'antd-mobile';

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

const Login = ({id, setId ,password, setPassword, rememberLogin, setRememberLogin, removeCookie}: LoginProps ) => {

    const onChangeStudentNumber = useCallback((e) => {
        setId(e)
    }, [setId]);

    const onChangePassword = useCallback((e) => {
        setPassword(e)
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
        <div style={{marginTop: '20px'}}>
                <NoticeBar marqueeProps={{ loop: false, style: { padding: '0 7.5px' } }}>
                    Notice: 본 서비스는 사용자의 정보를 서버에 저장하지 않습니다.
                </NoticeBar>
                <NoticeBar marqueeProps={{ loop: false, style: { padding: '0 7.5px' } }}>
                    Notice: 본 서비스는 사용자의 정보를 서버에 저장하지 않습니다.
                </NoticeBar>
            <WingBlank style={{background: '#FFFFFF', marginTop: '5px'}}>
            <InputItem
                placeholder="학번을 입력하세요"
                clear
                value={id}
                onChange={(v) => { onChangeStudentNumber(v) }}>학번</InputItem>
            <InputItem
                type='password'
                placeholder="비밀번호를 입력하세요"
                clear
                value={password}
                onChange={(v) => { onChangePassword(v) }}>비밀번호</InputItem>
                <Checkbox.CheckboxItem defaultChecked onChange={onChangeRemember} >로그인 기억하기</Checkbox.CheckboxItem>
                </WingBlank>
            </div>
    );
  }

export default Login;