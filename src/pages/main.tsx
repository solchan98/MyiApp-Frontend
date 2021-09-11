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
                <Card>
                    <Card.Header 
                        title={user.name}
                        extra={<span>{user.studentId}</span>}/>
                    <Card.Body >
                        <CuntomDiv>학년: {user.grade}학년</CuntomDiv>
                        <CuntomDiv>학과: {user.major}</CuntomDiv>
                        <CuntomDiv>이수 학기: {user.semester}</CuntomDiv>
                        <CuntomDiv>학적: {user.status}</CuntomDiv>
                        <CuntomDiv>이수 학점: {user.taken}</CuntomDiv>
                        <CuntomDiv>평균 평점: {user.averageScore}</CuntomDiv>
                    </Card.Body>
                </Card>
            </WingBlank>
            <WingBlank size="lg" style={{marginTop: "10%", maxHeight: "250px", overflowY: "hidden", overflow: "auto"}}>
                <List className="my-list">
                    {schedule.map((i: { date: any; content: any; }, key: number) => <List.Item >{`${i.date} | ${i.content}`}</List.Item>)}
                </List>
            </WingBlank>
        </div>
    );
  }

Main.defaultProps = {

}

export default Main;