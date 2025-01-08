import React, { useState } from "react";

export default function CheckBox({ showDto, setter }) {
  const handleOnChange = (e) => {
    const isPublished = e.target.value === "true";
    setter((prev) => ({
      ...prev,
      published: isPublished,
    }));
    console.log(showDto);
  };
  return (
    <div className="flex w-2/5 gap-2 items-center">
      <label className=" text-lg font-semibold text-gray-800 ">Publish?</label>

      <select
        className="h-8  bg-transparent border-b-2 border-white text-white flex-grow
          focus:outline-none focus:border-blue-500 focus:text-blue-900 focus:font-bold"
        value={showDto.published ? "true" : "false"}
        onChange={handleOnChange}
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
    </div>
  );
}
