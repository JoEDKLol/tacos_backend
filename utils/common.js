
const mainBoardSPage = 12;
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
module.exports.mainBoardSPage = mainBoardSPage;
module.exports.commentPage = commentPage;
module.exports.replyPage = replyPage;

