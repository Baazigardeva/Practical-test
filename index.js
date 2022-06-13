const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// 1. Database Connection
mongoose.connect("mongodb://localhost:27017/loginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("MongoDB connected !!")
})

// 2. Schema Creation
const userSchema = new mongoose.Schema({ 
    name: String,
    email: String,
    password: String,
    date: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
})

// 3. Model Creation
const User = new mongoose.model("User", userSchema)

// Login 
app.post("/login", (req, res) => {
    const {email, password} = req.body
    User.findOne({email : email}, (err,user) => {
        if(user){
            if(password == user.password) {
                res.send({message : "Login Successfull !!", user: user})
            } else {
                res.send({message : "Wrong Password !!"})
            }
        } else {
            res.send({message : "Invalid Input/ User not registered !!"})
        }
    })
})

// Register
app.post("/register", (req, res) => {
    const {name, email, password, date} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registered !!"})
        }
    })
    const user = new User({
        name,
        email,
        password,
        date
    })
    user.save(err => {
        if(err){
            res.send(err)
        } else {
            res.send({message : "Registered Successfully !! Please login now"})
        }
    })
})

app.listen(9002, () => {
    console.log("Backend started at port 9002")
})