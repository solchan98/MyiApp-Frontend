import React from 'react';

type LoginProps = {
    isLogin: boolean;
}

const Login = ({ isLogin }: LoginProps ) => {
    return (
        <div>
            {`You need to login`}
        </div>
    );
  }

Login.defaultProps = {
    studentId: "123",
    password: "!23"
}

export default Login;