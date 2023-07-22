"use client";
import { baseUrl } from "@/constants/movie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

const Banner = ({ netflixOriginals }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  // console.log(movie);
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[80vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10 overflow-hidden">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          alt=""
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="banner_button">
          <FaPlay className="h-4 text-black  md:h-7 md:w-7" />
          More Info
        </button>
        <button className="banner_button">Play</button>
      </div>
    </div>
  );
};

export default Banner;
