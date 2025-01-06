import React, { useState } from "react";
import CrossCircle from "../icons/CrossCircle";

function ElementTag({ element, data, setter }) {
  const [isHidden, setIsHidden] = useState(false);
  const [EditMode, setEditMode] = useState(false);

  const handleDelete = () => {
    const updateData = data.filter((str) => str !== element);

    setter(updateData);
  };

  const handleInput = (e) => {
    const newInput = e.target.value.trim(); // Trim to avoid accidental spaces

    const updateData = data.map((str) => (str === element ? newInput : str));
    setter(updateData);
  };

  if (EditMode) {
    return (
      <input
        className="relative bg-gray-300 text-black flex justify-center items-center
    text-sm rounded-lg px-4 min-w-[50px]"
        onDoubleClick={() => setEditMode(false)}
        value={element}
        onChange={handleInput}
      ></input>
    );
  } else {
    return (
      <div
        className="relative bg-black text-white flex justify-center items-center
    text-sm rounded-lg px-4 min-w-[50px]"
        onMouseEnter={() => {
          setIsHidden(true);
        }}
        onMouseLeave={() => {
          setIsHidden(false);
        }}
        onDoubleClick={() => setEditMode(true)}
      >
        {element}
        {isHidden && (
          <CrossCircle size={15} handleFunction={handleDelete}></CrossCircle>
        )}
      </div>
    );
  }
}

export default ElementTag;
