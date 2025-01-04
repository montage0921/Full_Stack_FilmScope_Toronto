import React from "react";
import ShowTimeButton from "../../components/admin_detailedpage/ShowTimeButton";

function DateCard({ date, time }) {
  // date formate is 2024-12-12
  // get dayOfWeek and Month from here
  const date1 = new Date(date);
  const dateArr = date1.toDateString().split(" ");
  const dayOfWeek = dateArr[0];
  const month = dateArr[1];
  const date2 = dateArr[2];

  return (
    <div className="bg-dateCardGray w-3/4 p-5">
      {console.log("sdsds", time)}
      <div className="font-bold text-2xl border-b-2 border-black pb-2">{`${dayOfWeek}, ${month} ${date2}`}</div>
      <div>
        {time.map((time_link, index) => (
          <ShowTimeButton
            key={index}
            time={time_link[0]}
            link={time_link[1]}
          ></ShowTimeButton>
        ))}
      </div>
    </div>
  );
}

export default DateCard;
