import React, { useState } from 'react';
import { WhiteSpace, Button, Modal, List, WingBlank, Card } from 'antd-mobile';

type TotalScoreProps = {
    totalScore: any;
}
const TotalScore = ({totalScore}: TotalScoreProps) => {

    const [modal, setModal] = useState<boolean>(false);
    const [selectYear, setSelectYear] = useState<number>();
    const [selectSemester, setSelectSemester] = useState<number>();
    

    const onClickModalOpenButton = () => {
        setModal(true);

    }
    const onClickYearAndSemester = (e: any) => {
        setModal(false);
        const yearSemester = e.target.innerText.split(' ');
        setSelectYear(yearSemester[0]);
        setSelectSemester(yearSemester[1]);
    }

    return (
        <>
        <Button onClick={onClickModalOpenButton}>년도 학기 선택</Button>
        <WhiteSpace />
        <Modal
          popup
          visible={modal}
          onClose={()=> {setModal(false)}}
          animationType="slide-up"
          style={{ maxHeight: "300px" }}
        >
          <List renderHeader={() => <div>년도와 학기를 선택하세요</div>} className="popup-list" style={{ maxHeight: "300px" }}>
          {totalScore[totalScore.length - 1].map((i: number, key: number) => 
                [1, 2].map((j: number, key: number) => 
                    <List.Item key={key} onClick={onClickYearAndSemester} >{`${i} ${j}학기`}</List.Item>
                )
            )}
          </List>
        </Modal>
        {selectYear === undefined || selectSemester === undefined ? <h3>년도와 학기를 선택하세요</h3> : null}
        <WingBlank size="lg" style={{ marginTop: "15px", maxHeight: "500px", overflow: "scroll"}}>
                {selectYear !== undefined ? <List className="my-list">
                    {totalScore.map((i: any, key: number) => {
                        if(i.year === selectYear && i.semester === selectSemester) {
                            return (
                                <Card style={{marginBottom: '2px'}} key={key}>
                                    <Card.Header 
                                        title={i.title}/>
                                    <Card.Body >
                                        <div>{`성적: ${i.score}`}</div>
                                        <div>{`학점: ${i.credit}`}</div>
                                        <div>{i.type}</div>
                                        <div>{i.krCode}</div>
                                        <div>{i.erCode}</div>

                                    </Card.Body>
                                </Card>)}
                        return null;
                    }
                    )}
                </List> : null}
            </WingBlank>
        </>
    );
  }

export default TotalScore;