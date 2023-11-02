import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import axios from "axios";
import { useStore } from "./hooks/useStore";
import User from "./User";

function App() {
  const setAuthData = useStore((state) => state.setAuthData);
  return (
    <>
      <h1>Welcome to RELS</h1>
      {!useStore((state) => state.authData) ? (
        <GoogleOAuthProvider clientId="1033464832148-iaa1h6j43lvk1hvpum8io80ru8pcfrb7.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              const { data } = await axios.post("http://localhost:3001/login", {
                token: credentialResponse.credential,
              });

              setAuthData(data);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      ) : (
        <>
          <h1>Nest.js + React, google oauth</h1>
          <User />
        </>
      )}
    </>
  );
}

export default App;
