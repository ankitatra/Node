import "./App.css";
import { useEffect, useState } from "react";
const Client_Id = "13fb0bbe2e3feae1e6e3";
function App() {
  const [render,setRender]=useState([])
  useEffect(() => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const code = urlParams.get("code");
    console.log(code);
    if (code && localStorage.getItem("accessToken") === null) {
      const getToken = () => {
        fetch(`http://localhost:4000/gettoken?code=${code}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("accessToken", data.access_token);
            setRender(!render)
          })
          .catch((err) => console.log(err));
      };
      getToken();
    }
  }, []);

  const getuserdata=()=>{
    fetch("http://localhost:4000/getuserdata",{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  }

  const handlelogingithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${Client_Id}`
    );
  };

  return (
    <div className="App">
      {localStorage.getItem("accessToken")?
      <>
      <h2>we have sccess_token</h2>
      <button onClick={()=>
      {localStorage.removeItem("accessToken")
        setRender(!render)

    }}>logout</button>
    <h3>get the user data</h3>
    <button onClick={getuserdata}>getDAta</button>
      </>:<>
      <h3>user has not log in</h3>
      <button onClick={handlelogingithub}>Login  github</button>
      </>}
    
     
    </div>
  );
}

export default App;
