const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    userseq:{
        type: Number,
        index:true,
    },
    restaurantseq : {
        type: Number,
        index:true,
    },
    
    name: {
        type: String,
    },

    order : {
        type: Number,
        default: 0
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


const categories=mongoose.model('category',categorySchema)
module.exports=categories