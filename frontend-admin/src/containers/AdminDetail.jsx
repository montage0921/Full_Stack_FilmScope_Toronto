import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetailedShowInfo } from "../api/crudAPI";

function AdminDetail() {
  const { theatre, showname } = useParams();

  useEffect(() => {
    const handleShowInfoFetch = async (showname, theatre) => {
      await getDetailedShowInfo(showname, theatre);
    };

    handleShowInfoFetch(showname, theatre);
  }, []);

  return <div>{`${theatre} ${showname}`}</div>;
}

export default AdminDetail;
