import React from 'react'
import Slider from './Components/Slider'
import DisplayHome from './Components/DisplayHome'
import Player from './Components/Player'
import Footer from './Components/Footer'

function Home() {
  return (
    <div className='w-[100%] mt-1 px-2 rounded bg-[#212020] text-white overflow-auto '>
      <Slider/>
  
      <DisplayHome/>
      <Footer/>
    </div>
  )
}

export default Home