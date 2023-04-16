const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts")
const CategoryRouter = require("./routes/categories")
const multer = require("multer")
const path = require("path")

const PORT = process.env.PORT || 2000
const app = express()
dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to Mongo"))
    .catch((err)=>console.log(err))

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images")
    },filename:(req,file,cb) => {
        cb(null,req.body.name)
    }
})
const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})

app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/categories",CategoryRouter)

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})