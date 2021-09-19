
import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

/* 학번, 이름, 학과, 학년, 이수학기, 학적상태*/
/* 이수학점 평균평점 */
interface BasicUserData {
    studentId: string,
    name: string, 
    major: string,
    grade: number,
    semester: number,
    status: string,
    credit: number,
    averageScore: string
}

const getMainData = async(key: string) => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/api/main`, {
        headers: {'key': key}
    });
    const $ = cheerio.load(res.data);
    const $sc = $('body').find('.wTable').children('tbody').children('tr');
    let data: string[][] = [];
    $sc.each(function(i, elem) {
        const text = $(this).html();
        if(text != null) {
            const afterStr = text.replace(/\t|\n|<th|width|"13%"|"21%"|"25%"|=|>| |<|th|\/|/g,'');
            data.push(afterStr.split('td'));
        }
    })
    const result: BasicUserData = {
        studentId: data[0][1],
        name: data[0][3],
        major: data[1][1],
        grade: Number(data[1][3]),
        semester: Number(data[1][5]),
        status: data[3][3],
        credit: Number(data[6][3]),
        averageScore: data[6][7],
    }
    return result
}


export default getMainData;