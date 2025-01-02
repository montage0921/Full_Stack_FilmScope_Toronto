import React, { useContext } from "react";
import ShowItem from "../components/ShowItem";
import { useState, useEffect } from "react";
import { LoginContext, SearchContext } from "../App";
import { LoginStatus } from "../utils/loginstatus";
import { fetchShowList } from "../api/crudAPI";

function ShowContainer() {
  const [showList, setShowList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const { loginStatus } = useContext(LoginContext);
  const { query, setQuery } = useContext(SearchContext);

  useEffect(() => {
    (async () => {
      if (loginStatus === LoginStatus.SUCCESS) {
        try {
          const data = await fetchShowList(pageSize);
          setShowList(data.showLists);
          setTotalItems(data.totalItems);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [loginStatus, pageSize]);

  const handleLoadMore = () => {
    setPageSize((pre) => pre + 10);
    setQuery("");
  };

  const filteredList = showList.filter(
    (show) =>
      show.showName.toLowerCase().includes(query.toLowerCase()) ||
      show.theatre.toLowerCase().includes(query.toLowerCase()) ||
      show.filmName.toLowerCase().includes(query.toLowerCase())
  );

  const deleteFromList = (showName, theatre) => {
    setShowList((prev) =>
      prev.filter(
        (show) => !(show.showName === showName && show.theatre === theatre)
      )
    );
  };

  return (
    <>
      {loginStatus === LoginStatus.SUCCESS ? (
        <div className="col-start-2 row-start-2 row-span-1 my-2">
          <div className="flex flex-col px-2 ">
            {filteredList
              .sort((a, b) => new Date(a.showDate[0]) - new Date(b.showDate[0]))
              .map((show) => (
                <ShowItem
                  key={show.id}
                  show={show}
                  deleteFromList={deleteFromList}
                ></ShowItem>
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
