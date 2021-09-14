import axios from 'axios';
import cheerio from 'cheerio';
import { HOST } from '../host';


const getSubjectScheduleData = async (key: string) => {
    const result: object[] = [];
    const html = await axios.get(`http://${HOST}/api/subject/schedule`, {
        headers: {'key': key},
    });
    const $ = cheerio.load(html.data);
    const $sc = $("body").find("tbody").children('tr');
    $sc.each(function(i, elem) {
        if($(this).children('td').length === 8) { 
            const text = $(this).html();
            result.push({
                number: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[0].split('>')[1],
                code: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[1].split('>')[1],
                titie: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[2].split(';')[1],
                professor: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[3].split('>')[1],
                credit: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[4].split('>')[1],
                time: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[5].split('>')[1],
                room: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[6].split('>')[1],
                campus: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[7].split('>')[1],
            });
        } else if($(this).children('td').length === 3) {
            const text = $(this).html();
            result.push({
                time: text?.replace(/\n|\t|<!--|강좌번호|-->|/g,'').split('</td>')[0].split('>')[1],
            });
        }
    })
    result.pop();
    console.log(result);
    return result;
}



export default getSubjectScheduleData;