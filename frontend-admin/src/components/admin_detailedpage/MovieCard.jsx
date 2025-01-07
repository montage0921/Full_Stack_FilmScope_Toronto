import React, { useContext } from "react";
import { showDetailContext } from "../../containers/AdminDetail";
import LabeledText from "../utils/LabeledText";
import { Link } from "react-router-dom";
import { deleteFilm, getDetailedShowInfo } from "../../api/crudAPI";

function MovieCard({ movie }) {
  const { showDetail, setShowDetail } = useContext(showDetailContext);

  const handleDeleteFilm = async (e) => {
    e.preventDefault();

    if (showDetail.detailedMovieInfo.length <= 1) {
      alert("You cannot delete the only film in this show!");
      return;
    }

    try {
      // Delete the film
      await deleteFilm(movie.customId, showDetail.theatre);
      console.log("The film is deleted successfully!");

      // Fetch updated show details
      const newShowDetail = await getDetailedShowInfo(
        showDetail.showTitle,
        showDetail.theatre
      );
      setShowDetail(newShowDetail);

      alert("Film deleted successfully!");
    } catch (error) {
      console.error(
        "Failed to delete the film or update the show detail:",
        error
      );
      alert(
        "An error occurred while deleting the film. Please try again later."
      );
    }
  };

  return (
    <div className="px-5 md:px-20 lg:px-56 py-10 flex gap-5 font-libre">
      <img className="h-full w-2/5" src={movie.posterPath} alt="" />
      <div className="relative flex flex-col gap-3">
        <div>
          <div className="text-4xl font-bold flex gap-5">
            {movie.title}
            <button
              className="bg-red-300 text-sm text-white font-semibold w-20 h-8 self-center rounded-lg
              transition-all duration-300 transform hover:scale-105 hover:bg-red-500"
              onClick={handleDeleteFilm}
            >
              Delete
            </button>
            <Link
              to={`/detailed-page-admin/${movie.customId}/${showDetail.showTitle}/${showDetail.theatre}/edit`}
              className="bg-green-400 text-white text-sm self-center flex justify-center items-center 
              font-semibold w-20 h-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-500"
            >
              Edit
            </Link>
          </div>
          {movie.title.trim() !== movie.originalTitle.trim() && (
            <div className="text-3xl font-semibold text-gray-600">
              {movie.originalTitle}
            </div>
          )}
        </div>

        <div className="h-full flex flex-col justify-between text-base">
          <div>
            <LabeledText text="Year: "></LabeledText>
            {movie.releaseYear}
          </div>
          <div>
            <LabeledText text="Runtime: "></LabeledText>
            {movie.runtime} min
          </div>
          <div>
            <LabeledText text="Director: "></LabeledText>
            {movie.directors.join("/")}
          </div>
          <div>
            <LabeledText text="Casts: "></LabeledText>
            {movie.casts.join("/")}
          </div>
          <div>
            <LabeledText text="Genres: "></LabeledText>
            {movie.genres.join("/")}
          </div>
          <div>
            <LabeledText text="Languages: "></LabeledText>
            {movie.languages.join("/")}
          </div>
          <div>
            <LabeledText text="Countries: "></LabeledText>
            {movie.countries.join("/")}
          </div>
          <div>
            <LabeledText text="Overview: "></LabeledText>
            <div>{movie.overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
