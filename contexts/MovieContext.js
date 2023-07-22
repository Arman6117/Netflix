'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { getMoviesAndShows } from "@/utils/requests";

const MoviesContext = createContext([]);

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //!FETCHING DATA HERE

    const fetchData = async () => {
      const {
        netflixOriginals,
        trendingShows,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
      } = await getMoviesAndShows(); //*Calling API function here to fetch the movies and shows

      setMovies({
        netflixOriginals:netflixOriginals.results,
        trendingShows:trendingShows.results,
        topRated:topRated.results,
        actionMovies:actionMovies.results,
        comedyMovies:comedyMovies.results,
        horrorMovies:horrorMovies.results,
        romanceMovies:romanceMovies.results,
        documentaries:documentaries.results,
      })
    };
    fetchData()
  },[]);

  return(
    <MoviesContext.Provider value={movies}>{children}</MoviesContext.Provider>
  )
};

export const useMovies = () =>{
    return useContext(MoviesContext)
}
