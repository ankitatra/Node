const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/socialmediauser.model");
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      const { userID } = decoded;
      const user = await UserModel.findOne({ _id: UserID });
      const role = user?.role;
      req.role=role
      next();
      //if(decoded){
      // req.body.userID=decoded.userID
      //req.body.user=decoded.user
      // next()
      // }else{
      // res.json({msg:"Not Authorized!!"})
      //   }
    } catch (error) {
      res.json({ error: error.message });
    }
  }
};
