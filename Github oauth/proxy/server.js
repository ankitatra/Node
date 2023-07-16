// const express = require("express");
// const cors = require("cors");

// //this is import statement of node-fetch

// const fetch = (...args) => {
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));
// };
// const Client_Id="13fb0bbe2e3feae1e6e3"
// const client_secret=process.env.client_secret
// //----------*************************-----------------

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.get("/gettoken",(req,res)=>{
// //client_id ,client_secret,code
// const {code}=req.query
// fetch(`https://github.com/login/oauth/access_token?client_id=${Client_Id}&code=${code}`,{
//   method:"POST",
//   headers:{
//     Accept:"application/json"
//   }
// }).then(re=>re.json())
// .then(data=>res.json(data))
// })
// app.listen(4000, () => {
//   console.log("proxy server running at port 4000");
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
let fetch; // Declare the fetch variable

// Dynamically import node-fetch
import("node-fetch").then(({ default: fetched }) => {
  fetch = fetched;
  startServer(); // Call the function to start the server after the fetch is available
});

const Client_Id = "13fb0bbe2e3feae1e6e3";
const client_secret = process.env.client_secret;
console.log("Sc", client_secret);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/gettoken", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${Client_Id}&client_secret=${client_secret}&code=${code}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

app.get("/getuserdata", (req, res) => {
  fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((res) => res.json())
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

function startServer() {
  app.listen(4000, () => {
    console.log("proxy server running at port 4000");
  });
}
