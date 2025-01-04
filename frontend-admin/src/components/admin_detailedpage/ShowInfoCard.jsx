import React, { useContext } from "react";
import { showDetailContext } from "../../containers/AdminDetail";

function ShowInfoCard() {
  const { showDetail, setShowDetail } = useContext(showDetailContext);
  return (
    <div className="flex flex-col justify-center gap-2">
      <span className="text-6xl">{showDetail.showTitle}</span>
      <span className="text-3xl">{showDetail.theatre}</span>
    </div>
  );
}

export default ShowInfoCard;
