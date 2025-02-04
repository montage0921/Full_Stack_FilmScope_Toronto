import React from "react";
import { deleteShow } from "../../api/crudAPI";
import { Link } from "react-router-dom";

function ShowItem({ show, deleteFromList }) {
  const handleDelete = async () => {
    await deleteShow(show.showName, show.theatre);
    deleteFromList(show.showName, show.theatre);
  };

  return (
    <div
      className="h-16 my-2 rounded-lg border-blue-300 border-2 
                flex items-center gap-4 px-5 font-libre
                hover:border-4"
    >
      <div className="w-1/6 ">{show.theatre}</div>

      <Link
        className="w-2/6 text-left hover:underline hover:text-blue-400 hover:font-semibold"
        to={`/detailed-page-admin/${show.theatre}/${show.showName}`}
      >
        {show.showName}
      </Link>
      <div className="w-2/6">{show.filmName}</div>
      <div className="w-1/6">{show.showDate[0]}</div>
      <button className="w-6 hover:text-red-500" onClick={handleDelete}>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 1024 1024"
          version="1.1"
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" />
          <path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" />
        </svg>
      </button>
    </div>
  );
}

export default ShowItem;
