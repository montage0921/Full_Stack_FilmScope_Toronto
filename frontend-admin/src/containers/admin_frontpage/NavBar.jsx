import React, { useContext } from "react";
import SearchIcons from "../../components/icons/SearchIcons";
import LoginContainer from "./LoginContainer";
import { SearchContext } from "../Admin";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { deleteExpiredShows } from "../../api/crudAPI";
import { LoginStatus } from "../../utils/loginstatus";

function NavBar() {
  const { query, setQuery } = useContext(SearchContext);
  const { loginStatus } = useContext(AuthContext);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const navigate = useNavigate();

  const handleDeleteExpireSHow = async (e) => {
    e.preventDefault();
    try {
      await deleteExpiredShows();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav
        className="bg-black h-20 text-2xl text-white px-3
                     flex justify-between items-center font-libre"
      >
        <div className="flex gap-2 justify-center items-center">
          <span className="mr-3">FilmScopeToronto Admin</span>
          {loginStatus === LoginStatus.SUCCESS && (
            <div className="py-2 flex gap-2">
              <button className="bg-gray-400 hover:bg-gray-500 text-white text-base font-semibold px-4 py-1 rounded-lg transition-all duration-300">
                <Link to="/add-new-show">Add New Show</Link>
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-base font-semibold px-4 py-1 rounded-lg transition-all duration-300"
                onClick={handleDeleteExpireSHow}
              >
                Delete Expire Show
              </button>
            </div>
          )}
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
