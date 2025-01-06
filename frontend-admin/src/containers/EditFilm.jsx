import React, { createContext, useEffect, useState } from "react";
import { showDetailContext } from "./AdminDetail";
import { useParams } from "react-router-dom";
import { getFilm } from "../api/crudAPI";
import FormContainFilm from "./admin_edit_film/FormContainFilm";

export const ArrEditContext = createContext();
export const StrEditContext = createContext();
export const MainContext = createContext();

function EditFilm() {
  const { customId, showname, theatre } = useParams();
  const [filmDto, setFilmDto] = useState(null);
  const [casts, setCasts] = useState(null);
  const [directors, setDirectors] = useState(null);
  const [countries, setCountries] = useState(null);
  const [genres, setGenres] = useState(null);
  const [languages, setLanguages] = useState(null);

  const [overView, setOverView] = useState(null);
  const [title, setTitle] = useState(null);
  const [originalTitle, setOriginalTitle] = useState(null);
  const [year, setYear] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const [imdbId, setImdbId] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const getFilmAPI = async (customId) => {
      try {
        const newFilmDto = await getFilm(customId);
        setFilmDto(newFilmDto);
        setCasts(newFilmDto?.casts);
        setCountries(newFilmDto?.countries);
        setDirectors(newFilmDto?.directors);
        setGenres(newFilmDto?.genres);
        setImdbId(newFilmDto?.imdbId);
        setLanguages(newFilmDto?.languages);
        setOriginalTitle(newFilmDto?.originalTitle);
        setOverView(newFilmDto?.overView);
        setYear(newFilmDto?.releaseYear);
        setRuntime(newFilmDto?.runtime);
        setTitle(newFilmDto?.title);
        setPoster(newFilmDto?.posterPath);
        setBackdrop(newFilmDto?.backdropPath);
        console.log(newFilmDto);
      } catch (error) {
        console.log(error);
      }
    };

    getFilmAPI(customId);
  }, []);

  //   console.log(customId, showname, theatre);

  return (
    <MainContext.Provider
      value={{ showname, theatre, filmDto, setFilmDto, customId }}
    >
      <StrEditContext.Provider
        value={{
          overView,
          setOverView,
          title,
          setTitle,
          originalTitle,
          setOriginalTitle,
          year,
          setYear,
          runtime,
          setRuntime,
          imdbId,
          setImdbId,
          backdrop,
          setBackdrop,
          poster,
          setPoster,
          filmDto,
          setFilmDto,
        }}
      >
        <ArrEditContext.Provider
          value={{
            casts,
            setCasts,
            directors,
            setDirectors,
            countries,
            setCountries,
            genres,
            setGenres,
            languages,
            setLanguages,
          }}
        >
          <div
            className="flex justify-center items-center w-screen h-screen bg-cover"
            style={{
              backgroundImage: `url("${backdrop}")`,
            }}
          >
            <FormContainFilm />
          </div>
        </ArrEditContext.Provider>
      </StrEditContext.Provider>
    </MainContext.Provider>
  );
}

export default EditFilm;
