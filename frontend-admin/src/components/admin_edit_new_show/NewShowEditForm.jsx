import React, { useContext } from "react";
import { ShowDtoContext } from "../../containers/AddNewShowPage";
import TextInputShow from "../utils/TextInputShow";
import CheckBox from "../utils/CheckBox";
import { addNewShow } from "../../api/crudAPI";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";

function NewShowEditForm() {
  const { showDto, setShowDto } = useContext(ShowDtoContext);
  const navigate = useNavigate();

  const handleAddnewShow = async (e) => {
    e.preventDefault();
    if (showDto.showTitle === "") {
      toast.error("Show title is mandatory", {
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
    if (showDto.theatre === "") {
      toast.error("Theatre is mandatory", {
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
    try {
      await addNewShow(showDto);
      navigate(`/detailed-page-admin/${showDto.theatre}/${showDto.showTitle}`);
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
    }
  };

  const handleClearForm = () => {
    setShowDto({
      filmId: 0,
      theatre: "",
      showTitle: "",
      showtimes: {},
      filmTitle: "",
      director: "",
      releaseYear: 0,
      published: false,
      poster:
        "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlsbSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D",
      backdrop:
        "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });
  };

  return (
    <div
      className="mt-3 flex flex-col items-center w-full gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="text-4xl font-bold mb-3 text-gray-800">Add New Show</div>
      <div className="flex gap-3 relative">
        <button
          type="button"
          className="font-semibold transition-all duration-200 transform hover:scale-105 bg-white text-gray-900 p-1 rounded-lg mb-2 flex items-center space-x-2 group"
          onClick={handleAddnewShow}
        >
          Update
        </button>
        <button
          className="font-semibold transition-all duration-200 transform hover:scale-105 bg-white text-gray-900 p-1 rounded-lg mb-2 flex items-center space-x-2 group"
          onClick={handleClearForm}
        >
          Clear
        </button>
      </div>
      <TextInputShow
        keyName="showTitle"
        name="Show Title"
        showDto={showDto}
        setter={setShowDto}
      />
      <TextInputShow
        keyName="theatre"
        name="Theatre"
        showDto={showDto}
        setter={setShowDto}
      />
      <TextInputShow
        keyName="filmTitle"
        name="Film Title: "
        showDto={showDto}
        setter={setShowDto}
      />
      <TextInputShow
        keyName="director"
        name="Director"
        showDto={showDto}
        setter={setShowDto}
      />
      <TextInputShow
        type="number"
        keyName="releaseYear"
        name="Release Year"
        showDto={showDto}
        setter={setShowDto}
      />
      <CheckBox showDto={showDto} setter={setShowDto} />
      <TextInputShow
        keyName="poster"
        name="Poster URL"
        showDto={showDto}
        setter={setShowDto}
      />
      <TextInputShow
        keyName="backdrop"
        name="Backdrop URL"
        showDto={showDto}
        setter={setShowDto}
      />
    </div>
  );
}

export default NewShowEditForm;
