import React from "react";
import { Link } from "react-router-dom";

function DashBoard() {
  return (
    <div
      className="bg-bgBlack row-start-1 row-span-2 col-span-1
                    px-4 py-2"
    >
      <div className="my-2 mb-4 flex justify-center items-center">
        <h1 className="text-3xl text-white font-bold">DashBoard</h1>
      </div>
      <hr />
      <Link to="add-new-show">122</Link>
    </div>
  );
}

export default DashBoard;
