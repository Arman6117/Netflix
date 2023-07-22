'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const Banner = ({ netflixOriginals}) => {
  useEffect(()=>{
    netflixOriginals.map((data) =>{
      console.log(data);
    })
  })
  // console.log(netflixOriginals);
  return (
    <div>
    {/* <h1>{netflixOriginals}</h1> */}
        {/* <div>
            <Image src='' />
        </div> */}
    </div>
  )
}

export default Banner




// const [movie,setMovie] = useState(null);
// useEffect(()=>{
//   if (netflixOriginals && netflixOriginals.length > 0) {
//     setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
//   }
// }, [netflixOriginals]);

// console.log(movie);