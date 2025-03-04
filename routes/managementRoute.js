const express=require('express')
const multer=require('multer')
const managementRoute=express.Router()
let getFields=multer()
const Users = require("../models/userSchemas");
const Restaurants = require("../models/restaurantSchemas");
const Categories = require("../models/categorySchema");
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

managementRoute.get("/menulayoutsearch", getFields.none(), async (request, response) => {

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
        sendObj = commonModules.sendObjSet("2340", restaurantDatas);
      }else{
        sendObj = commonModules.sendObjSet("2341");
      }

       
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2342");
    }
    response.status(500).send(obj);
  }
});

managementRoute.post("/menusave", getFields.none(), async (request, response) => {

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
            "menu":request.body.menu, 
            "upduser":request.body.email,
            "upddate":date,
          }
        );
        sendObj = commonModules.sendObjSet("2350");
      }else{
        sendObj = commonModules.sendObjSet("2351"); 
      }
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2352");
    }
    response.status(500).send(obj);
  }
});

managementRoute.post("/categorysave", getFields.none(), async (request, response) => {

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
        const categorySaveObj = {
          userseq:request.body.userseq,
          restaurantseq:restaurantDatas.restaurantseq,
          name:request.body.name,
          order:request.body.order,
          reguser:request.body.email,
          upduser:request.body.email,
        }
        const newCategories =new Categories(categorySaveObj);
        let resCategories=await newCategories.save();
        
        sendObj = commonModules.sendObjSet("2360");
      }else{
        sendObj = commonModules.sendObjSet("2361"); 
      }
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2362");
    }
    response.status(500).send(obj);
  }
});

managementRoute.get("/categorysearch", getFields.none(), async (request, response) => {

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
        let categoriesDatas = await Categories.find(
          {userseq:request.query.userseq,restaurantseq:restaurantDatas.restaurantseq,},
        ).sort({order:1});
        
        sendObj = commonModules.sendObjSet("2370", categoriesDatas);
      }else{
        sendObj = commonModules.sendObjSet("2371"); 
      }
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    console.log(error);
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2372");
    }
    response.status(500).send(obj);
  }
});

managementRoute.post("/categoryupdate", getFields.none(), async (request, response) => {

  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      let date = new Date().toISOString();
      let categoriesDatas = await Categories.updateOne(
        {
          _id:request.body._id, 
        },
        {
          "name":request.body.name,
          "order":request.body.order,
          "upduser":request.body.email,
          "upddate":date,
        }
      )

      sendObj = commonModules.sendObjSet("2380");
      
    }
    
    response.send({
        sendObj
    });

  } catch (error) {
    let obj = commonModules.sendObjSet(error.message); //code

    if(obj.code === ""){
      obj = commonModules.sendObjSet("2382");
    }
    response.status(500).send(obj);
  }
});


module.exports=managementRoute