import React, { useContext } from "react";
import SearchIcons from "../../components/icons/SearchIcons";
import LoginContainer from "./LoginContainer";
import { SearchContext, ShowListContext } from "../Admin";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { query, setQuery } = useContext(SearchContext);
  const { loginStatus } = useContext(AuthContext);
  const { showList, setShowList } = useContext(ShowListContext);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <nav
        className="bg-black h-20 text-2xl text-white px-3
                     flex justify-between items-center font-libre"
      >
        <div className="flex gap-2 justify-center items-center">
          <span className="mr-3">FilmScopeToronto Admin</span>
          <button className="bg-gray-400 hover:bg-gray-500 text-white text-base font-semibold px-4 py-1 rounded-lg transition-all duration-300">
            <Link to="/add-new-show">Add New Show</Link>
          </button>
          <button className="bg-gray-400 hover:bg-gray-500 text-white text-base font-semibold px-4 py-1 rounded-lg transition-all duration-300">
            Delete Expire Show
          </button>
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
