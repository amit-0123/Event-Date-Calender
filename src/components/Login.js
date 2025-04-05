import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

// const clientId=process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const navigate = useNavigate();
 
  const onSuccess = (response) => {
    console.log("Login Success:", response);
    navigate("/events");
  };

  const onFailure = (response) => {
    console.log("Login Failed:", response);
  };

  return (
    <>
   <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
   <h1 style={{color:"blue"}}>Event Date Calender</h1>
   <p style={{color:"gray"}}>You can add your specific task date, project submission, party date, exam date etc.............</p>
   </div>
    <div 
    className="login-container" style={{height:"90vh",display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <h2>
        Login Using Your Google Account
      </h2>
      <GoogleLogin 
        onSuccess={onSuccess} 
        onError={onFailure} 
      />
    </div>
    </>
  );
}

export default Login;
