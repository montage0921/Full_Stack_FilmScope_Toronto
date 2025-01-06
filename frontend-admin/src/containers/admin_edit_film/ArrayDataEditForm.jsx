import React from "react";
import ElementTag from "../../components/admin_edit_film/ElementTag";

function ArrayDataEditForm({ data, setter, name }) {
  return (
    <div className="w-[450px] ">
      <div className="flex justify-center text-xl font-semibold text-gray-800 border-b-2 mb-3">
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
      </div>
    </div>
  );
}

export default ArrayDataEditForm;
