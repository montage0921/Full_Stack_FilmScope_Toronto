import React, { useContext } from "react";
import { editContext } from "../../containers/EditShow";
import TextInput from "../utils/TextInput";
import SelectBox from "../utils/SelectBox";
import ShowTimeContainer from "../../containers/admin_edit/ShowTimeContainer";
import { updateShowAPI } from "../../api/crudAPI";
import { toast, Slide } from "react-toastify";

function ShowEditForm() {
  const { showDto, showIds } = useContext(editContext);

  const handleUpdateShowDto = async (e) => {
    e.preventDefault();
    try {
      if (!showDto.showTitle.trim())
        throw new Error("Show title cannot be null");
      if (!showDto.theatre.trim()) throw new Error("Theatre cannot be null");

      const updates = showIds.map((id) => updateShowAPI(id, showDto));
      await Promise.all(updates);
      toast.success("Show has been updated", {
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

  return (
    <form
      className="mt-3 flex flex-col items-center"
      onSubmit={handleUpdateShowDto}
    >
      <div className="text-4xl font-bold mb-3 text-gray-800">Edit Show</div>

      {/* submit the showDto (changed one) to the backend */}
      <button
        type="submit"
        className="font-semibold text-xl hover:text-green-600 hover:font-bold bg-white p-1 rounded-lg
        active:translate-y-1 active:text-green-900 active:bg-pink-200"
      >
        Update
      </button>

      <TextInput
        keyName="showTitle"
        value={showDto.showTitle}
        name="Show Title"
      ></TextInput>
      <TextInput
        keyName="theatre"
        value={showDto.theatre}
        name="Theatre"
      ></TextInput>
      <SelectBox
        keyName="published"
        value={showDto.published}
        name="publish?"
      ></SelectBox>
      <TextInput
        keyName="poster"
        value={showDto.poster}
        name="Poster URL"
      ></TextInput>
      <TextInput
        keyName="backdrop"
        value={showDto.backdrop}
        name="Backdrop URL"
      ></TextInput>
      <ShowTimeContainer></ShowTimeContainer>
    </form>
  );
}

export default ShowEditForm;
