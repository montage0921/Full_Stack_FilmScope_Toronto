import React, { useContext } from "react";
import { showDetailContext } from "../../containers/AdminDetail";
import LabeledText from "../utils/LabeledText";

function MovieCard({ movie }) {
  const { showDetail, setShowDetail } = useContext(showDetailContext);
  return (
    <div className="px-5 md:px-20 lg:px-56 py-10 mb-9 flex gap-5 font-libre">
      <img src={`https://image.tmdb.org/t/p/w300/${movie.posterPath}`} alt="" />

      <div className="flex flex-col gap-3">
        <div>
          <div className="text-5xl font-bold">{movie.title}</div>
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
