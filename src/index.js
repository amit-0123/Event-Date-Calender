import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18+
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the Google OAuth provider
import "./styles.css";
import App from "./App";


// console.log("Google Client ID from .env:", process.env.REACT_APP_GOOGLE_CLIENT_ID);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Wrap your app with GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
