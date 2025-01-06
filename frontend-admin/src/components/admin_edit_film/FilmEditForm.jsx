import React, { useContext } from "react";
import { MainContext, StrEditContext } from "../../containers/EditFilm";
import TextInputFilm from "../utils/TextInputFilm";
import { updateFilm } from "../../api/crudAPI";

function FilmEditForm() {
  const { customId, filmDto, setFilmDto } = useContext(MainContext);
  const { title, setTitle } = useContext(StrEditContext);

  const handleUpdateFilm = async (e) => {
    e.preventDefault();
    // get a copy
    const deepCopyFilmDto = JSON.parse(JSON.stringify(filmDto));

    // update each field
    deepCopyFilmDto.title = title;

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
    <form className="mt-3 flex flex-col items-center">
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
        inputWidth={"w-3/5"}
      ></TextInputFilm>
    </form>
  );
}

export default FilmEditForm;
