import React, { useContext } from "react";
import { showDetailContext } from "../AdminDetail";
import Loading from "../../components/utils/Loading";
import DateCard from "./DateCard";

function ShowTimeContainer() {
  const { showDetail, setShowDetail } = useContext(showDetailContext);

  if (showDetail?.showtimes) {
    return (
      <div className="w-1/3 flex flex-col gap-3 font-libre items-start p-5">
        <div className="flex flex-col text-5xl font-bold self-start border-b-2 border-black pb-3 w-3/4 mb-3">
          Showtimes
          <span className="text-base">
            All screenings take places at {showDetail.theatre}
          </span>
        </div>

        {Object.keys(showDetail.showtimes).map((date, index) => (
          <DateCard
            key={index}
            date={date}
            time={showDetail.showtimes[date]}
          ></DateCard>
        ))}
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default ShowTimeContainer;
