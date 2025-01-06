import React, { useContext } from "react";
import { editContext } from "../EditShow";
import ShowEditForm from "../../components/admin_edit/ShowEditForm";
import ImageCard from "../../components/admin_edit/ImageCard";
import { Link } from "react-router-dom";

function FormContainer() {
  const { showDto, setShowDto } = useContext(editContext);
  return (
    <div className="relative bg-white/40  text-gray-800 backdrop-blur-lg rounded-lg shadow-lg w-3/5 h-4/5 font-libre p-4 overflow-auto">
      <Link
        to={`/detailed-page-admin/${showDto.theatre}/${showDto.showTitle}`}
        className="text-2xl font-semibold text-green-800"
      >
        Return
      </Link>
      <ImageCard></ImageCard>
      <ShowEditForm></ShowEditForm>
    </div>
  );
}

export default FormContainer;
