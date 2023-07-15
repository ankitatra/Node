const express = require("express");
const cors = require("cors");
const Client_Id="e2ecb6c88e1d6720104f"
const fetch = (...args) => {
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
};

const app = express();
app.use(express.json());
app.use(cors());
app.get("/gettoken",(req,res)=>{
//client_id ,client_secret,code
})
app.listen(4000, () => {
  console.log("proxy server running at port 4000");
});
