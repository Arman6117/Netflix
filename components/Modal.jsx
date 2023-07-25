'use client'
import React, { useEffect, useState } from 'react'
import { useStore } from '@/src/store'
import MuiModal from '@mui/material/Modal'
import { XIcon } from '@heroicons/react/solid'
import ReactPlayer from 'react-player'

const Modal = () => {
  const showModal =useStore.getState().modal
  const setModal = useStore((state)=>state.setModal)
  const movie = useStore((state)=>state.currentMovie)
    const handleClose = () =>{
        setModal(false)
    }
  const [trailer,setTrailer] = useState('')
  const [genres,setGenres] = useState([])
  const [muted,setMuted] = useState(false)
    useEffect(()=>{
    if(!movie) return;
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )        .then((response) => response.json())
      .catch((err) => console.log(err.message))

      if(data?.videos){
        const index = data.videos.results.findIndex((element)=>element.type ==='Trailer')
        setTrailer(data.videos?.results[index]?.key)
      }
      if(data?.genres){
        setGenres(data.genres)
      }
    }
    fetchMovie()
    
    },[movie])
   
   
  return (
    <MuiModal  open={showModal} onClose={handleClose} className='fixed !top-7 left-0 right-0 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'>
        <>
          <button onClick={handleClose} className='modal_button absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]'>
            <XIcon className='h-6 w-6' />
          </button>
          <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />

          </div>
        </>
    </MuiModal>
  )
}

export default Modal