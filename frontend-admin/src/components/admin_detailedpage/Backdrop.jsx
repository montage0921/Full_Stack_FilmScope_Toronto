import React, { useContext } from "react";
import { showDetailContext } from "../../containers/AdminDetail";

function Backdrop() {
  const { showDetail, setShowDetail } = useContext(showDetailContext);
  return (
    <div
      className="bg-black w-full h-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${showDetail.backdrop}")`,
      }}
    ></div>
  );
}

export default Backdrop;
