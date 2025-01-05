import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailedShowInfo } from "../api/crudAPI";
import FormContainer from "./admin_edit/FormContainer";

export const editContext = createContext();

function EditShow() {
  const { theatre, showname } = useParams();
  const [showDetail, setShowDetail] = useState(null);
  const [showDto, setShowDto] = useState({});
  const [showIds, setShowIds] = useState([]);

  useEffect(() => {
    const handleShowInfoFetch = async (showname, theatre) => {
      const showDetail = await getDetailedShowInfo(showname, theatre);
      setShowDetail(showDetail);
      setShowDto((prevShowDto) => ({
        ...prevShowDto,
        id: null,
        theatre: showDetail.theatre,
        showTitle: showDetail.showTitle,
        showtimes: showDetail.showtimes,
        filmTitle: "", // since it is designed to not edit this part, so they are set to be null
        director: "",
        releaseYear: "",
        filmId: 1,
        published: showDetail.published,
        poster: showDetail.poster,
        backdrop: showDetail.backdrop,
        customId: null,
      }));
      showDetail.ids && setShowIds(showDetail.ids);
    };

    handleShowInfoFetch(showname, theatre);
  }, []);
  console.log("from edit page", showDto);

  return (
    <editContext.Provider value={{ showDto, setShowDto, showIds }}>
      <div
        className="flex justify-center items-center w-screen h-screen"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${showDto.backdrop}")`,
        }}
      >
        <FormContainer />
      </div>
    </editContext.Provider>
  );
}

export default EditShow;
