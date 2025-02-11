const express=require('express')
const multer=require('multer')
const userRoute=express.Router()
let getFields=multer()
const Users = require("../models/userSchemas");
// const BlogInfos = require("../models/blogInfoSchemas");
const EmailVerifications = require("../models/emailVerificationSchemas");
const ObjectId = require("mongoose").Types.ObjectId;
const commonModules = require("../utils/common");
// const jwtModules = require("../utils/jwtmodule");
const { default: mongoose } = require('mongoose')
const db = mongoose.connection;
const sequence = require("../utils/sequences");
const { sendEmail } = require('../utils/sendMail');


userRoute.post("/signup", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let userData = await Users.findOne({email:request.body.email});
    if(!userData){
      const userObj = {
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

            sendObj = commonModules.sendObjSet("1010");
          }else{
            sendObj = commonModules.sendObjSet("1012");
            throw new Error(sendObj.code);
          }
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
    let obj = commonModules.sendObjSet(error.message);
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
            "updDate":date,
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



module.exports=userRoute