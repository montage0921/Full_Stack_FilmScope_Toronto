import React, { createContext, useState } from "react";
import FormContainNewShow from "./admin_add_new_show/FormContainNewShow";

export const ShowDtoContext = createContext();

function AddNewShowPage() {
  const [showDto, setShowDto] = useState({
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

  return (
    <ShowDtoContext.Provider value={{ showDto, setShowDto }}>
      <div
        className="flex justify-center items-center w-screen h-screen bg-cover"
        style={{
          backgroundImage: `url("${showDto.backdrop}")`,
        }}
      >
        <FormContainNewShow />
      </div>
    </ShowDtoContext.Provider>
  );
}

export default AddNewShowPage;
