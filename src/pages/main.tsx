import React from 'react';

type MainProps = {
    studentId: number,
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
        <div>
            {`${studentId}\n${name}\n${major}\n${grade}\n${semester}\n${status}\n${taken}\n${averageScore}`}
        </div>
    );
  }

Main.defaultProps = {

}

export default Main;