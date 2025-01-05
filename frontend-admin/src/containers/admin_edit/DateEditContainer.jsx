import React, { useContext, useState } from "react";
import { editContext } from "../EditShow";
import TimeEditCard from "../../components/admin_edit/TimeEditCard";
import CrossCircle from "../../components/icons/CrossCircle";

function DateEditContainer({ date }) {
  const { showDto, setShowDto } = useContext(editContext);
  const [editMode, setEditMode] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [newTime, setNewTime] = useState("00:00");
  const [newLink, setNewLink] = useState("");

  const handleDateChange = (e) => {
    // get the new date
    const newDate = e.target.value;

    const oldDate = date;

    // create a deepCopy of ShowDto
    const deepCopyJson = JSON.parse(JSON.stringify(showDto));
    const deepCopyShowDto = { ...deepCopyJson };

    deepCopyShowDto.showtimes[newDate] = showDto.showtimes[oldDate];
    delete deepCopyShowDto.showtimes[oldDate];

    setShowDto(deepCopyShowDto);
  };

  const handleDeleteDate = () => {
    const deepCopyShowDto = JSON.parse(JSON.stringify(showDto));
    delete deepCopyShowDto.showtimes[date];

    setShowDto(deepCopyShowDto);
  };

  const handleAddNewClick = (e) => {
    e.preventDefault();
    setIsAddNew(true);
    console.log("Add");
  };

  const handleConfirmNewTime = (e) => {
    e.preventDefault();
    const deepCopyShowDto = JSON.parse(JSON.stringify(showDto));
    // check if it is a duplicate
    const isDuplicate = deepCopyShowDto.showtimes[date].some(
      (timeLink) => timeLink[0] === newTime + ":00"
    );

    if (isDuplicate) {
      alert("Time already exists for this date!");
      return;
    }

    if (newLink === "") {
      alert("Link for ticket is mandatory");
      return;
    }

    const newTimeLink = [newTime + ":00", newLink];

    deepCopyShowDto.showtimes[date].push(newTimeLink);
    setShowDto(deepCopyShowDto);
    setIsAddNew(false);
  };

  if (editMode) {
    return (
      <div>
        <input
          type="date"
          value={date}
          onDoubleClick={() => {
            setEditMode(false);
          }}
          onChange={handleDateChange}
        />
        <div className="flex gap-5 mt-3">
          {showDto.showtimes &&
            showDto.showtimes[date].map((time_link) => (
              <TimeEditCard
                date={date}
                time_link={time_link}
                key={date + time_link[0]}
              />
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="relative z-0 bg-gray-800 text-white w-2/6 text-center hover:font-semibold hover:cursor-pointer"
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
          {date}
          {isHover && (
            <CrossCircle
              size="14"
              date={date}
              handleFunction={handleDeleteDate}
            />
          )}
        </div>

        <button
          className="bg-green-300 my-1 p-1 text-sm font-bold text-gray-800 rounded-lg
        transition-bg duration-100 hover:bg-red-300 mr-2"
          onClick={isAddNew ? handleConfirmNewTime : handleAddNewClick}
        >
          {isAddNew ? "Confirm" : "Add New"}
        </button>
        <div className={`flex gap-2 ${!isAddNew && "hidden"} mb-2 `}>
          <input
            type="time"
            value={newTime}
            onChange={(e) => {
              setNewTime(e.target.value);
            }}
          />
          <input
            value={newLink}
            className="h-8 bg-transparent border-b-2 border-white text-white
          focus:outline-none focus:border-blue-500 focus:text-blue-900 focus:font-bold
          placeholder-white"
            placeholder="url for tickets"
            onChange={(e) => {
              setNewLink(e.target.value);
            }}
          />
        </div>

        <div className="flex gap-5">
          {showDto.showtimes &&
            showDto.showtimes[date].map((time_link) => (
              <TimeEditCard
                date={date}
                time_link={time_link}
                key={date + time_link[0]}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default DateEditContainer;
