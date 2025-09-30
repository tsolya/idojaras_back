const express = require('express')
const router = express.Router()

const{weathers,getNextWeatherId,saveWeathers}=require(`../utils/store`)

//GET all weather by u.ID
router.get('/user/:uid',(req,res)=>{
    let userweather=[]
    let uid = Number(req.params.uid)
    if( uid==-1){
        res.status(400).send({msg:"Nincs ilyen felhasználó"})

    }
    for (let i=0; i<weathers.length;i++){
        if(weathers[i].uid==uid){
            userweather.push(weathers[i])
        }
    }
    res.send(userweather)
})

// GET one weather by id

router.get('/:id', (req,res) =>{
    let id = Number(req.params.id)
    let idx = weathers.findIndex(weather => Number(weather.id) === id)
    if(idx >-1){
        return res.send(weathers[idx])
    }
    return res.status(400).send({msg:"Nincs ilyen azonosítójú lépés!"})
})

//POST new weather
router.post('/',(req,res) =>{
    let data = req.body;
    data.id = getNextWeatherId();
    weathers.push(data)
    saveWeathers();
    res.send({msg: "Sikeres adatfelvitel!"})
});

//PATCH weather by id
router.patch('/:id',(req,res) => {
    let id = Number(req.params.id)
    let data = req.body
    let idx = weathers.findIndex(weather => Number(weather.id) === id)
    if (idx > -1) {
        if (data.date) weathers[idx].date = data.date
        if (data.min) weathers[idx].min = data.min
        if (data.max) weathers[idx].max = data.max
        if (data.type) weathers[idx].type = data.type
        saveWeathers()
        return res.send({ msg: "Az időjárás adatok módosítva.", weather: weathers[idx] })
    }
    return res.status(400).send({ msg: "Nincs ilyen azonosítójú időjárásadat" })
})


// DELETE weather data

router.delete('/:id',(req,res) =>{
    let id = Number(req.params.id)
    let idx = weathers.findIndex(weather => Number(weather.id) === id)
    weathers.splice(idx,1)
    saveWeathers()
    res.send({msg:"Sikeres törlés!"})
})

// DELETE all weathers by userID
router.delete('/user/:uid', (req,res) =>{
    let uid = Number(req.params.uid)

    if(uid == -1){
        res.status(400).send({msg: "Nincs ilyen felhasználó!"})
    }
    for (let i = 0; i < weathers.length; i++) {
        if(weathers[i].uid == uid){
            weathers.splice(i,1)
            i--
        }
        
    }
    saveWeathers()
    res.send({msg: "Sikeresen törölve!"})
})

// DELETE all steps by users
router.delete('/',(req,res) =>{
    weathers = []
    saveWeathers()
    res.send({msg:"Összes adat törölve"})
})



module.exports=router