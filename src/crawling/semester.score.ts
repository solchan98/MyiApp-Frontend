
import axios from 'axios';
import cheerio from 'cheerio';
import { HOST } from '../host';


interface SemesterScoreProps {

}

const getSemesterScore = async(key: string) => {
    const result: any = [];
    const res = await axios.get(`http://${HOST}/api/semester/score`, {
        headers: {'key': key}
    });
    const $ = cheerio.load(res.data);
    const $sc = $('body').find('.ov');
    $sc.each(function(i, elem) {
        const temp: any = []
        $(this).find('td').each(function(i, elem) {
            temp.push($(this).text().replace(/\n|\t/g,''));
        })
        result.push(temp);
        // const text = $(this).html();
        // result.push(text?.split(" </tr"));
    })
    console.log(result);
    
    // return result;
}

export default getSemesterScore;