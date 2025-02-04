import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailedShowInfo } from "../api/crudAPI";
import FormContainNewFilm from "../containers/admin_add_new_film/FormContainNewFilm";

export const ArrEditContext = createContext();
export const StrEditContext = createContext();
export const MainContext = createContext();

function AddNewFilmPage() {
  const { theatre, showname } = useParams();
  const [showDetail, setShowDetail] = useState(null);
  // we ignore id and customId because they are auto-generated by database before insertion
  const [filmDto, setFilmDto] = useState({
    title: "",
    originalTitle: "",
    directors: [],
    casts: [],
    genres: [],
    releaseYear: 0,
    countries: [],
    languages: [],
    filmId: null,
    runtime: 0,
    posterPath:
      "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlsbSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D",
    overview: "",
    imdbId: null,
    backdropPath:
      "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });
  const [casts, setCasts] = useState(filmDto.casts);
  const [directors, setDirectors] = useState(filmDto.directors);
  const [countries, setCountries] = useState(filmDto.countries);
  const [genres, setGenres] = useState(filmDto.genres);
  const [languages, setLanguages] = useState(filmDto.languages);

  const [overview, setOverview] = useState(filmDto.overview);
  const [title, setTitle] = useState(filmDto.title);
  const [originalTitle, setOriginalTitle] = useState(filmDto.originalTitle);
  const [year, setYear] = useState(filmDto.releaseYear);
  const [runtime, setRuntime] = useState(filmDto.runtime);
  const [imdbId, setImdbId] = useState(filmDto.imdbId);
  const [backdrop, setBackdrop] = useState(filmDto.backdropPath);
  const [poster, setPoster] = useState(filmDto.posterPath);
  const [filmId, setFilmId] = useState(filmDto.filmId);

  // I get showDetial because it contains info that we need to sync the showtime table
  // when I add the film
  useEffect(() => {
    const fetchShowInfo = async (theatre, showname) => {
      try {
        const showDetailFetched = await getDetailedShowInfo(theatre, showname);
        setShowDetail(showDetailFetched);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShowInfo(showname, theatre);
  }, []);

  return (
    <MainContext.Provider
      value={{
        showname,
        theatre,
        filmDto,
        setFilmDto,
        showDetail,
        setShowDetail,
      }}
    >
      <StrEditContext.Provider
        value={{
          overview,
          setOverview,
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
          filmId,
          setFilmId,
          backdrop,
          setBackdrop,
          poster,
          setPoster,
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
            <FormContainNewFilm />
          </div>
        </ArrEditContext.Provider>
      </StrEditContext.Provider>
    </MainContext.Provider>
  );
}

export default AddNewFilmPage;
