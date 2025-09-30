const fs = require('fs');
const path = require('path');
//Adatok tárolása
const USERS_FILE = path.join(__dirname,"..","/database", 'user.json')
const WEATHERS_FILE = path.join(__dirname,"..","/database", 'weather.json')

let users = []
let weathers=[]

initStore()

const { json } = require('stream/consumers');

function initStore(){
    loadUsers()  
    loadWeather()
}
//Id generálás
function getNextId(){
    let nextID = 1;

    if (users.length == 0){
        return nextID
    }
    
    let maxIndex = 0
    for (let i = 0; i < users.length; i++) {
        if(users[i].id > users[maxIndex].id){
            maxIndex = i
        }
        
    }
    return users[maxIndex].id + 1
}
//weather data id generálás
function getNextWeatherId(){
    let nextID = 1;

    if (weathers.length == 0){
        return nextID
    }
    
    let maxIndex = 0
    for (let i = 0; i < weathers.length; i++) {
        if(weathers[i].id > weathers[maxIndex].id){
            maxIndex = i
        }
        
    }
    return weathers[maxIndex].id + 1
}

//Felhasználok beolvasása
function loadUsers(){
    if(fs.existsSync(USERS_FILE)){
        const raw = fs.readFileSync(USERS_FILE)
        try{
            users = JSON.parse(raw)
        }
        catch(err){
            console.log("Hiba az adatok beolvasása közben!", err)
            users = [];

        }
    }
    else{
        saveUsers()
    }
   
}
//lézezik-e az email megkeresése
function isEmailExist(email){
    let exists = false
    users.forEach(user=> {
        if(user.email == email){
            exists = true
            return
        }
    })
    return exists
}

//Felhasználok elmentése fájlba
function saveUsers(){
    fs.writeFileSync(USERS_FILE,JSON.stringify(users))
    
}
function saveWeathers(){
    fs.writeFileSync(WEATHERS_FILE,JSON.stringify(weathers))
}
function loadWeather(){
    if(fs.existsSync(WEATHERS_FILE)){
        const raw = fs.readFileSync(WEATHERS_FILE)
        try{
            weathers = JSON.parse(raw)
        }
        catch(err){
            console.log("Hiba az adatok beolvasása közben!", err)
            weathers = [];

        }
    }
    else{
       saveWeathers()
    }
}
module.exports = {
    initStore,saveUsers,isEmailExist,getNextId,getNextWeatherId,saveWeathers,loadWeather,users,weathers
}