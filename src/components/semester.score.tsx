import React from 'react';
import { WingBlank, List } from 'antd-mobile'

type SemesterScoreProps = {
    semesterScore: any;
}
const SemesterScore = ({semesterScore}: SemesterScoreProps) => {

    return (
        <>  
            <p style={{paddingLeft: '15px', marginBottom: '3px', fontSize: '17px'}}>수강성적</p>
            <WingBlank style={{background: '#FFFFFF', marginTop: '10px'}}>
                { semesterScore[0].length > 5 
                ? semesterScore.map((d: any, key: number) => 
                <List.Item key={key} extra={d[4] === '공개' && d[5] === '입력' ? d[3] : `${d[4]}/ ${d[5]}`}>
                    {`${d[1]} (${d[2]}학점 )`}
                    <List.Item.Brief>
                        {d[0]}
                    </List.Item.Brief>
                </List.Item>)
                : semesterScore.map((d: any, key: number) => 
                <List.Item key={key} extra="연구실 교육 미이수">
                    {`${d[1]} (${d[2]}학점 )`}
                    <List.Item.Brief>
                        {d[0]}
                    </List.Item.Brief>
                </List.Item>)}
            </WingBlank>
        </>
    );
  }

export default SemesterScore;