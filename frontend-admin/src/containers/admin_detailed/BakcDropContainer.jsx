import React, { useContext, useState } from "react";
import { showDetailContext } from "../AdminDetail";
import Backdrop from "../../components/admin_detailedpage/Backdrop";
import ShowInfoCard from "../../components/admin_detailedpage/ShowInfoCard";
import { Link } from "react-router-dom";
import EditIcon from "../../components/icons/EditIcon";

function BakcDropContainer() {
  const { showDetail, setShowDetail } = useContext(showDetailContext);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="bg-black w-full h-screen text-white font-libre relative"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <Backdrop />

      <div
        className={`absolute bottom-0 text-white bg-black w-full h-1/5 flex px-3
             transation-bg-opacity transation-text-opacity duration-700  ${
               isHover
                 ? "bg-opacity-80 text-opacity-100"
                 : "bg-opacity-0 text-opacity-0"
             }`}
      >
        <ShowInfoCard />
        {showDetail && (
          <Link
            className={`absolute top-2 right-5 ${!isHover && "hidden"}`}
            to={`/detailed-page-admin/${showDetail.theatre}/${showDetail.showTitle}/edit`}
          >
            <EditIcon />
          </Link>
        )}
      </div>
    </div>
  );
}

export default BakcDropContainer;
