import React from 'react';
import { WingBlank, List, NoticeBar } from 'antd-mobile'

type GraduatedCreditProps = {
    graduateCredit: any;
}


const GraduatedCredit = ({graduateCredit}: GraduatedCreditProps) => {

    const data1 = [{
        name: "공통교양",
        text: graduateCredit.common
    }, {
        name: "핵심교양",
        text: graduateCredit.essential
    }, {
        name: "학문기초교양",
        text: graduateCredit.basic
    }, {
        name: "일반교양",
        text: graduateCredit.normal
    }];
    const data2 = [ {
        name: "부전공",
        text: graduateCredit.major[1]
    }, {
        name: "복수전공",
        text: graduateCredit.major[2]
    }, {
        name: "연계전공",
        text: graduateCredit.major[3]
    },]

    const data3 = [{
        name: "졸업학점",
        text: graduateCredit.total
    }]
    const chapelBasic = {
        name: "채플",
        text: graduateCredit.chapel
    }
    const majorBasic = {
        name: "전공",
        text: graduateCredit.major
    }
    const teaching = {
        name: "교직",
        text: graduateCredit.free[0]
    }

    return (
        <>
            <p style={{paddingLeft: '15px', marginBottom: '3px', fontSize: '17px'}}>교양<span style={{fontSize: '15px'}}>( 이수/ 졸업기준 )</span></p>
            <WingBlank style={{background: '#FFFFFF'}}>
                {data1.map((d, key) => <List.Item key={key} extra={`${d.text[0]}/ ${d.text[1]}`}>{d.name}</List.Item>)}
                <List.Item extra={teaching.text[0]}>{teaching.name}</List.Item>
                <List.Item extra={`${chapelBasic.text[0]}회/ ${chapelBasic.text[1]}회`}>{chapelBasic.name}</List.Item>
                
            </WingBlank>
            <p style={{paddingLeft: '15px', marginBottom: '3px', fontSize: '17px'}}>전공<span style={{fontSize: '15px'}}>( 이수 )</span></p>
            <WingBlank style={{background: '#FFFFFF'}}>
                <List.Item extra={`${majorBasic.text[0]}/ ${majorBasic.text[4]}`}>{majorBasic.name}<span style={{fontSize: '15px'}}>(이수/ 졸업기준)</span></List.Item>
                {data2.map((d, key) => <List.Item key={key} extra={d.text}>{d.name}</List.Item>)}
            </WingBlank>
            <p style={{paddingLeft: '15px', marginBottom: '3px', fontSize: '17px'}}>졸업<span style={{fontSize: '15px'}}>( 이수/ 졸업기준 )</span></p>
            <WingBlank style={{background: '#FFFFFF'}}>
                {data3.map((d, key) => <List.Item key={key} extra={`${d.text[0]}/ ${d.text[1]}`}>{d.name}</List.Item>)}
            </WingBlank>
            <WingBlank style={{background: '#FFFFFF', marginTop: '5px'}}>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: 졸업기준을 넘기게 이수한 모든 학점은 자유학점으로 넘어갑니다.
                </NoticeBar>
            </WingBlank>
        </>
    );
  }

export default GraduatedCredit;