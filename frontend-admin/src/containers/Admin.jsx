import React from "react";
import NavBar from "./admin_frontpage/NavBar";
import Footer from "../components/admin_frontpage/Footer";
import DashBoard from "./admin_frontpage/DashBoard";
import ShowContainer from "./admin_frontpage/ShowContainer";
import { createContext, useState } from "react";
import { LoginStatus } from "../utils/loginstatus";

export const LoginContext = createContext();
export const SearchContext = createContext();

function Admin() {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.NOT_ATTEMPTED);
  const [clickLoginDropDown, setClickLoginDropDown] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <LoginContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        clickLoginDropDown,
        setClickLoginDropDown,
      }}
    >
      <SearchContext.Provider value={{ query, setQuery }}>
        <div className="grid grid-rows-[64px_auto_64px] grid-cols-[20%_80%] h-screen">
          <NavBar></NavBar>
          <DashBoard></DashBoard>
          <ShowContainer></ShowContainer>
          <Footer></Footer>
        </div>
      </SearchContext.Provider>
    </LoginContext.Provider>
  );
}

export default Admin;
