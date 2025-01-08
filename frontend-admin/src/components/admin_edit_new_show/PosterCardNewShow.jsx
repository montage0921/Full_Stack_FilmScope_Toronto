import React, { useContext } from "react";
import { ShowDtoContext } from "../../containers/AddNewShowPage";

function PosterCardNewShow() {
  const { showDto, setShowDto } = useContext(ShowDtoContext);
  return (
    <div className="absolute top-20 left-[100px]">
      <img
        className=" bg-orange-200 w-[150px] h-[225px] rounded-lg"
        src={showDto.poster}
        alt={"title"}
      />
    </div>
  );
}

export default PosterCardNewShow;
