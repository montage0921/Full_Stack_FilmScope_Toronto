import React, { useContext } from "react";
import BarIcon from "../../components/icons/BarIcon";
import SearchIcons from "../../components/icons/SearchIcons";
import LoginContainer from "./LoginContainer";
import { SearchContext } from "../../App";

function NavBar() {
  const { query, setQuery } = useContext(SearchContext);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <nav
        className="bg-blue-400 h-16 text-2xl text-white col-start-2 row-start-1 px-3
                     flex justify-between items-center"
      >
        <div className="flex gap-2 justify-center items-center">
          <BarIcon></BarIcon>
          <span>FilmScope Toronto Admin</span>
        </div>

        <div className="relative flex gap-2 items-center">
          <span className="absolute left-1 top-1">
            <SearchIcons></SearchIcons>
          </span>
          <input
            className="w-full px4 py-1 pl-12 rounded shadow outline-none text-black"
            value={query}
            onChange={handleSearch}
            type="text"
          />
          <LoginContainer></LoginContainer>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
