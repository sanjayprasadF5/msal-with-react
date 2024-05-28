// src/App.js
import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./GraphApi";
import "./App.css"; // Import the CSS file

const App = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  useEffect(() => {
    if (accounts.length > 0) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
    }
  }, [accounts, instance]);

  return (
    <div className="container">
      <h1>Welcome to My React App</h1>
      {accounts.length > 0 ? (
        <div>
          <p>Hello, {accounts[0].name}</p>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
          {graphData && (
            <div className="profile-container">
              <h2>Profile Information</h2>
              <div>
                <strong>Name:</strong> {graphData.displayName}
              </div>
              <div>
                <strong>Email:</strong>{" "}
                {graphData.mail || graphData.userPrincipalName}
              </div>
            </div>
          )}
        </div>
      ) : (
        <button className="login" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default App;
