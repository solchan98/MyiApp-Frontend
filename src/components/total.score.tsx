import React, { useState } from 'react';
import { WhiteSpace, Button, Modal, List } from 'antd-mobile';

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
        console.log(selectYear, selectSemester);
    }

    return (
        <>
        <Button onClick={onClickModalOpenButton}>년도 학기 선택</Button>
        <WhiteSpace />
        <Modal
          popup
          visible={modal}
          onClose={()=> {console.log("z")}}
          animationType="slide-up"
          style={{ maxHeight: "300px" }}
        >
          <List renderHeader={() => <div>년도와 학기를 선택하세요</div>} className="popup-list" style={{ maxHeight: "300px" }}>
          {totalScore[totalScore.length - 1].map((i: number, key: number) => 
                [1, 2].map((j: number, key: number) => 
                    <List.Item key={key} onClick={onClickYearAndSemester} >{`${i} ${j}`}</List.Item>
                )
            )}
          </List>
        </Modal>
        </>
    );
  }

export default TotalScore;