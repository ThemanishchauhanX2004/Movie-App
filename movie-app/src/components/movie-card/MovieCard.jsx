import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "./../../constants/Config";

const MovieCard = ({ item, category: cat }) => {
  const link = `/${Config.HOME_PAGE}/${category[cat]}/${item.id}`;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link} className="group block">
      {/* 🎯 Card Container */}
      <div
        className="
          relative 
          rounded-2xl 
          overflow-hidden 
          pt-[100%]      /* ✅ Thodi height badhai (taller look) */
          max-w-[400px]  /* ✅ Width badhai (pehle 300px thi) */
          bg-center 
          bg-cover       /* ✅ Image poori area me fill kare */
          bg-no-repeat 
          shadow-md 
          hover:shadow-xl 
          transition-all 
          duration-300
        "
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Smooth overlay */}
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 rounded-2xl group-hover:opacity-80"></div>

        {/* Play button */}
        <Button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-300 group-hover:scale-100">
          <i className="bx bx-play text-lg"></i>
        </Button>
      </div>

      {/* Movie Title */}
      <h3 className="mt-3 text-lg font-semibold text-white truncate">
        {item.title || item.name}
      </h3>
    </Link>
  );
};

export default MovieCard;
