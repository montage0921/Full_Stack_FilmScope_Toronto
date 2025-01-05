import React, { useContext } from "react";
import { editContext } from "../../containers/EditShow";

function ImageCard() {
  const { showDto } = useContext(editContext);
  return (
    <div className="absolute top-20 left-[100px]">
      <img
        className=" bg-orange-200 w-[150px] h-[225px] rounded-lg"
        src={`https://image.tmdb.org/t/p/w300/${showDto.poster}`}
        alt={showDto.showTitle}
      />
    </div>
  );
}

export default ImageCard;
