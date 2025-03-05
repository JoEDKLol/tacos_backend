const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    userseq:{
        type: Number,
        index:true,
    },
    restaurantseq : {
        type: Number,
        index:true,
    },
    
    categoryid: {
        type: mongoose.Schema.ObjectId,
    },

    img : {
        type: String,
    }, 
    
    thumbImg : {
        type: String,
    }, 

    name: {
        type: String,
    },

    description: {
        type: String,
    },

    price : {
        type: String,
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


const menus=mongoose.model('menu',menuSchema)
module.exports=menus