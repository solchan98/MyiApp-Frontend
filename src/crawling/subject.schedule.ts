import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

interface subjectSchedule {
    number: String,
    code: string,
    title: string,
    professor: string,
    credit: number,
    time1: string,
    time2?: string,
    room: string,
    campus: string,
}

const getSubjectScheduleData = async (key: string) => {
    const result: subjectSchedule[] = [];
    const html = await axios.get(`${process.env.REACT_APP_HOST}/api/subject/schedule`, {
        headers: {'key': key},
    });
    const $ = cheerio.load(html.data);
    const $sc = $("body").find("tbody").children('tr');
    $sc.each(function(i, elem) {
        if($(this).children('td').length === 8) { 
            const text = $(this).html();
            result.push({
                number: String(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[0].split('>')[1]), // Not Use(09/15)
                code: String(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[1].split('>')[1]),
                title: String(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[2].split(';')[1]),
                professor: String(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[3].split('>')[1]),
                credit: Number(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[4].split('>')[1]),
                time1: String(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[5].split('>')[1]),
                room: String(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[6].split('>')[1]),
                campus: String(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[7].split('>')[1]),
            });
        } else if($(this).children('td').length === 3) {
            const text = $(this).html();
            if(!text?.includes('학점')){ // 시간표가 아닌 데이터가 포함되어있기 때문이다.
                result[result.length - 1].time2 = String(text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[0].split('>')[1]);
            }
        }
    })

    return result;
}



export default getSubjectScheduleData;