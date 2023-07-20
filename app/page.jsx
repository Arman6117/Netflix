import Banner from '@/components/Banner'
import Header from '@/components/Header'
import React from 'react'

const Home = () => {
  return (
   <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]'>
     <Header/>
     <main>
      <Banner />
     </main>
   </div>
  )
}

export default Home