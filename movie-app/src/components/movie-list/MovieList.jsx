import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category } from "./../../api/tmdbApi";

const MovieList = ({ category: cat, type, id }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (type !== "similar") {
        response =
          cat === category.movie
            ? await tmdbApi.getMoviesList(type, { params })
            : await tmdbApi.getTvList(type, { params });
      } else {
        response = await tmdbApi.similar(cat, id);
      }

      setItems(response.results);
    };
    getList();
  }, [cat, id, type]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="!w-[15%] md:!w-[30%] sm:!w-[40%]"
          >
            <MovieCard item={item} category={cat} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number,
};

export default MovieList;
