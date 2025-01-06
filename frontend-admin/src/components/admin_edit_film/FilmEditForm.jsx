import React, { useContext } from "react";
import {
  ArrEditContext,
  MainContext,
  StrEditContext,
} from "../../containers/EditFilm";
import TextInputFilm from "../utils/TextInputFilm";
import { updateFilm } from "../../api/crudAPI";
import NumberInputFilm from "../utils/NumberInputFilm";
import ArrayDataEditForm from "../../containers/admin_edit_film/ArrayDataEditForm";
import TextArea from "../utils/TextArea";

function FilmEditForm() {
  const { customId, filmDto, setFilmDto } = useContext(MainContext);
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
  } = useContext(StrEditContext);

  const {
    casts,
    setCasts,
    directors,
    setDirectors,
    languages,
    setLanguages,
    countries,
    setCountries,
  } = useContext(ArrEditContext);

  const handleUpdateFilm = async (e) => {
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

    // update dto
    setFilmDto(deepCopyFilmDto);
    try {
      await updateFilm(customId, deepCopyFilmDto);
      console.log("The movie has been successfully updated!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="mt-3 flex flex-col items-center w-full gap-2">
      <div className="text-4xl font-bold mb-3 text-gray-800">Edit Film</div>
      <button
        type="submit"
        className="font-semibold text-xl transition-all duration-200 transform hover:scale-105 bg-white p-1 rounded-lg
        active:translate-y-1 active:text-green-900 active:bg-pink-200 mb-2"
        onClick={handleUpdateFilm}
      >
        Update
      </button>

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
      </div>
    </form>
  );
}

export default FilmEditForm;
