import React from "react";
import { Link } from "react-router-dom";

import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/logo.png";
import * as Config from "../../constants/Config";

const Footer = () => {
  return (
    <div
      className="relative bg-top bg-no-repeat bg-cover py-[5rem] px-[1rem]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-[1000px] mx-auto text-white">
        {/* Logo */}
        <div className="flex items-center justify-center mb-[3rem]">
          <img
            src={logo}
            alt="logo"
            className="h-16 w-16 object-contain mr-3 rounded-full"
          />
          <Link
            to={`/${Config.HOME_PAGE}`}
            className="text-3xl font-bold tracking-wide"
          >
            Movies
          </Link>
        </div>

        {/* Menus */}
        <div className="grid grid-cols-3 gap-8 sm:grid-cols-3 mobile:grid-cols-2">
          {/* First Menu */}
          <div className="flex flex-col items-start mt-[1rem] text-[1.5rem] font-semibold space-y-[1rem]">
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              Home
            </Link>
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              Contact us
            </Link>
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              Terms of service
            </Link>
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              About us
            </Link>
          </div>

          {/* Second Menu */}
          <div className="flex flex-col items-start mt-[1rem] text-[1.5rem] font-semibold space-y-[1rem]">
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              Live
            </Link>
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              FAQ
            </Link>
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              Premium
            </Link>
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              Privacy policy
            </Link>
          </div>

          {/* Third Menu */}
          <div className="flex flex-col items-start mt-[1rem] text-[1.5rem] font-semibold space-y-[1rem]">
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              You must watch
            </Link>
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              Recent release
            </Link>
            <Link to={`/${Config.HOME_PAGE}`} className="hover:text-red-500 transition">
              Top IMDB
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 text-center text-sm text-gray-400">
          &copy; 2025 Movies. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
