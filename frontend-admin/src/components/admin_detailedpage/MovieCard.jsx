import React, { useContext, useState } from "react";
import { showDetailContext } from "../../containers/AdminDetail";
import { Link } from "react-router-dom";
import { deleteFilm, getDetailedShowInfo } from "../../api/crudAPI";
import { toast, Slide } from "react-toastify";
import TagDetailPage from "./TagDetailPage";

function MovieCard({ movie }) {
  const { showDetail, setShowDetail } = useContext(showDetailContext);
  const [activeTab, setActiveTab] = useState("Overview");

  const handleDeleteFilm = async (e) => {
    e.preventDefault();

    if (showDetail.detailedMovieInfo.length <= 1) {
      toast.error("Sorry bu you can't delete your only film", {
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
      return;
    }

    try {
      // Delete the film
      await deleteFilm(movie.customId, showDetail.theatre);

      // Fetch updated show details
      const newShowDetail = await getDetailedShowInfo(
        showDetail.showTitle,
        showDetail.theatre
      );
      setShowDetail(newShowDetail);

      toast.success("🎉The film is deleted successfully!", {
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
    <div className=" md:px-20 lg:px-26 py-10 flex gap-5 font-libre">
      <img
        className="w-[150px] h-[225px] border border-gray-400 rounded-sm object-cover"
        src={movie.posterPath}
        alt=""
      />

      <div className="relative flex flex-col gap-3 ">
        <div>
          <div className="text-4xl font-bold flex gap-5">{movie.title}</div>
          {movie.title.trim() !== movie.originalTitle.trim() && (
            <div className="text-3xl font-semibold text-gray-600">
              {movie.originalTitle}
            </div>
          )}
          <div className="flex gap-2 mt-1">
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
        </div>

        {/* Tabs */}
        <div className="flex">
          {["Overview", "Director/Casts", "Detail"].map((tab) => (
            <buton
              key={tab}
              className={`px-16 border-b-2 hover:border-b-2 hover:border-green-600 hover:text-green-600 hover:cursor-pointer
              ${
                activeTab === tab
                  ? "border-green-600 text-green-600"
                  : "border-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </buton>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-[620px] min-h-[100px] text-gray-600">
          {/* Overview */}
          {activeTab === "Overview" && movie.overview}
          {/* Director/Casts */}
          {activeTab === "Director/Casts" && (
            <div className="flex flex-col gap-2">
              <div className="flex items-end">
                <div>Director</div>
                <div className="flex-grow border-b border-dotted border-gray-600 mx-1"></div>
                <div className="w-60 flex flex-wrap gap-1">
                  {movie.directors.map((obj) => (
                    <TagDetailPage key={obj} name={obj} />
                  ))}
                </div>
              </div>
              <div className="flex items-end">
                <div>Casts</div>
                <div className="flex-grow border-t border-dotted border-t-gray-600 mx-1"></div>
                <div className="w-60 flex flex-wrap gap-1">
                  {movie.casts.map((obj) => (
                    <TagDetailPage key={obj} name={obj} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Detail */}
          {activeTab === "Detail" && (
            <div className="flex flex-col gap-2">
              <div className="flex items-end">
                <div>Release Year</div>
                <div className="flex-grow border-b border-dotted border-gray-600 mx-1"></div>
                <div className="w-60 flex flex-wrap gap-1">
                  {movie.releaseYear}
                </div>
              </div>
              <div className="flex items-end">
                <div>Runtime</div>
                <div className="flex-grow border-b border-dotted border-gray-600 mx-1"></div>
                <div className="w-60 flex flex-wrap gap-1">
                  {movie.runtime}min
                </div>
              </div>
              <div className="flex items-end">
                <div>Languages</div>
                <div className="flex-grow border-t border-dotted border-t-gray-600 mx-1"></div>
                <div className="w-60 flex flex-wrap gap-1">
                  {movie.languages.map((obj) => (
                    <TagDetailPage key={obj} name={obj} />
                  ))}
                </div>
              </div>
              <div className="flex items-end">
                <div>Genres</div>
                <div className="flex-grow border-t border-dotted border-t-gray-600 mx-1"></div>
                <div className="w-60 flex flex-wrap gap-1">
                  {movie.genres.map((obj) => (
                    <TagDetailPage key={obj} name={obj} />
                  ))}
                </div>
              </div>
              <div className="flex items-end">
                <div>Countries</div>
                <div className="flex-grow border-t border-dotted border-t-gray-600 mx-1"></div>
                <div className="w-60 flex flex-wrap gap-1">
                  {movie.countries.map((obj) => (
                    <TagDetailPage key={obj} name={obj} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
