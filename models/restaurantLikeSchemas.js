const mongoose = require('mongoose')

const restaurantLikeSchemas = mongoose.Schema({
    userseq : {
      type: Number,
      index:{unique:false}
    },
      
    restaurantseq : {
      type: Number,
      index:{unique:false}
    },

    likeyn : {
      type: String,
      default: "n"
    },
    
    restaurantinfo: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "Restaurant", 
    },
    
    deleteyn : {
        type: String,
        default: "n"
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


const RestaurantLikes=mongoose.model('restaurantLike',restaurantLikeSchemas)
module.exports=RestaurantLikes