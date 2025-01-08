import React from "react";
import PosterCardNewShow from "../../components/admin_edit_new_show/PosterCardNewShow";
import NewShowEditForm from "../../components/admin_edit_new_show/NewShowEditForm";
import { Link } from "react-router-dom";

function FormContainNewShow() {
  return (
    <div className="relative bg-white/40  text-gray-800 backdrop-blur-lg rounded-lg shadow-lg w-3/5 h-4/5 font-libre p-4 overflow-auto">
      <Link to="/" className="text-2xl font-semibold text-green-800">
        Return
      </Link>
      <PosterCardNewShow />
      <NewShowEditForm />
    </div>
  );
}

export default FormContainNewShow;
