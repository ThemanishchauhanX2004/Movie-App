import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MovieCard from "./../movie-card/MovieCard";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

import * as Config from "./../../constants/Config";

const MovieGrid = ({ category: cat }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (!keyword) {
        const params = {};
        response =
          cat === category.movie
            ? await tmdbApi.getMoviesList(movieType.upcoming, { params })
            : await tmdbApi.getTvList(tvType.popular, { params });
      } else {
        const params = { query: keyword };
        response = await tmdbApi.search(cat, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [keyword, cat]);

  const loadMore = async () => {
    let response = null;
    const params = { page: page + 1 };
    if (keyword) params.query = keyword;

    response =
      !keyword
        ? cat === category.movie
          ? await tmdbApi.getMoviesList(movieType.upcoming, { params })
          : await tmdbApi.getTvList(tvType.popular, { params })
        : await tmdbApi.search(cat, { params });

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <MovieSearch category={cat} keyword={keyword} />
      </div>

      {/* Movie Grid */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] mb-8">
        {items.map((item, idx) => (
          <MovieCard key={idx} category={cat} item={item} />
        ))}
      </div>

      {/* Load More */}
      {page < totalPage && (
        <div className="text-center">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      )}
    </>
  );
};

const MovieSearch = ({ category: cat, keyword: initialKeyword = "" }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialKeyword);

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${Config.HOME_PAGE}/${category[cat]}/search/${keyword}`);
    }
  }, [keyword, cat, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      if (e.key === "Enter") {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => document.removeEventListener("keyup", enterEvent);
  }, [goToSearch]);

  return (
    <div className="flex justify-center items-center gap-4 w-full max-w-3xl mx-auto">
      {/* Input Box */}
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 px-5 py-3 text-lg rounded-lg"
      />

      {/* Search Button */}
      <Button
        onClick={goToSearch}
        className="px-8 py-1.5 text-lg rounded-lg flex justify-center items-center"
      >
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
