import { useStore } from '@/src/store';
import Image from 'next/image'
import React from 'react'
const Thumbnail = ({movie}) => {
  const setModal = useStore((state) => state.setModal);
  const setCurrentMovie = useStore((state) => state.setCurrentMovie);
  return (
    <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'   onClick={() => {
      setModal(true);

      setCurrentMovie(movie);
    }}>
        <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt='movie'
      />
    </div>
  )
}

export default Thumbnail