import React, { useContext, useEffect, useState } from "react";
import { showDetailContext } from "./AdminDetail";
import { useParams } from "react-router-dom";
import { getFilm } from "../api/crudAPI";

function EditFilm() {
  const { customId, showname, theatre } = useParams();
  const [filmDto, setFilmDto] = useState(null);

  useEffect(() => {
    const getFilmAPI = async (customId) => {
      try {
        const newFilmDto = await getFilm(customId);
        setFilmDto(newFilmDto);
      } catch (error) {
        console.log(error);
      }
    };

    getFilmAPI(customId);
  }, []);

  //   console.log(customId, showname, theatre);
  return <div>{filmDto && console.log(filmDto)}</div>;
}

export default EditFilm;
