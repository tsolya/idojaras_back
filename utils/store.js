const fs = require('fs');
const path = require('path');
//Adatok tárolása
const USERS_FILE = path.join(__dirname,"..","/database", 'user.json')

let users = []

initStore()

const { json } = require('stream/consumers');

function initStore(){
    loadUsers()  
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

module.exports = {
    initStore,saveUsers,isEmailExist,getNextId,users
}