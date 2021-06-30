import React, {useState} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import './Login.css';



function Login() {
  const [email,setemail]= useState('');
  const [password,setpassword]= useState('');

  const login = () => {
    // console.log("This is user data : " + first_name);
    Axios.post('http://localhost:3001/login', {
      email: email,
      password : password,
  }).then((response) => {
    //console.log(response.data);
    if(response.data === "saved"){
      this.history.push("/home");
      //alert("Your Account is under creation")
     
    }
  }, (error) => {
    console.log(error);
  });
    };
    
  

  return (
    <div className="App">
      <div className="login">
       <h1>Login</h1>
      <div className="form-group">
       <label> user email</label>
       <input type="text" name="email"  onChange={(e)=> {setemail(e.target.value)}}/>
       </div>
       <div className="form-group">
       <label>password</label>
       <input type="text" name="password" onChange={(e)=> {setpassword(e.target.value)}} />
       </div>
       <div className="form-group" >
       <button className="btn btn-primary btn-block" onClick={login}>Login</button>
       <Link className="link" to="/home">
           go to chat
          </Link>
       </div>
       
      </div>
    </div>
    
  );
}

export default Login;