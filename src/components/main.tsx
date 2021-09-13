import React from 'react';
import { WingBlank, Card, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

type MainProps = {
    user: any;
    schedule: any;
    setCurComponent: any;
    setIsLogging: any;
}

const Main = ({user, schedule, setCurComponent, setIsLogging}: MainProps) => {

    return (
        <div>
            
            <WingBlank size="lg" style={{marginTop: "5%"}}>
            <p style={{paddingLeft: '5px', marginBottom: '5px', fontSize: '20px'}}>나의 정보</p>
                <Card>
                    <Card.Header 
                        title={user.name}
                        style={{fontSize: '18px'}}
                        extra={<span>{user.studentId}</span>}/>
                    <Card.Body >
                        <div style={{marginBottom: '8px', fontSize: '18px'}}>학년: {user.grade}학년</div>
                        <div style={{marginBottom: '8px', fontSize: '18px'}}>학과: {user.major}</div>
                        <div style={{marginBottom: '8px', fontSize: '18px'}}>이수 학기: {user.semester}학기</div>
                        <div style={{marginBottom: '8px', fontSize: '18px'}}>학적: {user.status}</div>
                        <div style={{marginBottom: '8px', fontSize: '18px'}}>이수 학점: {user.taken}점</div>
                        <div style={{marginBottom: '8px', fontSize: '18px'}}>평균 평점: {user.averageScore}점</div>
                    </Card.Body>
                </Card>
            </WingBlank>
            <p style={{paddingLeft: '20px', marginBottom: '5px', fontSize: '20px'}}>학사 일정</p>
            <WingBlank size="lg" style={{maxHeight: "300px", overflow: "scroll"}}>
                <List className="my-list">
                    {schedule.map((i: { date: any; content: any; }, key: number) => 
                    <Card style={{marginBottom: '1px'}} key={key}>
                        <Card.Header 
                            title={i.date}/>
                        <Card.Body >
                            <div>{i.content}</div>
                        </Card.Body>
                    </Card>)}
                </List>
            </WingBlank>
        </div>
    );
  }

Main.defaultProps = {

}

export default Main;