import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useNavigate } from "react-router-dom";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "../../constants/Config";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState(null); // movie id of active trailer

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params: { page: 1 } });
        setMovieItems(response.results.slice(0, 4));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="mb-12 relative">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                isActive={isActive}
                onOpenTrailer={() => setActiveTrailer(item.id)}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItems.map((item) => (
        <TrailerModal
          key={item.id}
          item={item}
          active={activeTrailer === item.id}
          onClose={() => setActiveTrailer(null)}
        />
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, isActive, onOpenTrailer }) => {
  const navigate = useNavigate();
  const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);

  return (
    <div
      className="relative w-full py-36 bg-center bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>

      <div className="container mx-auto relative flex flex-col md:flex-row items-center md:items-start px-6 md:px-0 md:gap-x-12">
        <div
          className={`md:w-1/2 text-white space-y-6 transform transition-all duration-500 pl-8 md:pl-12 ${
            isActive ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold">{item.title}</h2>
          <p className="font-semibold tracking-wide">{item.overview}</p>
          <div className="flex space-x-4">
            <Button onClick={() => navigate(`/${Config.HOME_PAGE}/movie/${item.id}`)}>Watch now</Button>
            <OutlineButton onClick={onOpenTrailer}>Watch trailer</OutlineButton>
          </div>
        </div>

        <div
          className={`mt-6 md:mt-0 flex justify-center md:justify-start transform transition-transform duration-700 md:mr-6 ${
            isActive ? "scale-100" : "scale-0"
          }`}
        >
          <img
            src={apiConfig.w500Image(item.poster_path)}
            alt={item.title}
            className="w-80 md:w-96 rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item, active, onClose }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const loadTrailer = async () => {
      if (active) {
        const videos = await tmdbApi.getVideos(category.movie, item.id);
        if (videos.results.length > 0) {
          iframeRef.current.src = "https://www.youtube.com/embed/" + videos.results[0].key;
        } else {
          iframeRef.current.src = "";
          alert("No trailer available");
        }
      } else {
        iframeRef.current.src = "";
      }
    };
    loadTrailer();
  }, [active, item.id]);

  return (
    <Modal active={active} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose} active={active}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
