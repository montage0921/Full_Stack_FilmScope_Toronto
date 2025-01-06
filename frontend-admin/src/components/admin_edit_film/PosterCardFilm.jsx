import React, { useContext } from "react";
import { StrEditContext } from "../../containers/EditFilm";

function PosterCardFilm() {
  const { poster, title } = useContext(StrEditContext);
  return (
    <div className="absolute top-20 left-[100px]">
      <img
        className=" bg-orange-200 w-[150px] h-[225px] rounded-lg"
        src={poster}
        alt={title}
      />
    </div>
  );
}

export default PosterCardFilm;
