import React from "react";
import NavBar from "./admin_frontpage/NavBar";
import Footer from "../components/admin_frontpage/Footer";
import DashBoard from "./admin_frontpage/DashBoard";
import ShowContainer from "./admin_frontpage/ShowContainer";
import { createContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const SearchContext = createContext();
export const ShowListContext = createContext();

function Admin() {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState([]);

  return (
    <ShowListContext.Provider value={{ showList, setShowList }}>
      <SearchContext.Provider value={{ query, setQuery }}>
        <div className="flex flex-col h-screen">
          <NavBar />
          <ShowContainer />
          <Footer />
        </div>
      </SearchContext.Provider>
    </ShowListContext.Provider>
  );
}

export default Admin;
