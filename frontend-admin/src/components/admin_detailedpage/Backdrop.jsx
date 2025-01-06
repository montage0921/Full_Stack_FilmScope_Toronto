import React, { useContext } from "react";
import { showDetailContext } from "../../containers/AdminDetail";

function Backdrop() {
  const { showDetail, setShowDetail } = useContext(showDetailContext);
  return (
    <div
      className="bg-black w-full h-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url("${showDetail.backdrop}")`,
      }}
    ></div>
  );
}

export default Backdrop;
