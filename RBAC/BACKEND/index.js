const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { socialuserRouter } = require("./routes/socialmediauser.routes");
const { UserModel } = require("./model/socialmediauser.model");

const app = express();
require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use("/user", socialuserRouter);


app.get("./products",async(req,res)=>{

    const token=req.headers.authorization?.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    const {userID}=decoded
    const user=await UserModel.findOne({_id:userID})
    const role=user.role
    if(req.role==="customer"){
        res.send("products...")
    }else{
        res.send("Not Authorized!!")
    }

})

app.get("./salesdata",(req,res)=>{
    res.send("salesdata...")
})

app.patch("./products/update",(req,res)=>{
    res.send("Updated...")
})
app.listen(4000, async () => {
  try {
    await connection;
    console.log("db is running");
  } catch (error) {
    console.log(error);
  }
  console.log(`port is running 4000`);
});
