const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")

router.post("/register",async (req,res)=>{
    try{
        const salt =await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password,salt)
        const newUSer = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPass
        })
        const user = await newUSer.save()
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user) res.status(400).json("Wrong Credentials")
        else{
            const validated = await bcrypt.compare(req.body.password,user.password)
            if(!validated) res.status(400).json("Wrong Credentials")
            else{
                const {password, ...others} = user._doc
                res.status(200).json(others)
            }
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router