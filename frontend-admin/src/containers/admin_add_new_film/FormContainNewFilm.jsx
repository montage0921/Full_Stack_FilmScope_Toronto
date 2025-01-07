import React, { useContext } from "react";
import { MainContext } from "../AddNewFilmPage";
import { Link } from "react-router-dom";
import PosterCardNewFilm from "../../components/admin_edit_new_film/PosterCardNewFilm";
import NewFilmEditForm from "../../components/admin_edit_new_film/NewFilmEditForm";

function FormContainNewFilm() {
  const { showname, theatre } = useContext(MainContext);
  return (
    <div className="relative bg-white/40  text-gray-800 backdrop-blur-lg rounded-lg shadow-lg w-3/5 h-4/5 font-libre p-4 overflow-auto">
      <Link
        to={`/detailed-page-admin/${theatre}/${showname}`}
        className="text-2xl font-semibold text-green-800"
      >
        Return
      </Link>
      <PosterCardNewFilm />
      <NewFilmEditForm />
    </div>
  );
}

export default FormContainNewFilm;
