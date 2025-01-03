import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetailedShowInfo } from "../api/crudAPI";
import BakcDropContainer from "./admin_detailed/BakcDropContainer";

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
    <div>
      <BakcDropContainer />
    </div>
  );
}

export default AdminDetail;
