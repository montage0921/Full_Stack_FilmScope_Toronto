import React from "react";
import ShowItem from "../components/ShowItem";
import Filter from "../components/Filter";
import { useState, useEffect } from "react";
import apiAdmin from "../api";

function ShowContainer() {
  const [showList, setShowList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchShowList = async () => {
      try {
        const response = await apiAdmin.get(`/load?page=${pageNumber}&size=10`);
        console.log(response.data);
        setShowList(response.data);
      } catch (error) {
        console.error("Error fetchin show: ", error);
      }
    };

    fetchShowList();
  }, [pageNumber]);

  const dummy_data = [
    {
      theatre: "Paradise Theatre",
      ShowTitle: "Yi Yi",
      filmTitle: "一一",
      startDate: "2025-01-01",
    },
    {
      theatre: "TIFF",
      ShowTitle: "Advanced Screening: The room next door",
      filmTitle: "The Room Next Door",
      startDate: "2025-01-01",
    },
  ];

  return (
    <div className="bg-red-300 col-start-2 row-start-2 row-span-1">
      <Filter></Filter>
      <div className="flex flex-col px-2 ">
        {dummy_data.map((show, index) => (
          <ShowItem key={index} show={show}></ShowItem>
        ))}
        <button
          className="self-center w-36 h-10 border-blue-300 border-2 rounded-lg text-blue-300 font-bold
                           hover:bg-blue-300 hover:text-white hover:translate-y-1"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default ShowContainer;
