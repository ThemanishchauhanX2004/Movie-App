import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "../../components/movie-list/MovieList";

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          {/* ---------------- Banner ---------------- */}
          <div
            className="relative h-[50vh] bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          >
            
           {/* Top Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Bottom Blend Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>

            
          </div>

          {/* ---------------- Movie Content ---------------- */}
          <div className="relative flex flex-col md:flex-row items-start max-w-[1260px] mx-auto mt-[-200px] px-8 gap-8">
            {/* Poster */}
            <div className="flex-1 hidden md:block">
              <div
                className="bg-center bg-cover bg-no-repeat rounded-lg pt-[165%]"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>

            {/* Info Section */}
            <div className="md:w-[70%] w-full md:pl-8 flex-1 space-y-8">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {item.title || item.name}
              </h1>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border-2 border-white rounded-lg text-sm font-semibold bg-[#1a1a1a]"
                    >
                      {genre.name}
                    </span>
                  ))}
              </div>

              {/* Overview */}
              <p className="text-base leading-relaxed tracking-wide">
                {item.overview}
              </p>

              {/* Casts */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Casts</h2>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          {/* ---------------- Videos & Similar ---------------- */}
          <div className="max-w-[1260px] mx-auto px-8 space-y-12 my-12">
            {/* Videos */}
            <div>
              <VideoList id={item.id} />
            </div>

            {/* Similar Movies */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Similar Movies
              </h2>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
