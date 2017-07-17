export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function priceFormat(input) {
    input = parseInt(input)
    if(!input){
        return input
    }
    if(input < 1){
        return input
    }
    if(input > 1000){}

}

export function toThousands(num) {
    num = (num || 0).toString()
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

export function calcTime(timeStamp) {
    if(!timeStamp) return ''
    timeStamp = timeStamp / 1000
    const day = 86400, hour = 3600, minute = 60, second = 1
    let days = Math.floor(timeStamp / day)
        timeStamp = timeStamp - days * day
    let hours = Math.floor(timeStamp / hour)
        timeStamp = timeStamp - hours * hour
    let  minutes = Math.floor(timeStamp / minute)
        timeStamp = timeStamp - minutes * minute
    let seconds = Math.floor(timeStamp / second)
    return `${days}天${hours}小时${minutes}分${seconds}秒`
}