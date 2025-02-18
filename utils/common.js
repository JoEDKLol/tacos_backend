
const homePage = 2;
const commentPage = 10;
const replyPage = 5;

function sendObjSet(code, resObj) {
    const obj = {
        // code:code , 
        code:(returnCodeContents(code).length === 0) ? "" : code,
        message:returnCodeContents(code)[0],
        success:returnCodeContents(code)[1],
        resObj:resObj
    }
    return obj;
}

function returnCodeContents(code){
    let arr = [];

    if(code==="1000"){ 
        arr.push("signup success"); 
        arr.push("y"); 
    }

    if(code==="1001"){ 
        arr.push("email duplecate"); 
        arr.push("n"); 
    }

    if(code==="1002"){ 
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="1002"){ 
        arr.push("signin fail"); 
        arr.push("n"); 
    }

    if(code==="1010"){ 
        arr.push("email verify send success"); 
        arr.push("y"); 
    }

    if(code==="1011"){ 
        arr.push("email duplecate"); 
        arr.push("n"); 
    }

    if(code==="1012"){ 
        arr.push("email verify send fail (sendMail)"); 
        arr.push("n"); 
    }

    if(code==="1013"){ 
        arr.push("email verify send fail"); 
        arr.push("n"); 
    }

    if(code==="1014"){ 
        arr.push("email verify invalid (3 minutes or more)"); 
        arr.push("n"); 
    }

    if(code==="1020"){ 
        arr.push("verify number success"); 
        arr.push("y"); 
    }

    if(code==="1021"){ 
        arr.push("verify number invalid"); 
        arr.push("n"); 
    }

    if(code==="1022"){ 
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="1030"){ 
        arr.push("email for password send success"); 
        arr.push("y"); 
    }
    
    if(code==="1031"){ 
        arr.push("No email for password"); 
        arr.push("n"); 
    }

    if(code==="1032"){ 
        arr.push("email for password send fail (sendMail)"); 
        arr.push("n"); 
    }

    if(code==="1033"){ 
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="1034"){ 
        arr.push("email verify invalid (3 minutes or more)"); 
        arr.push("n"); 
    }

    if(code==="1040"){ 
        arr.push("password changed success"); 
        arr.push("y"); 
    }

    if(code==="1041"){ 
        arr.push("password changed failed"); 
        arr.push("n"); 
    }

    if(code==="1043"){ 
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="1050"){ 
        arr.push("signin success"); 
        arr.push("y"); 
    }

    if(code==="1051"){ 
        arr.push("signin failed"); 
        arr.push("n"); 
    }

    if(code==="1052"){ 
        arr.push("Login Attempts Exceeded"); 
        arr.push("n"); 
    }

    if(code==="2000"){
        arr.push("request access-token success"); 
        arr.push("y"); 
    }

    if(code==="2001"){
        arr.push("request access-token failed"); 
        arr.push("n"); 
    }

    if(code==="2002"){
        arr.push("request access-token failed-refreshTokenError"); 
        arr.push("n"); 
    }

    if(code==="2010"){
        arr.push("request access-token-check success"); 
        arr.push("y"); 
    }

    if(code==="2011"){
        arr.push("request access-token-check failed"); 
        arr.push("n"); 
    }

    if(code==="2020"){
        arr.push("request logout success"); 
        arr.push("y"); 
    }

    if(code==="2021"){
        arr.push("request logout failed"); 
        arr.push("n"); 
    }

    if(code==="2022"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2100"){
        arr.push("search restaurants list success"); 
        arr.push("y"); 
    }

    if(code==="2101"){
        arr.push("search restaurants list failed"); 
        arr.push("n"); 
    }

    if(code==="2102"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2110"){
        arr.push("restaurants new save success"); 
        arr.push("y"); 
    }

    if(code==="2111"){
        arr.push("restaurants new save failed"); 
        arr.push("n"); 
    }

    if(code==="2112"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2113"){
        arr.push("restaurants name duplication"); 
        arr.push("n"); 
    }

    if(code==="2114"){
        arr.push("Number of registrations exceeded"); 
        arr.push("n"); 
    }

    if(code==="2130"){
        arr.push("imgUpload success"); 
        arr.push("y"); 
    }

    if(code==="2131"){
        arr.push("imgUpload fail"); 
        arr.push("n"); 
    }

    if(code==="2132"){
        arr.push("imgUpload imgbb fail"); 
        arr.push("n"); 
    }

    if(code==="2133"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2140"){
        arr.push("restaurants update success"); 
        arr.push("y"); 
    }

    if(code==="2141"){
        arr.push("restaurants update failed"); 
        arr.push("n"); 
    }

    if(code==="2142"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2150"){
        arr.push("restaurants delete success"); 
        arr.push("y"); 
    }

    if(code==="2151"){
        arr.push("restaurants delete failed"); 
        arr.push("n"); 
    }

    if(code==="2152"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2160"){
        arr.push("hashTagList search success"); 
        arr.push("y"); 
    }

    if(code==="2161"){
        arr.push("hashTagList search failed"); 
        arr.push("n"); 
    }

    if(code==="2162"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2170"){
        arr.push("searchreslisthome search success"); 
        arr.push("y"); 
    }

    if(code==="2171"){
        arr.push("searchreslisthome search failed"); 
        arr.push("n"); 
    }

    if(code==="2172"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    


    

    return arr
}

const getRandomNumber = (n) => {

    let retNum = "";
    for (let i = 0; i < n; i++) {
        retNum += Math.floor(Math.random() * 10)
    }
    return retNum;

}



module.exports.sendObjSet = sendObjSet;
module.exports.getRandomNumber = getRandomNumber;
module.exports.homePage = homePage;
module.exports.commentPage = commentPage;
module.exports.replyPage = replyPage;

