const express=require('express')
const multer=require('multer')
const restaurantRoute=express.Router()
let getFields=multer()
const Users = require("../models/userSchemas");
const Restaurants = require("../models/restaurantSchemas");
const commonModules = require("../utils/common");
const jwtModules = require("../utils/jwtmodule");
const { default: mongoose } = require('mongoose')
const db = mongoose.connection;
const sequence = require('../utils/sequences');
const checkAuth = require('../utils/checkAuth');


restaurantRoute.get("/searchreslist", getFields.none(), async (request, response) => {
  try {
    let sendObj = {};
    let chechAuthRes = checkAuth.checkAuth(request.headers.accesstoken);
    if(!chechAuthRes){
      sendObj = commonModules.sendObjSet("2011");
    }else{
      let restaurantDatas = await Restaurants.find(
          {userseq:request.query.userseq}, 
          {_id:0, "userseq":1, "restaurantseq":1, "restaurantname":1}
      );
      sendObj = commonModules.sendObjSet("2100", restaurantDatas);
        
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
      const restaurantseq = await sequence.getSequence("restaurant_seq");
      const restaurantseqSaveObj = {
        userseq:request.body.userseq,
        restaurantseq:restaurantseq,
        restaurantname:request.body.restaurantname,
        reguser:request.body.email,
        upduser:request.body.email,
      }

      const newRestaurants =new Restaurants(restaurantseqSaveObj);
      let resusers=await newRestaurants.save();
      sendObj = commonModules.sendObjSet("2110");
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

module.exports=restaurantRoute