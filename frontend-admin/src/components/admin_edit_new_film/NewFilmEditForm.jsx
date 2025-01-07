import React, { useContext, useEffect, useState } from "react";
import {
  ArrEditContext,
  MainContext,
  StrEditContext,
} from "../../containers/AddNewFilmPage";
import TextInputFilm from "../utils/TextInputFilm";
import NumberInputFilm from "../utils/NumberInputFilm";
import TextArea from "../utils/TextArea";
import ArrayDataEditForm from "../../containers/admin_edit_film/ArrayDataEditForm";
import SearchTMDB from "../../containers/admin_add_new_film/SearchTMDB";

function NewFilmEditForm() {
  const [isDropDown, setIsDropDown] = useState(false); // drop down for tmdb search
  const {
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
    poster,
    setPoster,
    backdrop,
    setBackdrop,
    overview,
    setOverview,
    filmId,
    setFilmId,
  } = useContext(StrEditContext);

  useEffect(() => {
    setIsDropDown(false);
  }, [title]); // if we get something, the title is a must-have, then the dropdown should close

  const { filmDto, setFilmDto } = useContext(MainContext);

  const {
    casts,
    setCasts,
    directors,
    setDirectors,
    languages,
    setLanguages,
    countries,
    setCountries,
    genres,
    setGenres,
  } = useContext(ArrEditContext);

  const handleAddNewFilm = async (e) => {
    e.preventDefault();
    // get a copy
    const deepCopyFilmDto = JSON.parse(JSON.stringify(filmDto));

    // update each field
    deepCopyFilmDto.title = title;
    deepCopyFilmDto.originalTitle = originalTitle;
    deepCopyFilmDto.releaseYear = year;
    deepCopyFilmDto.runtime = runtime;
    deepCopyFilmDto.imdbId = imdbId;
    deepCopyFilmDto.posterPath = poster;
    deepCopyFilmDto.backdropPath = backdrop;
    deepCopyFilmDto.casts = casts;
    deepCopyFilmDto.directors = directors;
    deepCopyFilmDto.languages = languages;
    deepCopyFilmDto.countries = countries;
    deepCopyFilmDto.overview = overview;
    deepCopyFilmDto.genres = genres;

    // update dto
    setFilmDto(deepCopyFilmDto);
    try {
      console.log("The movie has been successfully updated!");
      console.log(deepCopyFilmDto);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearForm = (e) => {
    e.preventDefault();
    e.preventDefault();
    setTitle("");
    setOriginalTitle("");
    setYear(0);
    setRuntime(0);
    setImdbId("");
    setFilmId("");
    setPoster(
      "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlsbSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D"
    );
    setBackdrop(
      "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
    setOverview("");
    setCasts([]);
    setDirectors([]);
    setLanguages([]);
    setCountries([]);
    setGenres([]);

    setFilmDto({
      ...filmDto, // Optional: Copy existing state if needed
      filmId: null,
      title: "",
      originalTitle: "",
      directors: [],
      casts: [],
      genres: [],
      releaseYear: 0,
      countries: [],
      languages: [],
      runtime: 0,
      filmId: null,
      posterPath:
        "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlsbSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D",
      overview: "",
      imdbId: null,
      backdropPath:
        "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });
  };

  return (
    <form
      className="mt-3 flex flex-col items-center w-full gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="text-4xl font-bold mb-3 text-gray-800">Add New Film</div>

      {/* Three Buttons */}
      <div className="flex gap-3 relative ">
        <button
          type="submit"
          className="font-semibold transition-all duration-200 transform hover:scale-105 bg-white text-gray-900 p-1 rounded-lg mb-2 flex items-center space-x-2 group"
          onClick={handleAddNewFilm}
        >
          Update
        </button>
        <button
          className="font-semibold transition-all duration-200 transform hover:scale-105 bg-white text-gray-900 p-1 rounded-lg mb-2 flex items-center space-x-2 group"
          onClick={handleClearForm}
        >
          Clear
        </button>
        <button
          className="font-semibold  transition-all duration-200 transform hover:scale-105 bg-white text-gray-900 p-1 rounded-lg mb-2 flex items-center space-x-2 group"
          onClick={() => {
            setIsDropDown(!isDropDown);
          }}
        >
          Search TMDB
        </button>
        {isDropDown && <SearchTMDB />}
      </div>

      <TextInputFilm
        name={"Titles: "}
        value={title}
        handleFunction={setTitle}
      ></TextInputFilm>

      <TextInputFilm
        name={"Original Title: "}
        value={originalTitle}
        handleFunction={setOriginalTitle}
      ></TextInputFilm>
      <div className="flex w-2/5 gap-24">
        <NumberInputFilm
          name={"Year: "}
          value={year}
          handleFunction={setYear}
          inputWidth={"w-3/5"}
        ></NumberInputFilm>
        <NumberInputFilm
          name={"Runtime: "}
          value={runtime}
          handleFunction={setRuntime}
          inputWidth={"w-3/5"}
        ></NumberInputFilm>
      </div>
      <TextInputFilm
        name={"IMDB ID: "}
        value={imdbId}
        handleFunction={setImdbId}
      ></TextInputFilm>
      <TextInputFilm
        name={"TMDB (Film) ID: "}
        value={filmId}
        handleFunction={setFilmId}
      ></TextInputFilm>
      <TextInputFilm
        name={"Poster URL: "}
        value={poster}
        handleFunction={setPoster}
      ></TextInputFilm>
      <TextInputFilm
        name={"Backdrop URL: "}
        value={backdrop}
        handleFunction={setBackdrop}
      ></TextInputFilm>
      <TextArea value={overview} handleFunction={setOverview} />

      {/* for data in array like casts, directors... */}
      <div className="mt-5">
        <ArrayDataEditForm data={casts} setter={setCasts} name="Casts" />
        <ArrayDataEditForm
          data={directors}
          setter={setDirectors}
          name="Directors"
        />
        <ArrayDataEditForm
          data={languages}
          setter={setLanguages}
          name="Languages"
        />
        <ArrayDataEditForm
          data={countries}
          setter={setCountries}
          name="Countries"
        />
        <ArrayDataEditForm data={genres} setter={setGenres} name="Genres" />
      </div>
    </form>
  );
}
export default NewFilmEditForm;
