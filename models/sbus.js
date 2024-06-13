const mongoose=require("mongoose")
const schema=mongoose.Schema(

    {
       
        "name":String,
        "route":String,
        "num":String,
        "dname":String
    }
)
let sbusmodel=mongoose.model("buses",schema)
module.exports={sbusmodel}