import axios from 'axios';
import cheerio from 'cheerio';
import { HOST } from '../host';

interface subjectSchedule {
    common: string[]; // 공통교양
    essential: string[]; // 핵심교양
    basic: string[]; // 학문기초교양
    normal: string[]; // 일반교양
    major: string[]; // 전공 [(전공, 부전공, 복수전공, 연계전공), 졸업전공]
    free: string[]; // 자유선택 [(교직, 자유), 졸업자유]
    chapel: string[]; // 채플
    total: string[]; // 총 취득[총합, 졸업총합]


}


const getGraduatedCredit = async (key: string) => {
    let result: subjectSchedule = {common: [], essential: [], basic: [], normal: [], major: [], free: [], chapel: [], total: []};
    const html = await axios.get(`http://${HOST}/api/graduated`, {
        headers: {'key': key},
    });
    const $ = cheerio.load(html.data);
     // 공통교양
    const $common = $('body').find('.liberal_common');
    $common.each(function() {
        const text = $(this).text().replace(/\n|\t/g,'').slice(0, 2);
        result.common.push(text);
    })
    // 핵심교양
    const $essential = $('body').find('.liberal_essential'); 
    $essential.each(function() {
        const text = $(this).text().replace(/\n|\t/g,'').slice(0, 2);
        result.essential.push(text);
    })
    // 핵심교양
    const $basic = $('body').find('.liberal_basic'); 
        $basic.each(function() {
        const text = $(this).text().replace(/\n|\t/g,'').slice(0, 2);
        result.basic.push(text);
    })
    // 일반교양
    const $normal = $('body').find('.liberal_normal'); 
        $normal.each(function() {
        const text = $(this).text().replace(/\n|\t/g,'').slice(0, 2);
        result.normal.push(text);
    })
    // 전공(All)
    const $major = $('body').find('.major'); 
        $major.each(function() {
        const text = $(this).text().replace(/\n|\t/g,'').slice(0, 3);
        result.major.push(text);
    })
    // 자유선택(+ 교직)
    const $free = $('body').find('.free'); 
        $free.each(function() {
        const text = $(this).text().replace(/\n|\t/g,'').slice(0, 4);
        result.free.push(text);
    })
    // 채플
    const $chapel = $('body').find('.chapel'); 
        $chapel.each(function() {
        const text = $(this).text().replace(/\n|\t/g,'').slice(0, 2);
        result.chapel.push(text);
    })
    // 총합
    const $total = $('body').find('.total'); 
        $total.each(function() {
        const text = $(this).text().replace(/\n|\t/g,'').slice(0, 2);
        result.total.push(text);
    })
    // console.log(result);
    return result;
}



export default getGraduatedCredit;