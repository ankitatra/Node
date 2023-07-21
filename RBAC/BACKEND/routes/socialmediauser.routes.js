require("dotenv").config();
const SecretKey = "masai";

const express = require("express");
const { UserModel } = require("../model/socialmediauser.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const socialuserRouter = express.Router();
socialuserRouter.use(express.json());
socialuserRouter.get("/",async(req,res)=>{
    const user = await UserModel.find();

    res.status(200).send(user)
    // res.send("hii")
})

socialuserRouter.post("/register", async (req, res) => { 
  const { email, pass, name, gender } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          email,
          pass: hash_password,
          name,
          gender,
        });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (error) {
    res.send("Error in Registering the user")
    console.log(error);
  }
});

socialuserRouter.post("/login", async (req, res) => {
  const { email, pass} = req.body;
  try {
    const user = await UserModel.find({ email });
    // console.log(user)
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, SecretKey); 
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send("Wrong Credntials");
        }
      });
    } else {
      res.send("Wrong Credntials");
    }
  } catch (error) {
    res.send("Something went wrong")
    console.log(error);
  }
});


module.exports = {
  socialuserRouter
};

// {
//     "name": "vishal rana",
//     "email": "vishalrana@gmail.com",
//     "pass": "ankita",
//     "gender": "male"
//   }