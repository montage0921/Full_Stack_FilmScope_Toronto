import React from "react";
import github from "../../assets/github.svg";
function Footer() {
  return (
    <div
      className="bg-gray-400 h-16 flex justify-center items-center gap-2
                    col-span-2 row-start-3"
    >
      <img src={github} className="h-6 w-6"></img>
      <a href="https://github.com/montage0921/Full_Stack_FilmScope_Toronto">
        Created by Montage
      </a>
    </div>
  );
}

export default Footer;
