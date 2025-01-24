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
    <div className="login-container">
      <GoogleLogin 
        onSuccess={onSuccess} 
        onError={onFailure} 
      />
    </div>
  );
}

export default Login;
