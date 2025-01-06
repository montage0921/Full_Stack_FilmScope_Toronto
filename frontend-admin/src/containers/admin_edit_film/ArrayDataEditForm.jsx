import React, { useState } from "react";
import ElementTag from "../../components/admin_edit_film/ElementTag";
import AddTagIcon from "../../components/icons/AddTagIcon";
import TagInput from "../../components/utils/TagInput";

function ArrayDataEditForm({ data, setter, name }) {
  const [addMode, setAddMode] = useState(false);

  const handleAddNew = () => {
    setAddMode(true);
  };

  return (
    <div className="w-[450px] my-5 ">
      <div className="flex justify-center text-xl font-semibold text-gray-800 border-b-2 mb-3 ">
        Edit {name}
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        {data?.map((element, index) => (
          <ElementTag
            key={index}
            element={element}
            data={data}
            setter={setter}
          />
        ))}
        {addMode && (
          <TagInput
            setter={setter}
            data={data}
            setAddMode={setAddMode}
          ></TagInput>
        )}
        <AddTagIcon size={50} handleFunction={handleAddNew} />
      </div>
    </div>
  );
}

export default ArrayDataEditForm;
