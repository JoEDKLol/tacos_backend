const mongoose = require('mongoose')


const RestaurantSchema = mongoose.Schema({
   
  userseq : {
    type: Number,
    index:{unique:false}
  },
  
  restaurantseq : {
    type: Number,
    index:{unique:false}
  },
  
  restaurantname : {
    type: String,
    index:{unique:true}
  }, 

  header : {
    type: Object,
  }, 
  
  home : {
    type: Object,
  }, 

  homecontent : {
    type: String,
  }, 

  about : {
    type: Object,
  }, 

  aboutcontent : {
    type: String,
  }, 

  menu : {
    type: Object,
  }, 

  likeCounts : {
    type: Number,
  }, 

  commentCounts : {
    type: Number,
  }, 

  location : {
    type: Object,
  }, 

  img : {
    type: String,
  }, 

  regdate : {
    type: Date,
    default: Date.now
  },
  reguser : {
      type: String,
      required: true
  },
  upddate : {
      type: Date,
      default: Date.now
  },
  upduser : {
      type: String,
      required: true
  }
})


const Restaurants=mongoose.model('Restaurant',RestaurantSchema)
module.exports=Restaurants