// 工具js文件

// 获取中国时区时间
// 传入UTC字符串时间 || 传入时间对象
export let getChinatime = (utctime) => {

    let date = (typeof utctime == 'string' ? new Date(utctime) : utctime)


    //补0
    let Month = date.getMonth() + 1;
    let Datea = date.getDate();
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    let Seconds = date.getSeconds();
    String(Month).length < 2 ? (Month = "0" + Month) : Month;
    String(Datea).length < 2 ? (Datea = "0" + Datea) : Datea;
    String(Hours).length < 2 ? (Hours = "0" + Hours) : Hours;
    String(Minutes).length < 2 ? (Minutes = "0" + Minutes) : Minutes;
    String(Seconds).length < 2 ? (Seconds = "0" + Seconds) : Seconds;

    return date.getFullYear() + '-' + Month + '-' + Datea + ' ' + Hours + ":" + Minutes + ":" + Seconds


}