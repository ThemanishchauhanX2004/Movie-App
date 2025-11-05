import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const CastList = ({ id }) => {
  const { category } = useParams(); // "movie" ya "tv"
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const response = await tmdbApi.credits(category, id);
        setCasts(response.cast.slice(0, 10)); // top 10 actors
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      }
    };
    getCredits();
  }, [category, id]);

  return (
    <div className="relative w-full">
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>

  {/* Cast List */}
  <div className="casts flex gap-6 overflow-x-auto py-4 px-2 scrollbar-hide relative z-10">
    {casts.map((cast) => (
      <div
        key={cast.id}
        className="casts__item flex flex-col items-center min-w-[100px] hover:scale-105 transition-transform duration-300"
      >
        <div
          className="casts__item__img w-24 h-24 rounded-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              cast.profile_path
                ? apiConfig.w500Image(cast.profile_path)
                : "/fallback-profile.png"
            })`,
          }}
        ></div>
        <p className="casts__item__name text-white mt-2 text-center text-sm">
          {cast.name}
        </p>
      </div>
    ))}
  </div>
</div>

  );
};

export default CastList;
