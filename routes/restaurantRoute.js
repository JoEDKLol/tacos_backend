const express=require('express')
const multer=require('multer')
const restaurantRoute=express.Router()
let getFields=multer()
const Users = require("../models/userSchemas");
const Restaurants = require("../models/restaurantSchemas");
const Hashtags = require("../models/hashtagSchemas");
const commonModules = require("../utils/common");
const jwtModules = require("../utils/jwtmodule");
const { default: mongoose } = require('mongoose')
const db = mongoose.connection;
const sequence = require('../utils/sequences');
const checkAuth = require('../utils/checkAuth');
const { uploadMiddleware } = require('../utils/imgUpload');
const imgbbUploader = require('imgbb-uploader');
const fs = require('fs');

restaurantRoute.get("/searchreslist", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      let restaurantDatas = await Restaurants.find(
          {userseq:request.query.userseq, deleteyn:"n"},
          {_id:0, 
            "userseq":1, 
            "restaurantseq":1, 
            "restaurantname":1, 
            "address":1,
            "img":1,
            "introduction":1, 
          }
      );

      let retObj = [];

      for(let i=0; i<restaurantDatas.length; i++){
        let HashtagsDatas = await Hashtags.find(
          {restaurantseq:restaurantDatas[i].restaurantseq, deleteyn:"n"}, 
          {_id:0, 
            "tagname":1, 
            // "restaurantseq":1, 
          }
        )

        let hashTagArrRes = [];
        for(let j=0; j<HashtagsDatas.length; j++){
          hashTagArrRes.push(HashtagsDatas[j].tagname);
        }
        // console.log(restaurantDatas[i]);
        let obj ={
          userseq:restaurantDatas[i].userseq,
          restaurantseq:restaurantDatas[i].restaurantseq,
          restaurantname:restaurantDatas[i].restaurantname,
          address:restaurantDatas[i].address,
          img:restaurantDatas[i].img,
          introduction:restaurantDatas[i].introduction,
          hashTagArr:hashTagArrRes,
          hashTagList:"", 
          hashtagErrMsg:"", 
        } 
        retObj.push(obj);
        
      }
    
      sendObj = commonModules.sendObjSet("2100", retObj);
        
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2102");
    }
    response.status(500).send(obj);
  }
});

restaurantRoute.post("/restaurantnewsave", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{

      let restaurantDatas = await Restaurants.find(
        {userseq:request.body.userseq, deleteyn:"n"},
      );
      if(restaurantDatas.length > 10){
        sendObj = commonModules.sendObjSet("2114");
      }else{


        
        const restaurantData = await Restaurants.findOne({restaurantname:request.body.restaurantname});
        if(!restaurantData){
        
          const session = await db.startSession();
          session.startTransaction();
        
          const restaurantseq = await sequence.getSequence("restaurant_seq");
          const restaurantseqSaveObj = {
            userseq:request.body.userseq,
            restaurantseq:restaurantseq,
            restaurantname:request.body.restaurantname,
            address:request.body.address,
            img:request.body.img, 
            thumbImg:request.body.thumbImg, 
            introduction:request.body.introduction, 
            hashtags:request.body.hashtags,
            reguser:request.body.email,
            upduser:request.body.email,
          }
          const newRestaurants =new Restaurants(restaurantseqSaveObj);
          let resusers=await newRestaurants.save();
          
          let hashtagObjList = request.body.hashtagArr;
          
          for(let i=0; i<hashtagObjList.length; i++){
            hashtagObjList[i].restaurantseq = restaurantseq;
          }

          let reshashtags=await Hashtags.insertMany(hashtagObjList);

          // 4. commit
          await session.commitTransaction();
          // 5. end Transaction
          session.endSession();

          sendObj = commonModules.sendObjSet("2110");

        }else{
          sendObj = commonModules.sendObjSet("2113");
        }      
      }      
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2112");
    }
    response.status(500).send(obj);
  }
});

restaurantRoute.post("/restaurantupdate", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{

      const session = await db.startSession();
      session.startTransaction();

      let date = new Date().toISOString();

      let updateRestaurants=await Restaurants.updateOne(
        {restaurantseq:request.body.restaurantseq},
        {
          "restaurantname":request.body.restaurantname,
          "address":request.body.address,
          "img":request.body.img, 
          "thumbImg":request.body.thumbImg, 
          "introduction":request.body.introduction,
          "hashtags":request.body.hashtags, 
          "upduser":request.body.user_email,
          "updDate":date,
        }
      );

      let deletehashtags=await Hashtags.deleteMany({
        restaurantseq:request.body.restaurantseq
      });

      let hashtagObjList = request.body.hashtagArr;
      let reshashtags=await Hashtags.insertMany(hashtagObjList);

      // 4. commit
      await session.commitTransaction();
      // 5. end Transaction
      session.endSession();

      sendObj = commonModules.sendObjSet("2140");
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2142");
    }
    response.status(500).send(obj);
  }
});

restaurantRoute.post("/fileUpload", async (request, response) => {
  try {
      let sendObj = {};
      
      let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
      if(!chechAuthRes) throw new Error();

      uploadMiddleware(request, response, async function (err) {
          const retObj = {
              errMassage : ""
          }
          if (err instanceof multer.MulterError) {  
              // console.log(err.message);
              retObj.errMassage = err.message;
              sendObj = commonModules.sendObjSet("2131");

          } else if (err) {      // An unknown error occurred when uploading. 
              retObj.errMassage = err.message;
              sendObj = commonModules.sendObjSet("2131");
          }    // Everything went fine. 
          else {

            const protocol = request.protocol;
            const host = request.hostname;
            const url = request.originalUrl;
            const port = process.env.PORT;
            const fullUrl = `${protocol}://${host}:${port}/`


            let res;
            try{
              res = await imgbbUploader(process.env.IMGBB_KEY, "./uploads/"+request.file.filename);
              const resObj = {
                img_url : res.image.url,
                thumbImg_url : res.thumb.url
              }

              sendObj = commonModules.sendObjSet("2130", resObj);

            }catch(e){
              retObj.errMassage = "imgBB API returned an error";
              sendObj = commonModules.sendObjSet("2131", retObj);
            }
            
            if (fs.existsSync("./uploads/" + request.file.filename)) {
              fs.unlinkSync("./uploads/" + request.file.filename);
            } 
          }

          response.send({
              sendObj
          });

      })

  } catch (error) {

    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2133");
    }
    response.status(500).send(obj);
  }
});

restaurantRoute.post("/restaurantdelete", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{

      let date = new Date().toISOString();
      
     let updateRestaurants=await Restaurants.updateOne(
        {restaurantseq:request.body.restaurantseq},
        {
          "deleteyn":"y",
          "upduser":request.body.user_email,
          "updDate":date,
        }
      );
      sendObj = commonModules.sendObjSet("2150");
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2152");
    }
    response.status(500).send(obj); 
  }
});

restaurantRoute.get("/searchhashtags", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
  
    let HashtagsList = await Hashtags.aggregate([
      {$unwind: "$tagname"},
      {$group: {
        _id: "$tagname",
        count: { $sum: 1 }
      }}, 
      {$sort: { count: -1 }}, 
      { "$limit": 10 }
    ]);

    let hashTagArrRes = [];
    for(let i=0; i<HashtagsList.length; i++){
      hashTagArrRes.push(HashtagsList[i]._id);
    }

    sendObj = commonModules.sendObjSet("2160", hashTagArrRes);
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2162");
    }
    response.status(500).send(obj);
  }
});

restaurantRoute.get("/searchreslisthome", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
  
    let hashTagList = request.query.hashTagList;
    let keyword =  request.query.keyword; 

    const currentPage = request.query.currentPage;
    const pageListCnt = commonModules.homePage
    const skipPage = pageListCnt*(currentPage-1);

    let findCondition = { 
      $and: [
          {deleteyn:'n'},
      ], 
    };
    
    if(hashTagList != null && hashTagList != undefined && hashTagList != ""){
      
      let restaurantSeqListFromHashtages = await Hashtags.find(
        { tagname : {
          $in: hashTagList,
        }}, 
      );


      let resArr = [];   
      for(let i=0; i<restaurantSeqListFromHashtages.length; i++){
        resArr.push(restaurantSeqListFromHashtages[i].restaurantseq);
      }

      findCondition.restaurantseq = {
        $in: resArr,
      }

    }

    const rgx = (pattern) => new RegExp(`.*${pattern}.*`, 'i');
    const searchRgx = rgx(keyword);

  
    if(keyword != null && keyword != undefined && keyword != ""){
      findCondition.$or=[
        {restaurantname:{$regex:searchRgx}},
      ]
    }

    let restaurantsDatas = await Restaurants.find(
      findCondition
    )
    .sort({likeCounts:-1, regdate:-1})
    .lean()
    .skip(skipPage)
    .limit(pageListCnt);

    sendObj = commonModules.sendObjSet("2170", restaurantsDatas);
    
    response.send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2172");
    }
    response.status(500).send(obj);
  }
});

module.exports=restaurantRoute