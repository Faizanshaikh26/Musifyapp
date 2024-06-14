import React from 'react'
import Slider from './Components/Slider'
import DisplayHome from './Components/DisplayHome'

import Footer from './Components/Footer'
import Navbar from './Components/Navbar'


function Home() {
  return (
    <div className='w-[100%] mt-1 px-2 rounded bg-[#212020] text-white overflow-auto '>
      <Navbar/>
      <Slider/>
  
      <DisplayHome/>
     
      <Footer/>
    </div>
  )
}

export default Home