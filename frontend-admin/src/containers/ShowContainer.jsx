import React, { useContext } from "react";
import ShowItem from "../components/ShowItem";
import Filter from "../components/Filter";
import { useState, useEffect } from "react";
import { LoginContext } from "../App";
import { LoginStatus } from "../utils/loginstatus";
import { fetchShowList } from "../api/crudAPI";

function ShowContainer() {
  const [showList, setShowList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const { loginStatus } = useContext(LoginContext);

  useEffect(() => {
    const loadShowList = async () => {
      if (loginStatus === LoginStatus.SUCCESS) {
        try {
          const data = await fetchShowList(pageSize);
          setShowList(data.showLists);
          setTotalItems(data.totalItems);
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadShowList();
  }, [loginStatus, pageSize]);

  const handleLoadMore = () => {
    setPageSize((pre) => pre + 10);
  };

  return (
    <>
      {loginStatus === LoginStatus.SUCCESS ? (
        <div className="col-start-2 row-start-2 row-span-1 mb-2">
          <Filter></Filter>
          <div className="flex flex-col px-2 ">
            {showList
              .sort((a, b) => new Date(a.showDate[0]) - new Date(b.showDate[0]))
              .map((show) => (
                <ShowItem key={show.id} show={show}></ShowItem>
              ))}
            {pageSize < totalItems && (
              <button
                className="self-center w-36 h-10  border-blue-300 border-2 rounded-lg text-blue-300 font-bold
                           hover:bg-blue-300 hover:text-white"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-red-50"> Please Login </div>
      )}
    </>
  );
}

export default ShowContainer;
