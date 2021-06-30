import React, {useState} from "react";
import Axios from "axios";
import './Login.css';




function Register() {
 
  const [first_name,setfirst_name]= useState('');
  const [last_name,setlast_name]= useState('');
  const [email,setemail]= useState('');
  const [password,setpassword]= useState('');

  const register = () => {
    
    
    // console.log("This is user data : " + first_name);
    Axios.post('http://localhost:3001/register', {
      first_name : first_name,
      last_name : last_name,
      email: email,
      password : password,
  }).then((response) => {
    //console.log(response.data);
    if(response.data === "saved"){
      //alert("Your Account is under creation")
      sendMail();
    }
  }, (error) => {
    console.log(error);
  });
    };
    const sendMail = () => {
      alert("Check your email!")
     
      };
    
      
    

  return (
    <div className="App">
      <div className="registration">
       <h1>Registration</h1>
       <div >
       <label>first name</label>
       <input type="text" name="first_name"  onChange={(e)=> {setfirst_name(e.target.value)}}/>
       </div>
      <div className="form-group">
       <label>last name</label>
       <input type="text" name="last_name"  onChange={(e)=> {setlast_name(e.target.value)}}/>
       </div>
       <div className="form-group">
       <label>user email</label>
       <input type="text" name="email"  onChange={(e)=> {setemail(e.target.value)}}/>
       </div>
      {/* <div className="form-group">
       <label>email</label>
       <input type="text" name="email"  onChange={(e)=> {setemail(e.target.value)}}/>
       </div> */}
       <div className="form-group">
       <label>password</label>
       <input type="text" name="password" onChange={(e)=> {setpassword(e.target.value)}} />
       </div>
       <div className="form-group" >
       <button className="btn btn-primary btn-block" onClick={register}>register</button>
       <p>
                    Already registered <a href={"http://localhost:3002/auth/signin"}>Login</a>
                    </p>
               
       </div>
      
      </div>
    </div>
    
  );
}

export default Register;
