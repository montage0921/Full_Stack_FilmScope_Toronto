import React, { useState } from "react";
import BarIcon from "../components/icons/BarIcon";
import SearchIcons from "../components/icons/SearchIcons";
import LoginIcon from "../components/icons/LoginIcon";
import LoginForm from "../components/LoginForm";
import LoginContainer from "./LoginContainer";

function Header() {
  const [clickLoginDropDown, setClickLoginDropDown] = useState(false);

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
            <button>
              <SearchIcons></SearchIcons>
            </button>
          </span>
          <input
            className="w-full px4 py-1 pl-12 rounded shadow outline-none text-black"
            type="text"
          />
          <LoginContainer
            clickLoginDropDown={clickLoginDropDown}
            setClickLoginDropDown={setClickLoginDropDown}
          ></LoginContainer>
        </div>
      </nav>
    </>
  );
}

export default Header;
