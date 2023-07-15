import './App.css';
import { useEffect } from 'react';
const Client_Id="e2ecb6c88e1d6720104f"
function App() {

  useEffect(()=>{
    const url=window.location.search
    const urlPrams=new URLSearchParams(url)
    const code=urlPrams.get("code")
    console.log(code)
    if(code&&(localStorage.get("accessToken")===null) ){
      const getAccessToken=async()=>{
        await fetch(`http://localhost:4000/gettoken?code=${code}`,{
          method:"GET"
        }).then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
      }
      getAccessToken()
    }
  },[])
  const handlelogin=()=>{
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${Client_Id}`)
  }
  return (
    <div className="App">
      <button onClick={handlelogin}>Login with github</button>
     
    </div>
  );
}

export default App;
