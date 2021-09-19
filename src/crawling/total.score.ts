import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const getTotalScore = async(key: string) => {
    const result: object[] = [];
    let totalYear: number[] = [];
    const res = await axios.get(`${process.env.REACT_APP_HOST}/api/main`, {
        headers: {'key': key}
    });
    const $ = cheerio.load(res.data);
    const $sc = $('body').find('.colorrow');
    $sc.each(function() {
        const text = $(this).text();
        if(text != null) {
            const res: string[] = text.replace(/\t/g,'').split('\n').slice(1, -2);
            result.push({
                year: res[0],
                semester: res[1],
                type: res[2],
                title: res[3],
                krCode: res[4],
                erCode: res[5],
                credit: res[6].replace(/\s+/g, ''),
                score: res[7]
            });
            if(!totalYear.includes(Number(res[0]))){
                totalYear.push(Number(res[0]));
            }

        }
    })
    result.push(totalYear); // 결과 마지막에 내가 다닌 년도 넣기
    return result;
}

export default getTotalScore;