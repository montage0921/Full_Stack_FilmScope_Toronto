import React, { useContext } from "react";
import { StrEditContext } from "../../containers/EditFilm";

function FilmEditForm() {
  const { title, setTitle } = useContext(StrEditContext);
  return (
    <form className="mt-3 flex flex-col items-center">
      <div className="text-4xl font-bold mb-3 text-gray-800">Edit Film</div>
      <button
        type="submit"
        className="font-semibold text-xl transition-all duration-200 transform hover:scale-105 bg-white p-1 rounded-lg
        active:translate-y-1 active:text-green-900 active:bg-pink-200"
      >
        Update
      </button>
    </form>
  );
}

export default FilmEditForm;
