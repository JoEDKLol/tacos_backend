
const homePage = 5;
const commentPage = 5;
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

    if(code==="2180"){
        arr.push("hearder layout save success"); 
        arr.push("y"); 
    }

    if(code==="2181"){
        arr.push("hearder layout save failed"); 
        arr.push("n"); 
    }

    if(code==="2182"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2190"){
        arr.push("hearder layout search success"); 
        arr.push("y"); 
    }

    if(code==="2191"){
        arr.push("hearder layout search failed"); 
        arr.push("n"); 
    }

    if(code==="2192"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2200"){
        arr.push("home layout save success"); 
        arr.push("y"); 
    }

    if(code==="2201"){
        arr.push("home layout save failed"); 
        arr.push("n"); 
    }

    if(code==="2202"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2210"){
        arr.push("home layout search success"); 
        arr.push("y"); 
    }

    if(code==="2211"){
        arr.push("home layout search failed"); 
        arr.push("n"); 
    }

    if(code==="2212"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2220"){
        arr.push("restaurant layout search success"); 
        arr.push("y"); 
    }

    if(code==="2221"){
        arr.push("restaurant layout search failed"); 
        arr.push("n"); 
    }

    if(code==="2222"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2230"){
        arr.push("about layout save success"); 
        arr.push("y"); 
    }

    if(code==="2231"){
        arr.push("about layout save failed"); 
        arr.push("n"); 
    }

    if(code==="2232"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2240"){
        arr.push("about layout search success"); 
        arr.push("y"); 
    }

    if(code==="2241"){
        arr.push("about layout search failed"); 
        arr.push("n"); 
    }

    if(code==="2242"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2250"){
        arr.push("comment save success"); 
        arr.push("y"); 
    }

    if(code==="2251"){
        arr.push("comment save  failed"); 
        arr.push("n"); 
    }

    if(code==="2252"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2260"){
        arr.push("comment search success"); 
        arr.push("y"); 
    }

    if(code==="2261"){
        arr.push("comment search  failed"); 
        arr.push("n"); 
    }

    if(code==="2262"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2270"){
        arr.push("comment update success"); 
        arr.push("y"); 
    }

    if(code==="2271"){
        arr.push("comment update  failed"); 
        arr.push("n"); 
    }

    if(code==="2272"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2280"){
        arr.push("comment update success"); 
        arr.push("y"); 
    }

    if(code==="2281"){
        arr.push("comment update  failed"); 
        arr.push("n"); 
    }

    if(code==="2282"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2290"){
        arr.push("restaurant like update success"); 
        arr.push("y"); 
    }

    if(code==="2291"){
        arr.push("restaurant like update failed"); 
        arr.push("n"); 
    }

    if(code==="2292"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2300"){
        arr.push("restaurant like search success"); 
        arr.push("y"); 
    }

    if(code==="2301"){
        arr.push("restaurant like search failed"); 
        arr.push("n"); 
    }

    if(code==="2302"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2310"){
        arr.push("user update success"); 
        arr.push("y"); 
    }

    if(code==="2311"){
        arr.push("user update failed"); 
        arr.push("n"); 
    }

    if(code==="2312"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2320"){
        arr.push("user search success"); 
        arr.push("y"); 
    }

    if(code==="2321"){
        arr.push("user search failed"); 
        arr.push("n"); 
    }

    if(code==="2322"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2330"){
        arr.push("comment next search success"); 
        arr.push("y"); 
    }

    if(code==="2331"){
        arr.push("comment next failed"); 
        arr.push("n"); 
    }

    if(code==="2332"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2340"){
        arr.push("menu layout search success"); 
        arr.push("y"); 
    }

    if(code==="2341"){
        arr.push("menu layout search failed"); 
        arr.push("n"); 
    }

    if(code==="2342"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2350"){
        arr.push("menu layout save success"); 
        arr.push("y"); 
    }

    if(code==="2351"){
        arr.push("menu layout save failed"); 
        arr.push("n"); 
    }

    if(code==="2352"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2360"){
        arr.push("category save success"); 
        arr.push("y"); 
    }

    if(code==="2361"){
        arr.push("category save failed"); 
        arr.push("n"); 
    }

    if(code==="2362"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2370"){
        arr.push("category search success"); 
        arr.push("y"); 
    }

    if(code==="2371"){
        arr.push("category search failed"); 
        arr.push("n"); 
    }

    if(code==="2372"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2380"){
        arr.push("category update success"); 
        arr.push("y"); 
    }

    if(code==="2381"){
        arr.push("category update failed"); 
        arr.push("n"); 
    }

    if(code==="2382"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2390"){
        arr.push("category delete success"); 
        arr.push("y"); 
    }

    if(code==="2391"){
        arr.push("category delete failed"); 
        arr.push("n"); 
    }

    if(code==="2392"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2400"){
        arr.push("menu save success"); 
        arr.push("y"); 
    }

    if(code==="2401"){
        arr.push("menu save failed"); 
        arr.push("n"); 
    }

    if(code==="2402"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2410"){
        arr.push("menu search success"); 
        arr.push("y"); 
    }

    if(code==="2411"){
        arr.push("menu search failed"); 
        arr.push("n"); 
    }

    if(code==="2412"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2420"){
        arr.push("menu update success"); 
        arr.push("y"); 
    }

    if(code==="2421"){
        arr.push("menu update failed"); 
        arr.push("n"); 
    }

    if(code==="2422"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2430"){
        arr.push("category search success"); 
        arr.push("y"); 
    }

    if(code==="2431"){
        arr.push("category search failed"); 
        arr.push("n"); 
    }

    if(code==="2432"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2440"){
        arr.push("Image save success"); 
        arr.push("y"); 
    }

    if(code==="2441"){
        arr.push("Image save failed"); 
        arr.push("n"); 
    }

    if(code==="2442"){
        arr.push("Internal Server Error"); 
        arr.push("n"); 
    }

    if(code==="2450"){
        arr.push("Image delete success"); 
        arr.push("y"); 
    }

    if(code==="2451"){
        arr.push("Image delete failed"); 
        arr.push("n"); 
    }

    if(code==="2452"){
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

