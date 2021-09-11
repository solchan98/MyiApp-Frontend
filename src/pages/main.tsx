import React from 'react';
import { WingBlank, Card, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

import styled from 'styled-components';

const CuntomDiv = styled.div`
fontSize: "20px"
`


type MainProps = {
    user: any;
    schedule: any;
}

const Main = ({user, schedule}: MainProps) => {
  
    return (
        <div >
            <WingBlank size="lg" style={{marginTop: "10%"}}>
            <p style={{paddingLeft: '5px', marginBottom: '5px', fontSize: '20px'}}>나의 정보</p>
                <Card>
                    <Card.Header 
                        title={user.name}
                        extra={<span>{user.studentId}</span>}/>
                    <Card.Body >
                        <CuntomDiv>학년: {user.grade}학년</CuntomDiv>
                        <CuntomDiv>학과: {user.major}</CuntomDiv>
                        <CuntomDiv>이수 학기: {user.semester}학기</CuntomDiv>
                        <CuntomDiv>학적: {user.status}</CuntomDiv>
                        <CuntomDiv>이수 학점: {user.taken}점</CuntomDiv>
                        <CuntomDiv>평균 평점: {user.averageScore}점</CuntomDiv>
                    </Card.Body>
                </Card>
            </WingBlank>
            <p style={{paddingLeft: '20px', marginBottom: '5px', fontSize: '20px'}}>학사 일정</p>
            <WingBlank size="lg" style={{maxHeight: "300px", overflowY: "hidden", overflow: "auto"}}>
                <List className="my-list">
                    {schedule.map((i: { date: any; content: any; }, key: number) => 
                    <Card style={{marginBottom: '1px'}} key={key}>
                        <Card.Header 
                            title={i.date}/>
                        <Card.Body >
                            <CuntomDiv>{i.content}</CuntomDiv>
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