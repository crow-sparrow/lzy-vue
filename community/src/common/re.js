const telRe1=function(obj){
    let re = /^(\d{3})-(\d{3})-(\d{4})$/;
    return re.test(obj);
};
const telRe2=function(obj){
    let re =/^1[345789]\d{9}$///手机
    return re.test(obj)
}
const price1=function(obj){
    let re = /^(\d)+(元\/桶)$///价格
    return re.test(obj)
}
const price2=function(obj){
    let re = /^(\d)+(元\/小时)/
    return re.test(obj)
}
const age=function(obj){
    let re = /^(?:0|[1-9][0-9]?|100)$///年龄
    return re.test(obj)
}
const experience=function(obj){
    let re = /^\d+年$/
    return re.test(obj)
}
export default {
    telRe1,
    telRe2,
    price1,
    price2,
    age,
    experience
}