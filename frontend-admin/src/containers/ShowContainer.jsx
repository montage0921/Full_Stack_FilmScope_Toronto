import React, { useContext } from "react";
import ShowItem from "../components/ShowItem";
import Filter from "../components/Filter";
import { useState, useEffect } from "react";
import apiAdmin from "../api";
import { LoginContext } from "../App";
import { LoginStatus } from "../utils/loginstatus";
import { fetchShowList } from "../api/crudAPI";

function ShowContainer() {
  const [showList, setShowList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const { loginStatus } = useContext(LoginContext);

  useEffect(() => {
    const loadShowList = async () => {
      if (loginStatus === LoginStatus.SUCCESS) {
        try {
          const data = await fetchShowList(pageSize);
          setShowList(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadShowList();
  }, [loginStatus, pageSize]);

  return (
    <>
      {loginStatus === LoginStatus.SUCCESS ? (
        <div className="bg-red-300 col-start-2 row-start-2 row-span-1">
          <Filter></Filter>
          <div className="flex flex-col px-2 ">
            {showList.map((show, index) => (
              <div>nice </div>
            ))}
            <button
              className="self-center w-36 h-10 border-blue-300 border-2 rounded-lg text-blue-300 font-bold
                           hover:bg-blue-300 hover:text-white"
            >
              Load More
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-red-50"> Please Login </div>
      )}
    </>
  );
}

export default ShowContainer;
