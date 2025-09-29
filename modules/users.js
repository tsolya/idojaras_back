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
   
// GET one user by id

router.get('/:id',(req,res)=>{
    let id = Number(req.params.id)
    let idx = users.findIndex(user => Number(user.id) === id)
    if(idx >-1){
        return res.send(users[idx])
    }
    return res.status(400).send({msg:"Nincs ilyen azonosítójú felhasználó!"})
})

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
// UPDATE user by id

router.patch('/:id', (req, res) => {
    let id = Number(req.params.id)
    let data = req.body
    let idx = users.findIndex(user => Number(user.id) === id)
    if (idx > -1) {
        if (data.email && data.email != users[idx].email) {
            let exists = users.some(user => user.email === data.email && Number(user.id) !== id)
            if (exists) {
                return res.status(400).send({ msg: "Ez az email cím már foglalt!" })
            }
            users[idx].email = data.email
        }
        if (data.name) users[idx].name = data.name
        saveUsers()
        return res.send({ msg: "A felhasználó módosítva.", user: users[idx] })
    }
    return res.status(400).send({ msg: "Nincs ilyen azonosítójú felhasználó!" })
})

//UPDATE password
router.patch('/changepass/:id', (req, res) => {
    let id = Number(req.params.id)
    let data = req.body
    let idx = users.findIndex(user => Number(user.id) === id)
    if (idx > -1) {
        if (data.oldpass && data.newpass) {
            if (data.oldpass != users[idx].password) {
                return res.status(400).send({ msg: "A régi jelszó nem megfelelő!" })
            }
            users[idx].password = data.newpass
            saveUsers()
            return res.send({ msg: "A jelszó módosítva.",user : users[idx] })
        }
        return res.status(400).send({ msg: "Nincsenek meg a szükséges adatok!" })
    }
    return res.status(400).send({ msg: "Nincs ilyen azonosítójú felhasználó!" })
})

module.exports=router