const mongoose = require('mongoose')

const commentSchemas = mongoose.Schema({
    commentseq : {
        type: Number,
        required: true,
        index:true
    },
    restaurantseq : {
        type: Number,
        required: true,
        index:true
    },
    comment : {
        type: String,
    },

    userinfo: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "user", 
        index:true
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


const comments=mongoose.model('comment',commentSchemas)
module.exports=comments