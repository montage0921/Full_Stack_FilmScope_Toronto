import React, { useContext, useState } from "react";
import CrossCircle from "../icons/CrossCircle";
import { editContext } from "../../containers/EditShow";

function TimeEditCard({ date, time_link }) {
  const { showDto, setShowDto } = useContext(editContext);
  const [isHover, setIsHover] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleTimeChange = (e) => {
    const oldTime = time_link[0];
    const newTime = e.target.value + ":00";
    const deepCopyShowDto = JSON.parse(JSON.stringify(showDto)); // this already creates a deep copy we can manipulate with

    // check if it is a duplicate
    const isDuplicate = deepCopyShowDto.showtimes[date].some(
      (timeLink) => timeLink[0] === newTime
    );

    if (isDuplicate) {
      alert("Time already exists for this date!");
      return;
    }

    const updateShowtimes = deepCopyShowDto.showtimes[date].map((timeLink) => {
      if (timeLink[0] === oldTime) {
        return [newTime, timeLink[1]];
      }
      return timeLink;
    });

    deepCopyShowDto.showtimes[date] = updateShowtimes;
    setShowDto(deepCopyShowDto);
  };

  const handleDeleteTime = (e) => {
    const deepCopyShowDto = JSON.parse(JSON.stringify(showDto));
    const updateTimes = deepCopyShowDto.showtimes[date].filter(
      (timeLink) => timeLink[0] !== time_link[0]
    );
    deepCopyShowDto.showtimes[date] = updateTimes;
    setShowDto(deepCopyShowDto);
  };

  if (editMode) {
    return (
      <input
        type="time"
        value={time_link[0]}
        onDoubleClick={() => {
          setEditMode(false);
        }}
        onChange={handleTimeChange}
      />
    );
  } else {
    return (
      <div
        className="relative bg-black w-20 h-7 flex justify-center items-center text-white
                    hover:font-semibold"
        onClick={() => {
          setEditMode(true);
        }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        {time_link[0]}
        {isHover && (
          <CrossCircle
            size="14"
            date={{ date, time_link }}
            handleFunction={handleDeleteTime}
          />
        )}
      </div>
    );
  }
}

export default TimeEditCard;
