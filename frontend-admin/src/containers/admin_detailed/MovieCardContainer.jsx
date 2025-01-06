import React, { useContext } from "react";
import { showDetailContext } from "../AdminDetail";
import MovieCard from "../../components/admin_detailedpage/MovieCard";
import Loading from "../../components/utils/Loading";

function MovieCardContainer() {
  const { showDetail, setShowDetail } = useContext(showDetailContext);

  if (showDetail?.detailedMovieInfo) {
    return (
      <div className="w-4/5">
        {showDetail?.detailedMovieInfo.map((movie) => (
          <MovieCard key={showDetail?.ids[0]} movie={movie} />
        ))}
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default MovieCardContainer;
