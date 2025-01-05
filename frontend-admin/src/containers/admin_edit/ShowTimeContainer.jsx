import React, { useContext, useState } from "react";
import { editContext } from "../EditShow";
import DateEditContainer from "./DateEditContainer";
import AddIcon from "../../components/icons/AddIcon";

function ShowTimeContainer() {
  const { showDto, setShowDto } = useContext(editContext);
  const [isAddDate, setIsAddDate] = useState(false);
  const [newDate, setNewDate] = useState("");

  const handleAddNewDate = (e) => {
    e.preventDefault();
    setIsAddDate(true);
  };

  const handleAddDate = (e) => {
    e.preventDefault();

    const deepCopyShowDto = JSON.parse(JSON.stringify(showDto));

    // check if the date is before today
    const selectDate = new Date(newDate);
    const isBeforeToday = selectDate < Date.now();
    if (isBeforeToday) {
      alert("Show date must be greater than now");
      return;
    }

    // check if the date is already in the show time
    const isDuplicate = Object.keys(deepCopyShowDto.showtimes).some(
      (date) => date === newDate
    );
    if (isDuplicate) {
      alert(`Date ${newDate} already in show time`);
      return;
    }

    deepCopyShowDto.showtimes[newDate] = [];
    setShowDto(deepCopyShowDto);
  };

  return (
    <div className="w-2/5 flex flex-col gap-3 flex-wrap">
      <div className="text-2xl font-semibold text-black border-b-2 border-black">
        Edit Show Time
      </div>
      {showDto.showtimes &&
        Object.keys(showDto.showtimes).map((date, index) => (
          <DateEditContainer key={date} date={date} />
        ))}
      {isAddDate && (
        <div className="flex gap-2 justify-center border-t-2 border-black pt-2 font-semibold">
          <input
            type="date"
            value={newDate}
            onChange={(e) => {
              setNewDate(e.target.value);
            }}
          />
          <button
            className="font-bold hover:text-white"
            onClick={handleAddDate}
          >
            Confirm
          </button>
          <button
            className="font-bold hover:text-white"
            onClick={() => {
              setIsAddDate(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <AddIcon size={50} handleFunction={handleAddNewDate}></AddIcon>
    </div>
  );
}

export default ShowTimeContainer;
