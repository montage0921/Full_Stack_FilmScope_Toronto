import React from "react";
import CorrectIcon from "../../components/icons/CorrectIcon";
import CancelIcon from "../../components/icons/CancelIcon";

function SearchTMDB() {
  return (
    <div>
      <div className="absolute right-[-420px] top-[-40px]  mt-2 flex items-center gap-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg w-[400px]">
        {/* Input for Film Title */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Film Title
          </label>
          <input
            type="text"
            placeholder="Enter Film Title"
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Input for Year */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Year
          </label>
          <input
            type="number"
            placeholder="Enter Year"
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Confirm Button */}
        <button
          className="flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 rounded-md transition-all duration-200"
          aria-label="Confirm"
        >
          Fetch
        </button>
      </div>
    </div>
  );
}

export default SearchTMDB;
