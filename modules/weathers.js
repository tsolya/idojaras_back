const express = require('express')
const router = express.Router()

const{weathers,getNextWeatherId,saveWeathers}=require(`../utils/store`)


module.exports=router