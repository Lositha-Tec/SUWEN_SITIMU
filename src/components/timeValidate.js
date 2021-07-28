export const timeValidate = () => {
    let nowTime = new Date();
    let targetStart = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), '21', '0', '0').getTime();
    let targetEnd = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() + 1, '06', '0', '0').getTime();
    return targetStart < nowTime.getTime() && targetEnd > nowTime.getTime();
}