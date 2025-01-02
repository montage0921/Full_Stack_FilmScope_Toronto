import React from "react";
import { createContext, useState } from "react";
import { LoginStatus } from "../utils/loginstatus";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.NOT_ATTEMPTED);
  const [clickLoginDropDown, setClickLoginDropDown] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        clickLoginDropDown,
        setClickLoginDropDown,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
