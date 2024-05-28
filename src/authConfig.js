// src/authConfig.js
export const msalConfig = {
  auth: {
    clientId: "e5567f42-55fb-4e54-9c22-dd676217540e", // Replace with your Azure AD client ID
    authority:
      "https://login.microsoftonline.com/tejaswinusumu1319gmail.onmicrosoft.com", // Replace with your Azure AD tenant ID
    redirectUri: "http://localhost:3000", // Replace with your redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set to true if you are having issues on IE11 or Edge
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
