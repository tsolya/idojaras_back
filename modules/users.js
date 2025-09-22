const express = require('express')
const router = express.Router()

const {users,isEmailExist,getNextId,saveUsers} = require(`../utils/store`)

//POST new user
router.post('', (req,res)=>{
    let data = req.body;
    if(isEmailExist(data.email)){
       return res.status(400).send({msg:"bademail"})
    }
    data.id = getNextId();
    users.push(data)
    res.send({msg: "Sikeres regisztráció!"})
    saveUsers()
   });
   

   //POST user login

router.post('/login', (req, res) => {
    let {email, password} = req.body;
    let loggeduser = {}
    users.forEach(user=> {
        if(user.email == email && user.password == password){
            loggeduser = user
            return
        }

    })
    res.send(loggeduser)
})

module.exports=router