import React, { useContext } from "react";
import { showDetailContext } from "../AdminDetail";
import MovieCard from "../../components/admin_detailedpage/MovieCard";
import Loading from "../../components/utils/Loading";
import { Link } from "react-router-dom";
import AddTagIcon from "../../components/icons/AddTagIcon";

function MovieCardContainer() {
  const { showDetail, setShowDetail } = useContext(showDetailContext);

  if (showDetail?.detailedMovieInfo) {
    return (
      <div className="flex flex-col w-4/5 items-center">
        {showDetail?.detailedMovieInfo.map((movie, index) => (
          <MovieCard key={showDetail?.ids[index]} movie={movie} />
        ))}
        <Link
          className="mb-5 w-1/5"
          to={`/add-new-film/${showDetail.theatre}/${showDetail.showTitle}`}
        >
          <AddTagIcon size={50}></AddTagIcon>
        </Link>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default MovieCardContainer;
