import React from 'react';
import { WingBlank, Card } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'


type MainProps = {
    studentId: string,
    name: string, 
    major: string,
    grade: number,
    semester: number,
    status: string,
    taken: number,
    averageScore: string
}

const Main = ({studentId, name, major, grade, semester, status, taken, averageScore}: MainProps) => {
  
    return (
        <div style={{height: "100%"}}>
            <WingBlank size="lg">
                <Card>
                    <Card.Header 
                        title={name}
                        extra={<span>{studentId}</span>}/>
                    <Card.Body >
                        <div>학년: {grade}</div>
                        <div>학과: {major}</div>
                        <div>이수 학기: {semester}</div>
                        <div>학적: {status}</div>
                        <div>이수 학점: {taken}</div>
                        <div>평균 평점: {averageScore}</div>
                    </Card.Body>
                </Card>
            </WingBlank>
        </div>
    );
  }

Main.defaultProps = {

}

export default Main;