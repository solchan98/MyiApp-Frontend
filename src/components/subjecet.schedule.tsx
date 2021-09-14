import React from 'react';
import { List, WingBlank, Card } from 'antd-mobile'

type SubjectScheduleProps = {
    subjectSchedule: any;
}
const SubjectSchedule = ({subjectSchedule}: SubjectScheduleProps) => {

    return (
        <>
        <WingBlank size="lg" style={{maxHeight: "550px", overflow: "scroll", marginTop: '5px'}}>

        <List className="my-list">
            {subjectSchedule.map((i: any, key: number) => 
                <Card style={{marginBottom: '1px'}} key={key}>
                    <Card.Header 
                    title={`${i.title}(${i.professor})`}
                    extra={i.code}/>
                    <Card.Body >
                        <div>{i.time1}</div>
                        {i.time2 ? <div>{i.time2}</div> : null}
                    </Card.Body>
                    <Card.Footer content={`${i.campus}캠퍼스(${i.room})`} extra={`${i.credit}학점`}/>
                </Card>)}
            </List>
        </WingBlank>
        </>
    );
  }

export default SubjectSchedule;