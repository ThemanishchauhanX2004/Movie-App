import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "./../../assets/logo.png";
import * as Config from "./../../constants/Config";

const headerNav = [
  { display: "Home", path: `/${Config.HOME_PAGE}` },
  { display: "Movies", path: `/${Config.HOME_PAGE}/movie` },
  { display: "TV Series", path: `/${Config.HOME_PAGE}/tv` },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

 useEffect(() => {
  const shrinkHeader = () => {
    if (window.scrollY > 100) {
      headerRef.current.style.backgroundColor = "rgba(17, 24, 39, 0.95)"; // bg-gray-900/95
      headerRef.current.style.height = "4rem"; // h-16
    } else {
      headerRef.current.style.backgroundColor = "transparent";
      headerRef.current.style.height = "6rem"; // h-24
    }
  };

  window.addEventListener("scroll", shrinkHeader);
  return () => window.removeEventListener("scroll", shrinkHeader);
}, []);


  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 h-24 transition-all duration-300 bg-gray-900"
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-full mr-3 sm:w-8 sm:h-8 sm:mr-2"
          />
          <Link
            className="text-3xl font-semibold text-white"
            to={`/${Config.HOME_PAGE}`}
          >
            Movies
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-8 text-white">
          {headerNav.map((e, i) => (
            <li
              key={i}
              className={`relative font-bold text-2xl transition-all duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full ${
                i === active ? "after:w-full text-red-500" : "text-white hover:text-red-400"
              }`}
            >
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Nav */}
        <ul className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-gray-900/95 shadow flex items-center justify-between px-8 text-white">
          {headerNav.map((e, i) => (
            <li key={i} className="text-center flex-1">
              <Link
                to={e.path}
                className={`font-bold text-lg relative after:content-[''] after:absolute after:left-0 after:bottom-2 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full ${
                  i === active ? "after:w-full text-red-500" : "text-white hover:text-red-400"
                }`}
              >
                {e.display}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
