import React, { useState } from "react";
import { searchTMDB } from "../../api/crudAPI";
import { useContext } from "react";
import { StrEditContext, ArrEditContext } from "../AddNewFilmPage";

function SearchTMDB() {
  const [filmTitleQuery, setFilmTitleQuery] = useState("");
  const [yearQuery, setYearQuery] = useState("");
  const {
    setTitle,
    setOriginalTitle,
    setYear,
    setRuntime,
    setImdbId,
    setPoster,
    setBackdrop,
    setOverview,
    setFilmId,
  } = useContext(StrEditContext);

  const { setCasts, setDirectors, setLanguages, setCountries, setGenres } =
    useContext(ArrEditContext);

  const handleSearchTMDB = async (e) => {
    e.preventDefault();
    try {
      const data = await searchTMDB(filmTitleQuery, yearQuery);
      const film_info = data.film_info;
      setBackdrop(film_info.backdrop_path);
      setCasts(film_info.casts);
      setCountries(film_info.countries);
      setDirectors(film_info.directors);
      setFilmId(film_info.film_id);
      setLanguages(film_info.languages);
      setOriginalTitle(film_info.original_title);
      setOverview(film_info.overview);
      setPoster(film_info.poster_path);
      setYear(film_info.release_year);
      setRuntime(film_info.runtime);
      setTitle(film_info.title);
      setGenres(film_info.genres);
      setImdbId(film_info.imdb_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="absolute right-[-420px] top-[-40px]  mt-2 flex items-center gap-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg w-[400px]">
        {/* Input for Film Title */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Film Title
          </label>
          <input
            type="text"
            placeholder="Enter Film Title"
            value={filmTitleQuery}
            onChange={(e) => setFilmTitleQuery(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Input for Year */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Year
          </label>
          <input
            type="number"
            placeholder="Enter Year"
            value={yearQuery}
            onChange={(e) => {
              setYearQuery(e.target.value);
            }}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Confirm Button */}
        <button
          className="flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 rounded-md transition-all duration-200"
          aria-label="Confirm"
          onClick={handleSearchTMDB}
        >
          Fetch
        </button>
      </div>
    </div>
  );
}

export default SearchTMDB;
