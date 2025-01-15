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
import {
  addNewFilm,
  deleteShowById,
  fetchCustomId,
  syncShowWithNewFilm,
} from "../../api/crudAPI";
import { toast, Slide } from "react-toastify";

function NewFilmEditForm() {
  const [isDropDown, setIsDropDown] = useState(false); // dropdown state

  const { setFilmDto, showDetail } = useContext(MainContext);

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

  // Close dropdown when title changes
  useEffect(() => {
    setIsDropDown(false);
  }, [title]);

  const handleAddNewFilm = async (e) => {
    e.preventDefault();

    if (title === "") {
      toast.error("Must enter a title", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    // Construct the new film data object
    const newFilmDto = {
      filmId, // Ensure this is correctly set and unique
      title,
      originalTitle,
      releaseYear: year,
      runtime,
      imdbId,
      posterPath: poster,
      backdropPath: backdrop,
      casts,
      directors,
      languages,
      countries,
      overview,
      genres,
      // Add other necessary fields if any
    };

    try {
      // Send the new film data to the backend
      await addNewFilm(newFilmDto);
      const customId = await fetchCustomId(
        newFilmDto.title,
        newFilmDto.releaseYear
      );
      const showDto = {
        theatre: showDetail.theatre,
        showTitle: showDetail.showTitle,
        showtimes: showDetail.showtimes,
        filmTitle: title,
        director: directors[0],
        releaseYear: year,
        filmId,
        published: showDetail.published,
        poster,
        backdrop,
        customId,
      };
      // when a new show is created, there is a record in database that most fields are empty
      // when add a new film for this kind of show, it add a new record with film info
      // so after successfully add the film, we need to delete the first record with empty fields
      await syncShowWithNewFilm(showDto);
      if (showDetail.customIds[0] === null) {
        await deleteShowById(showDetail.ids[0]);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      // Optionally, display an error message to the user
    }
  };

  const handleClearForm = (e) => {
    e.preventDefault();
    // Clear all individual states and filmDto
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
      filmId: null,
      title: "",
      originalTitle: "",
      releaseYear: 0,
      runtime: 0,
      imdbId: null,
      posterPath:
        "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlsbSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D",
      backdropPath:
        "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      overview: "",
      casts: [],
      directors: [],
      genres: [],
      countries: [],
      languages: [],
    });
  };

  return (
    <div
      className="mt-3 flex flex-col items-center w-full gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="text-4xl font-bold mb-3 text-gray-800">Add New Film</div>

      {/* Three Buttons */}
      <div className="flex gap-3 relative">
        <button
          type="button"
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

      {/* Array fields */}
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
    </div>
  );
}

export default NewFilmEditForm;
