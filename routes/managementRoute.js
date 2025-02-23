const express=require('express')
const multer=require('multer')
const managementRoute=express.Router()
let getFields=multer()
const Users = require("../models/userSchemas");
const Restaurants = require("../models/restaurantSchemas");
const commonModules = require("../utils/common");
const { default: mongoose } = require('mongoose')
const db = mongoose.connection;
const sequence = require('../utils/sequences');
const checkAuth = require('../utils/checkAuth');
const { uploadMiddleware } = require('../utils/imgUpload');
const imgbbUploader = require('imgbb-uploader');
const fs = require('fs');

managementRoute.post("/heardersave", getFields.none(), async (request, response) => {

  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{

      let restaurantDatas = await Restaurants.findOne(
        {userseq:request.body.userseq,restaurantname:request.body.restaurantname,deleteyn:"n"},
      );

      if(restaurantDatas){
        let date = new Date().toISOString();
        let updateRestaurants=await Restaurants.updateOne(
          {
            restaurantname:request.body.restaurantname, 
            userseq:request.body.userseq
          },
          {
            "header":request.body.header, 
            "upduser":request.body.email,
            "upddate":date,
          }
        );
        sendObj = commonModules.sendObjSet("2180");
      }else{
        sendObj = commonModules.sendObjSet("2181"); 
      }
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2182");
    }
    response.status(500).send(obj);
  }
});

managementRoute.get("/hearderlayoutsearch", getFields.none(), async (request, response) => {

  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      let restaurantDatas = await Restaurants.findOne(
        {userseq:request.query.userseq,restaurantname:request.query.restaurantname,deleteyn:"n"},
      );

      if(restaurantDatas){
        sendObj = commonModules.sendObjSet("2190", restaurantDatas);
      }else{
        sendObj = commonModules.sendObjSet("2191");
      }

       
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2192");
    }
    response.status(500).send(obj);
  }
});

managementRoute.post("/homesave", getFields.none(), async (request, response) => {

  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{

      let restaurantDatas = await Restaurants.findOne(
        {userseq:request.body.userseq,restaurantname:request.body.restaurantname,deleteyn:"n"},
      );

      if(restaurantDatas){
        let date = new Date().toISOString();
        let updateRestaurants=await Restaurants.updateOne(
          {
            restaurantname:request.body.restaurantname, 
            userseq:request.body.userseq
          },
          {
            "home":request.body.home, 
            "upduser":request.body.email,
            "upddate":date,
          }
        );
        sendObj = commonModules.sendObjSet("2200");
      }else{
        sendObj = commonModules.sendObjSet("2201"); 
      }
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2202");
    }
    response.status(500).send(obj);
  }
});

managementRoute.get("/homelayoutsearch", getFields.none(), async (request, response) => {

  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      let restaurantDatas = await Restaurants.findOne(
        {userseq:request.query.userseq,restaurantname:request.query.restaurantname,deleteyn:"n"},
      );

      if(restaurantDatas){
        sendObj = commonModules.sendObjSet("2210", restaurantDatas);
      }else{
        sendObj = commonModules.sendObjSet("2211");
      }

       
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2212");
    }
    response.status(500).send(obj);
  }
});

managementRoute.post("/aboutsave", getFields.none(), async (request, response) => {

  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{

      let restaurantDatas = await Restaurants.findOne(
        {userseq:request.body.userseq,restaurantname:request.body.restaurantname,deleteyn:"n"},
      );

      if(restaurantDatas){
        let date = new Date().toISOString();
        let updateRestaurants=await Restaurants.updateOne(
          {
            restaurantname:request.body.restaurantname, 
            userseq:request.body.userseq
          },
          {
            "about":request.body.about, 
            "upduser":request.body.email,
            "upddate":date,
          }
        );
        sendObj = commonModules.sendObjSet("2230");
      }else{
        sendObj = commonModules.sendObjSet("2231"); 
      }
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2232");
    }
    response.status(500).send(obj);
  }
});

managementRoute.get("/aboutlayoutsearch", getFields.none(), async (request, response) => {

  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      let restaurantDatas = await Restaurants.findOne(
        {userseq:request.query.userseq,restaurantname:request.query.restaurantname,deleteyn:"n"},
      );

      if(restaurantDatas){
        sendObj = commonModules.sendObjSet("2240", restaurantDatas);
      }else{
        sendObj = commonModules.sendObjSet("2241");
      }

       
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2242");
    }
    response.status(500).send(obj);
  }
});


module.exports=managementRoute