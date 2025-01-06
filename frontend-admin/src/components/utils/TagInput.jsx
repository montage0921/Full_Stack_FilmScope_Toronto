import React, { useState } from "react";
import CorrectIcon from "../icons/CorrectIcon";
import CancelIcon from "../icons/CancelIcon";

function TagInput({ setter, data, setAddMode }) {
  const [newInput, setNewInput] = useState(""); // Add state for input value

  const handleInput = () => {
    const trimmedInput = newInput.trim(); // Remove extra spaces

    if (!trimmedInput) {
      alert("Input cannot be empty");
      return;
    }

    if (data.includes(trimmedInput)) {
      alert("Value already exists");
      return;
    }

    // Update the data with the new value
    const deepCopyData = [...data];
    deepCopyData.push(trimmedInput);
    setter(deepCopyData);

    // Exit Add Mode
    setAddMode(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        className="relative bg-gray-300 text-black flex justify-center items-center
        text-sm rounded-lg px-4 w-[110px] h-11"
        value={newInput} // Controlled input value
        onChange={(e) => setNewInput(e.target.value)} // Update state on change
      ></input>
      <div className="flex justify-evenly">
        <CorrectIcon size={23} handleFunction={handleInput} />
        <CancelIcon size={23} cancelAddMode={setAddMode} />
      </div>
    </div>
  );
}

export default TagInput;
