import React, { useContext } from "react";
import { editContext } from "../../containers/EditShow";

function SelectBox({ keyName, value, name, options }) {
  const { setShowDto } = useContext(editContext);

  return (
    <div className="flex w-2/5 gap-3">
      <label
        htmlFor={keyName}
        className="text-lg font-semibold text-gray-800 mb-2 self-center"
      >
        {name}
      </label>
      <select
        id={keyName}
        className="bg-transparent  text-gray-800
          focus:outline-none focus:border-blue-500 focus:text-blue-900"
        value={value}
        onChange={(e) => {
          setShowDto((prev) => ({
            ...prev,
            [keyName]: e.target.value === "true" ? true : false,
          }));
        }}
      >
        <option value="true">Publish</option>
        <option value="false">Not Publish</option>
      </select>
    </div>
  );
}

export default SelectBox;
