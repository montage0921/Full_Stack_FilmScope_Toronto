import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetailedShowInfo } from "../api/crudAPI";
import BakcDropContainer from "./admin_detailed/BakcDropContainer";
import MovieCardContainer from "./admin_detailed/MovieCardContainer";
import ShowTimeContainer from "./admin_detailed/ShowTimeContainer";
import ReturnButton from "../components/admin_detailedpage/ReturnButton";

export const showDetailContext = createContext();

function AdminDetail() {
  const { theatre, showname } = useParams();
  const [showDetail, setShowDetail] = useState({});

  useEffect(() => {
    const handleShowInfoFetch = async (showname, theatre) => {
      const showDetail = await getDetailedShowInfo(showname, theatre);
      setShowDetail(showDetail);
    };

    handleShowInfoFetch(showname, theatre);
  }, []);

  return (
    <showDetailContext.Provider value={{ showDetail, setShowDetail }}>
      <div className="relative">
        <BakcDropContainer />
        <ReturnButton />
        <div className="flex">
          <MovieCardContainer />
          <ShowTimeContainer />
        </div>
      </div>
    </showDetailContext.Provider>
  );
}

export default AdminDetail;
