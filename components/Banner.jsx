"use client";
import { baseUrl } from "@/constants/movie";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useStore } from "@/src/store";

const Banner = ({ netflixOriginals }) => {
  const [movie, setMovie] = useState(null);
  const setModal = useStore((state) => state.setModal);
  const setCurrentMovie = useStore((state) => state.setCurrentMovie);
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
      <h1 className="text-2xl lg:text-6xl md:text-4xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-lg">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="banner_button bg-white text-black">
          <FaPlay className="h-4 text-black  md:h-7 md:w-7" />
          Play
        </button>
        <button
          className="banner_button bg-[gray]/70"
          onClick={() => {
            setModal(true);

            setCurrentMovie(movie);
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Banner;
