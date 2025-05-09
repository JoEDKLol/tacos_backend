const express=require('express')
const multer=require('multer')
const userRoute=express.Router()
let getFields=multer()
const Users = require("../models/userSchemas");
const EmailVerifications = require("../models/emailVerificationSchemas");
const commonModules = require("../utils/common");
const jwtModules = require("../utils/jwtmodule");
const { default: mongoose } = require('mongoose')
const db = mongoose.connection;
const sequence = require("../utils/sequences");
const { sendEmail } = require('../utils/sendMail');
const RestaurantLikes = require("../models/restaurantLikeSchemas");
const checkAuth = require('../utils/checkAuth');
const Comments = require("../models/commentSchemas");

userRoute.post("/signup", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let userData = await Users.findOne({email:request.body.email});
    if(!userData){
      const userseq = await sequence.getSequence("tacos_user_seq");

      const userObj = {
        userseq:userseq,
        email:request.body.email,
        password:request.body.password,
        reguser:request.body.email,
        upduser:request.body.email
      }

      const newUsers =new Users(userObj);
      let resusers=await newUsers.save();

      sendObj = commonModules.sendObjSet("1000");
    }else{
      sendObj = commonModules.sendObjSet("1001");
    }
      
    
    response.status(200).send({
        sendObj
    });

  } catch (error) {
    response.status(500).send(commonModules.sendObjSet("1002", error));
  }
});

userRoute.post("/sendemail", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};

    
    let userData = await Users.findOne({email:request.body.email});
    if(userData){
      sendObj = commonModules.sendObjSet("1011");
    }else{ //verify numbers send
      //time to send email check 
      let emailVerifyData = await EmailVerifications.aggregate(
        [{$match:{ "email":request.body.email}},
        {$project: { "email": 1, "regdate": 1 }},
        {$sort:{_id:-1}},
        {$limit:1}
        ]   
      );
      if(emailVerifyData[0]){
        const searchDate = new Date(emailVerifyData[0].regdate)
        const currentDate = new Date();
        const diffMSec = currentDate.getTime() - searchDate.getTime()
        const diffMin = diffMSec / (1000);
        if(diffMin < 180){ //under 3 minutes
          sendObj = commonModules.sendObjSet("1014");
        }else{
          const sendEmailAdrr = request.body.email;
          const verifyNum = commonModules.getRandomNumber(6);
          const emailSendYn = await sendEmail(sendEmailAdrr, verifyNum);
          if(emailSendYn){
            //startTransaction
            const session = await db.startSession();
            session.startTransaction();
            // const userseq = await sequence.getSequence("tacos_user_seq");
            const emailVObj = {
              // userseq:userseq,
              email:sendEmailAdrr,
              verifynumber:verifyNum,
              reguser:sendEmailAdrr,
              upduser:sendEmailAdrr,
            }
            await EmailVerifications.deleteMany({
              email:sendEmailAdrr
            });
            const newEmailVerifications = new EmailVerifications(emailVObj);
            await newEmailVerifications.save();

            // 4. commit
            await session.commitTransaction();
            // 5. end Transaction
            session.endSession();

            sendObj = commonModules.sendObjSet("1010");
          }else{
            sendObj = commonModules.sendObjSet("1012");
            throw new Error(sendObj.code);
          }
        }
      }else{
        const sendEmailAdrr = request.body.email;
        const verifyNum = commonModules.getRandomNumber(6);
        const emailSendYn = await sendEmail(sendEmailAdrr, verifyNum);
        if(emailSendYn){
          //startTransaction
          const session = await db.startSession();
          session.startTransaction();
          // const userseq = await sequence.getSequence("tacos_user_seq");
          const emailVObj = {
            // userseq:userseq,
            email:sendEmailAdrr,
            verifynumber:verifyNum,
            reguser:sendEmailAdrr,
            upduser:sendEmailAdrr,
          }
          await EmailVerifications.deleteMany({
            email:sendEmailAdrr
          });
          const newEmailVerifications = new EmailVerifications(emailVObj);
          await newEmailVerifications.save();

          // 4. commit
          await session.commitTransaction();
          // 5. end Transaction
          session.endSession();

          sendObj = commonModules.sendObjSet("1010");
        }else{
          sendObj = commonModules.sendObjSet("1012");
          throw new Error(sendObj.code);
        }



      }
    }

    response.status(200).send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message);
    if(obj.code === ""){
      obj = commonModules.sendObjSet("1013");
    }
    response.status(500).send(obj);
  }
});


userRoute.get("/checkverifynumber", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};    

    const resCheckNumber = await EmailVerifications.find({
      email:request.query.email,
      verifynumber:request.query.verifynumber
    })

    if(resCheckNumber.length > 0){
      sendObj = commonModules.sendObjSet("1020");
    }else{
      sendObj = commonModules.sendObjSet("1021");
    }

    response.status(200).send({
        sendObj
    });

  } catch (error) {
    response.status(500).send(commonModules.sendObjSet("1022", error));
  }
});

userRoute.post("/sendemailforpassword", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};

    let userData = await Users.findOne({email:request.body.email});
    if(!userData){
      sendObj = commonModules.sendObjSet("1031");
    }else{ //verify numbers send

      //time to send email check 
      let emailVerifyData = await EmailVerifications.aggregate(
        [{$match:{ "email":request.body.email}},
        {$project: { "email": 1, "regdate": 1 }},
        {$sort:{_id:-1}},
        {$limit:1}
        ]   
      );
      if(emailVerifyData[0]){
        const searchDate = new Date(emailVerifyData[0].regdate)
        const currentDate = new Date();
        const diffMSec = currentDate.getTime() - searchDate.getTime()
        const diffMin = diffMSec / (1000);
        if(diffMin < 180){ //under 3 minutes
          sendObj = commonModules.sendObjSet("1034");
        }else{
          const sendEmailAdrr = request.body.email;
          const verifyNum = commonModules.getRandomNumber(6);
          const emailSendYn = await sendEmail(sendEmailAdrr, verifyNum);
          if(emailSendYn){
            //startTransaction
            const session = await db.startSession();
            session.startTransaction();

            const emailVObj = {
                email:sendEmailAdrr,
                verifynumber:verifyNum,
                reguser:sendEmailAdrr,
                upduser:sendEmailAdrr,
            }
            await EmailVerifications.deleteMany({
              email:sendEmailAdrr
            });
            const newEmailVerifications = new EmailVerifications(emailVObj);
            await newEmailVerifications.save();

            // 4. commit
            await session.commitTransaction();
            // 5. end Transaction
            session.endSession();

            sendObj = commonModules.sendObjSet("1030");
          }else{
            sendObj = commonModules.sendObjSet("1032");
            throw new Error(sendObj.code);
          }
        }
      }
    }

    response.status(200).send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message); //code
    if(obj.code === ""){
      obj = commonModules.sendObjSet("1033");
    }
    response.status(500).send(obj);
  }
});

userRoute.post("/changepassword", getFields.none(), async (request, response) => {
  let sendObj = {};
  try{
    let date = new Date().toISOString();
    let upRes = await Users.updateOne(
        {email:request.body.email},
        {  
            "password":request.body.password, 
            "loginAttemptsCnt":0,
            "upddate":date,
            "updUser":request.body.email
        }
    )    
    if(upRes.modifiedCount > 0){
        sendObj = commonModules.sendObjSet("1040");
    }else{
        sendObj = commonModules.sendObjSet("1041");
    }

    response.status(200).send({
        sendObj
    });

  }catch(error){
    response.status(500).send(commonModules.sendObjSet("1042", error));
  }
});

userRoute.post("/signin", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let userData = await Users.findOne({email:request.body.email});
    let resLikeArr = [];
    if(userData){
      resLikeArr = await RestaurantLikes.find({userseq:userData.userseq});
    }
    

    if(!userData){
        sendObj = commonModules.sendObjSet("1051");
    }
    
    if(userData){
      //password compare
      let res = await userData.comparePassword(request.body.password);
      
      if(!res){ //패스워드 인증 실패시 로그인 시도횟수가 10미만이면 시도횟수 증가
        if(userData.loginattemptscnt >= 10){
            sendObj = commonModules.sendObjSet("1051");
        }else{
            let upRes = await Users.updateOne({_id:userData._id}
                ,{"loginattemptscnt":userData.loginattemptscnt+1})
            sendObj = commonModules.sendObjSet("1051");
        }
      }else{

        if(userData.loginattemptscnt >= 10){ //로그인 시도횟수가 10이상이면 비밀번호 변경 해야 한다.
            sendObj = commonModules.sendObjSet("1052");
        }else{ 
          //로그인성공시 토큰 발급해준다. 
          //로그인 시도 횟수 초기화
          //01. 리프레쉬토큰은 header에 발급
          if(userData.loginattemptscnt > 0){
            let upRes = await Users.updateOne({_id:userData._id}
            ,{"loginattemptscnt":0})
          }

         

          const refreshtoken = jwtModules.retFreshToken(userData._id, userData.email);
          const userObj = {
              id:userData._id,
              email:userData.email,
              userseq:userData.userseq, 
              likesArr : resLikeArr
          }
          response.setHeader("refreshtoken", refreshtoken);
          sendObj = commonModules.sendObjSet("1050", userObj);
        }
      }

    }
    response.status(200).send({
        sendObj
    });

  } catch (error) {
      response.status(500).send(commonModules.sendObjSet("1051", error));
      
  }
});

userRoute.post("/googlesignin", getFields.none(), async (request, response) => {
  
  try {

      let sendObj = {};
      
      let userData = await Users.findOne({email:request.body.email});
      let resLikeArr = [];
      if(userData){
        resLikeArr = await RestaurantLikes.find({userseq:userData.userseq});
      }
      

      if(!userData){ //new user register

        

        let userEmail = request.body.email;

        const session = await db.startSession();
        session.startTransaction();

        const userseq = await sequence.getSequence("tacos_user_seq");
        const userSaveObj = {
          userseq:userseq,
          email:userEmail,
          password:userEmail,
          reguser:userEmail,
          upduser:userEmail,
        }

        const newUsers =new Users(userSaveObj);
        let resusers=await newUsers.save();

        // 4. commit
        await session.commitTransaction();
        // 5. end Transaction
        session.endSession();

        
        const refreshtoken = jwtModules.retFreshToken(resusers._id, resusers.email);
        const userObj = {
            id:resusers._id,
            email:resusers.email,
            userseq:userseq, 
            likesArr : resLikeArr
        }
        response.setHeader("refreshtoken", refreshtoken);
        sendObj = commonModules.sendObjSet("1050", userObj);
          
      }else{

        const refreshtoken = jwtModules.retFreshToken(userData._id, userData.email);
        const userObj = {
            id:userData._id,
            email:userData.email,
            userseq:userData.userseq, 
            likesArr : resLikeArr
        }
        response.setHeader("refreshtoken", refreshtoken);
        sendObj = commonModules.sendObjSet("1050", userObj);
      }
      response.status(200).send({
          sendObj
      });


  }catch (error) {
    response.status(500).send(commonModules.sendObjSet("1051", error));
  }

});

userRoute.get("/getAccessToken", getFields.none(), async (request, response) => {
  let sendObj = {};
  try {
      if(request.cookies.refreshtoken){
          const refreshtoken = jwtModules.checkRefreshToken(request.cookies.refreshtoken);
          if(refreshtoken){
              let userData = await Users.findOne({email:refreshtoken.email});
              let resLikeArr = [];
              if(userData){
                resLikeArr = await RestaurantLikes.find({userseq:userData.userseq});
              }
              
              if(userData){
                  const userObj = {
                    id:userData._id, 
                    email:userData.email, 
                    userseq:userData.userseq,
                    likesArr : resLikeArr
                  }
                  sendObj = commonModules.sendObjSet("2000", userObj);
                  const accesstoken = jwtModules.retAccessToken(userData._id, userData.email);
                  response.setHeader("accesstoken", accesstoken);
              }else{
                  sendObj = commonModules.sendObjSet("2001", userObj);
              }
          }
      }else{
          sendObj = commonModules.sendObjSet("2002", {});
      }

      response.send({sendObj});
  } catch (error) {
      response.status(500).send(commonModules.sendObjSet("2002", error));
      
  }
});

userRoute.post("/checkaccessToken", getFields.none(), async (request, response) => {
  let sendObj = {};
  try {
      if(request.headers.accesstoken){
          const accessToken = jwtModules.checkAccessToken(request.headers.accesstoken);
          
          if(accessToken){
              let userData = await Users.findOne({email:accessToken.email});
              let resLikeArr = [];
              if(userData){
                resLikeArr = await RestaurantLikes.find({userseq:userData.userseq});
              }

              if(userData){
                  const userObj = {
                    id:userData._id, 
                    email:userData.email,
                    userseq:userData.userseq,
                    likesArr : resLikeArr
                  }
                  sendObj = commonModules.sendObjSet("2010", userObj);
                  
              }else{
                  sendObj = commonModules.sendObjSet("2011", {});
              }
          }else{
              sendObj = commonModules.sendObjSet("2011", {});
          }

      }

      response.send({sendObj});

  } catch (error) {
      response.status(500).send(commonModules.sendObjSet("2011", error));
  }
});

userRoute.get("/logout", getFields.none(), async (request, response) => {
  
  let sendObj = {};
  try {
      const refreshToken = jwtModules.checkRefreshToken(request.cookies.refreshtoken);

      if(refreshToken === false){
          sendObj = commonModules.sendObjSet("2021");
      }else{
          response.clearCookie('refreshtoken');
          sendObj = commonModules.sendObjSet("2020");
      }
      
      response.send({sendObj});

  } catch (error) {

      response.status(500).send(commonModules.sendObjSet("2022", error));
  }
});


userRoute.post("/userupdate", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{

      let date = new Date().toISOString();

      let updateUsers=await Users.updateOne(
        {
          userseq:request.body.userseq, 
        },
        {
          "username":request.body.username,
          "userimg":request.body.userimg,
          "userthumbImg":request.body.userthumbImg,
          "upduser":request.body.email,
          "upddate":date,
        }
      );

      sendObj = commonModules.sendObjSet("2310");
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2312");
    }
    response.status(500).send(obj);
  }
});

userRoute.get("/searchuser", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      const searchListCnt = commonModules.commentPage;
      const searchUser=await Users.findOne(
        {
          userseq:request.query.userseq, 
        },
        {
          _id:1,
          "username":1,
          "userimg":1,
          "userthumbImg":1,
        }
      );

      const searchComment = await Comments.find(
        {userinfo:searchUser._id}
      ).sort({commentseq:-1})
      .limit(searchListCnt)
      .populate('restaurantinfo', { 
        _id:0, 
        restaurantname:1, 
        address : 1, 
        img:1, 
        thumbImg:1, 
        introduction : 1, 
        hashtags : 1, 
        latLng : 1, 
        deleteyn : 1
      }).exec();

      const commentCnt = await Comments.find(
        {userinfo:searchUser._id}
      ).countDocuments();

      // const commentCnt = searchComment.count();

      const searchLike = await RestaurantLikes.find(
        {userseq:request.query.userseq, likeyn:"y"}
      ).sort({regdate:-1})
      .limit(searchListCnt)
      .populate('restaurantinfo', { 
        _id:0, 
        restaurantname:1, 
        address : 1, 
        img:1, 
        thumbImg:1, 
        introduction : 1, 
        hashtags : 1, 
        latLng : 1
      }).exec();

      const likeCnt = await RestaurantLikes.find(
        {userseq:request.query.userseq, likeyn:"y"}
      ).countDocuments();
      // const likeCnt = searchLike.count();

      const resObj = {
        searchUser:searchUser,
        searchComment:searchComment,
        searchLike:searchLike
      }

      if(searchComment.length > 0){
        resObj.lastCommentSeq = searchComment[searchComment.length-1].commentseq
      }else{
        resObj.lastCommentSeq = 0;
      }

      if(searchLike.length > 0){
        resObj.lastLikeSeq = searchLike[searchLike.length-1].restaurantlikeseq
      }else{
        resObj.lastLikeSeq = 0;
      }

      resObj.commentsCnt = commentCnt;
      resObj.likesCnt = likeCnt;


      sendObj = commonModules.sendObjSet("2320", resObj);
    }

    response.send({
        sendObj
    });

  } catch (error) {
    
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2322");
    }
    response.status(500).send(obj);
  }
});

userRoute.get("/searchnextcomment", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      const searchListCnt = commonModules.commentPage;
      const currentSeq = Number(request.query.currentSeq);
      const userid = request.query.userid;


      const searchComment = await Comments.find(
        {userinfo:userid, commentseq : {"$lt":currentSeq}}
      ).sort({commentseq:-1})
      .limit(searchListCnt)
      .populate('restaurantinfo', { 
        _id:0, 
        restaurantname:1, 
        address : 1, 
        img:1, 
        thumbImg:1, 
        introduction : 1, 
        hashtags : 1, 
        latLng : 1, 
        deleteyn : 1
      }).exec();

      const resObj = {
        comments:searchComment,
      }

      if(searchComment.length > 0){
        resObj.lastCommentSeq = searchComment[searchComment.length-1].commentseq
      }

      sendObj = commonModules.sendObjSet("2330", resObj);
    }

    response.send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2332");
    }
    response.status(500).send(obj);
  }
});

userRoute.get("/searchnextlike", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      const searchListCnt = commonModules.commentPage;
      const currentSeq = Number(request.query.currentSeq);
      const userseq = request.query.userseq;

      const searchLike = await RestaurantLikes.find(
        {userseq:userseq, likeyn:"y", restaurantlikeseq : {"$lt":currentSeq}}
      ).sort({commentseq:-1})
      .limit(searchListCnt)
      .populate('restaurantinfo', { 
        _id:0, 
        restaurantname:1, 
        address : 1, 
        img:1, 
        thumbImg:1, 
        introduction : 1, 
        hashtags : 1, 
        latLng : 1, 
        deleteyn : 1
      }).exec();

      const resObj = {
        likes:searchLike,
      }

      if(searchLike.length > 0){
        resObj.lastLikeSeq = searchLike[searchLike.length-1].restaurantlikeseq
      }

      sendObj = commonModules.sendObjSet("2330", resObj);
    }

    response.send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message); //code
    if(obj.code === ""){
      obj = commonModules.sendObjSet("2332");
    }
    response.status(500).send(obj);
  }
});

userRoute.get("/searchprofile", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    
      const searchListCnt = commonModules.commentPage;
      const searchUser=await Users.findOne(
        {
          _id:request.query._id, 
        },
        {
          _id:1,
          "userseq":1, 
          "username":1,
          "userimg":1,
          "userthumbImg":1,
        }
      );

      const searchComment = await Comments.find(
        {userinfo:searchUser._id}
      ).sort({commentseq:-1})
      .limit(searchListCnt)
      .populate('restaurantinfo', { 
        _id:0, 
        restaurantname:1, 
        address : 1, 
        img:1, 
        thumbImg:1, 
        introduction : 1, 
        hashtags : 1, 
        latLng : 1, 
        deleteyn : 1
      }).exec();

      const commentCnt = await Comments.find(
        {userinfo:searchUser._id}
      ).countDocuments();

      // const commentCnt = searchComment.count();

      const searchLike = await RestaurantLikes.find(
        {userseq:searchUser.userseq, likeyn:"y"}
      ).sort({regdate:-1})
      .limit(searchListCnt)
      .populate('restaurantinfo', { 
        _id:0, 
        restaurantname:1, 
        address : 1, 
        img:1, 
        thumbImg:1, 
        introduction : 1, 
        hashtags : 1, 
        latLng : 1
      }).exec();

      const likeCnt = await RestaurantLikes.find(
        {userseq:searchUser.userseq, likeyn:"y"}
      ).countDocuments();
      // const likeCnt = searchLike.count();

      const resObj = {
        searchUser:searchUser,
        searchComment:searchComment,
        searchLike:searchLike
      }

      if(searchComment.length > 0){
        resObj.lastCommentSeq = searchComment[searchComment.length-1].commentseq
      }else{
        resObj.lastCommentSeq = 0;
      }

      if(searchLike.length > 0){
        resObj.lastLikeSeq = searchLike[searchLike.length-1].restaurantlikeseq
      }else{
        resObj.lastLikeSeq = 0;
      }

      resObj.commentsCnt = commentCnt;
      resObj.likesCnt = likeCnt;


      sendObj = commonModules.sendObjSet("2320", resObj);
    

    response.send({
        sendObj
    });

  } catch (error) {
    
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2322");
    }
    response.status(500).send(obj);
  }
});





module.exports=userRoute