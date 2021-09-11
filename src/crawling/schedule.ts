import axios from 'axios';
import cheerio from 'cheerio';
import { HOST } from '../host';


const getScheduleData = async () => {
    const result: object[] = [];
    const html = await axios.get(`http://${HOST}/api/schedule`);
    const $ = cheerio.load(html.data);
    const $sc = $("body").find(".list").children('ul').children('li');
    $sc.each(function(i, elem) {
        const text = $(this).text();
        result.push({
            date: text.substr(14, 16),
            content: text.substr(72).replace(/\t|\n/g,''),
        })
    })
    return result;
}

export default getScheduleData;