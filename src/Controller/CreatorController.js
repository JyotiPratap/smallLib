const userModel = require("../Model/UserModel.js")
const jwt = require("jsonwebtoken");



const isValid = function (value) {
     if (typeof value == 'undefined' || value === null) return false
     if (typeof value == 'string' && value.trim().length === 0) return false
     return true
 }
 const roleValid = function (Role) {
    return ["CREATOR", "VIEWER", "VIEW_ALL"].indexOf(Role) !== -1

}

 const Creator = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "please Enter the details of Creator" })
        }
        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, msg: "name is required" })
        }
        if (!isValid(data.email)) {
            return res.status(400).send({ status: false, msg: "email is required" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email.trim()))) {
             return res.status(400).send({ status: false, msg: "invalid email id" })
         }
        let dupEmail = await userModel.findOne({ email: data.email })
        if (dupEmail) {
            return res.status(400).send({ status: false, msg: "this email ID is already registered" })
        }
        if (!isValid(data.password)) {
           return res.status(400).send({ status: false, msg: "password is required" })
       }
        // if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/).test(data.password)) {
        //     return res.status(400).send({ status: false, msg: "password should contain at least [1,@.,a-zA] " })
        // }
        if (!data.Role) {
            return res.status(400).send({ status: false, msg: "Role is required" })
        }
        if (!roleValid(data.Role.trim())) {
            return res.status(400).send({ status: false, msg: "please Enter valid Role" })
         }
         let saveData = await userModel.create(data)
         return res.status(201).send({ status: true, data: saveData })
 
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}; 

const loginCreator = async function(req,res){
    try{ let data = req.body
         if (Object.entries(data).length === 0) {
         res.status(400).send({ status: false, msg: "Kindly pass some data " })}

         let username = req.body.email
         let password = req.body.password

         if(!username){
              return res.status(400).send({status : false, msg : "Enter Valid Email"})}
         if(!password){
              return res.status(400).send({status:false,msg:"Enter valid Password"})}

         let user = await userModel.findOne({email : username,password : password})
         if(!user){
              return res.status(400).send({status:false,msg:"credentials dont match,plz check and try again"})} 
           
         let token = jwt.sign({
              userId : user._id.toString(),  // exp: Math.floor(Date.now() / 1000) + (60 * 30) 
         },"Project_1")
         res.setHeader("x-api-key", token);
         res.status(200).send({status : true, data : token})

    }
    catch(error)
    {
         console.log(error)
         res.status(500).send({status: false, msg: error.message})
    }
}

module.exports.Creator=Creator,
module.exports.loginCreator=loginCreator
