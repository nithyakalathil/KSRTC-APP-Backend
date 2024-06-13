
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcryptjs")
const {busmodel}=require("./models/bus")
const {sbusmodel}=require("./models/sbus")
const jwt=require("jsonwebtoken")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://nithya:nithya913@cluster0.r7eo1il.mongodb.net/kbusesDb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async(password)=>{
 
    const salt=await bcrypt.genSalt(10) 

    return bcrypt.hash(password,salt)

}


app.post("/signin",(req,res)=>{
   
    let input = req.body
    busmodel.find({"email":req.body.email}).then( 
        (response)=>{
            if (response.length>0) {
                let dbpassword=response[0].password
                console.log(dbpassword)
                bcrypt.compare(input.password,dbpassword,(error,isMatch)=>{
                    if (isMatch) {
                       
jwt.sign({email:input.email},"bus-app",{expiresIn:"1d"},
    (error,token)=>{
        if (error) {
            res.json({status:"unable to create tocken"})
        } else {
            res.json({status:"Success","userid":response[0]._id,"token":token})
        }

})

                    } else {
                        res.json({status:"incorect"})
                    }
                })
            } else {
                res.json({status:"not exist"})
            }
        }
    ).catch()
})

app.post("/view",(req,res)=>{
    let token=req.headers["token"]
    jwt.verify(token,"bus-app",(error,decoded)=>{
        if(decoded)
            {
                busmodel.find().then(
                    (responce)=>{
                        res.json(responce)
                    }
                )
            }
    })
})









app.listen(8080,()=>{
    console.log("server started")
})