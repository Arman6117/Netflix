import Banner from "@/components/Banner";
import Header from "@/components/Header";
// import { useMovies } from "@/contexts/MovieContext";
import requests from "@/utils/requests";
const Home = async () => {
  const {
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  } = await getMoviesAndShows();

  console.log("The netflix originals array: " + netflixOriginals);
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <h1></h1>
      <Header />
      <main>
        <Banner netflixOriginals={netflixOriginals} />
      </main>
    </div>
  );
};

export default Home;
const getMoviesAndShows = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);
  // console.log(netflixOriginals);

  const moviesData = {
    netflixOriginals: netflixOriginals.results,
    trendingNow: trendingNow.results,
    topRated: topRated.results,
    actionMovies: actionMovies.results,
    comedyMovies: comedyMovies.results,
    horrorMovies: horrorMovies.results,
    romanceMovies: romanceMovies.results,
    documentaries: documentaries.results,
  };

  return moviesData;
};
