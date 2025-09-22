const express = require('express')
var cors =require('cors')
const {initStore} = require(`./utils/store`)
const userRoutes =require('./modules/users')
const weatherRoutes =require('./modules/weathers')
const app= express()

//Middlwares
app.use(cors())
app.use(express.json()) //JSON formátum elvárása
app.use(express.urlencoded({extended: true})); //Req body-n keresztül adat átmenés

app.get('/', (req, res) => {
    res.send({msg:'Backend API Időjárás előre jelzéshez'})
  })
  
  app.use(`/users`,userRoutes)
  app.use(`/weathers`, weatherRoutes)
  app.listen(3000, ()=>{
      console.log(`Server listening on http://localhost:3000`)
  })