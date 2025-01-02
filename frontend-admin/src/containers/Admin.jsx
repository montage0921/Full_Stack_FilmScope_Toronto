import React from "react";
import NavBar from "./admin_frontpage/NavBar";
import Footer from "../components/admin_frontpage/Footer";
import DashBoard from "./admin_frontpage/DashBoard";
import ShowContainer from "./admin_frontpage/ShowContainer";
import { createContext, useState } from "react";

export const SearchContext = createContext();

function Admin() {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <div className="grid grid-rows-[64px_auto_64px] grid-cols-[20%_80%] h-screen">
        <NavBar />
        <DashBoard />
        <ShowContainer />
        <Footer />
      </div>
    </SearchContext.Provider>
  );
}

export default Admin;
