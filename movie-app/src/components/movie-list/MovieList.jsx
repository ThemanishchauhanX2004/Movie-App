// MovieList.jsx
import React, { useState, useEffect } from "react";
import tmdbApi, { category as cate } from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";

const MovieList = ({ category, type }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        let response = null;

        // Normal movie or TV list
        if (type !== "similar") {
          response = await tmdbApi.getMoviesList(type, { params: {} });
        } 
        // Agar "similar" type ho (optional)
        else {
          // response = await tmdbApi.similarMovies(id);
        }

        setItems(response.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    getList(); // API call on component mount
  }, [category, type]); // run again only if category/type changes

  return (
    <div className="movie-list grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <MovieCard key={item.id} item={item} category={category} />
      ))}
    </div>
  );
};

export default MovieList;
